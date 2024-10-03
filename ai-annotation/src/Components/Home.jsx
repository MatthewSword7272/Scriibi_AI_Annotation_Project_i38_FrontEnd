import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  StyledBodyContainer,
  StyledSubBodyContainer1,
} from "../Styles/StyledBody";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import { Toolbar } from "@syncfusion/ej2-react-richtexteditor";
import TestText from "../testText.json";
import testSkillsInfo from '../testSkillsInfo';
import testComps from "../testComp";
import { HtmlEditor, Inject } from '@syncfusion/ej2-react-richtexteditor';
import skillsObject from "../Constraints/SkillsObject";
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";
import SidePanel from "./SidePanel";

const Home = () => {
  // Constants
  const fetchedText = TestText.test;

  // States
  const [highlightedWords, setHighlightedWords] = useState({ 0: [], 1: [], 2: [], 3: [], 4: []});
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [skillAnnotated, setSkillAnnotated] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false})
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [components, setComponents] = useState({
    textComps: {},
    missingComps: {}
  });

  // Memoized values
  const skillData = useMemo(() => testSkillsInfo[skillsObject[selectedSkill]], [selectedSkill]);

  // Functions
  const handleSkillChange = (event) => {
    setSelectedSkill(parseInt(event.target.value, 10));
  };

  const countWords = useCallback((text) => {
    return text.replace(/<[^>]*>/g, '')
               .replace(/[^a-zA-Z\s]/g, '')
               .trim()
               .split(/\s+/)
               .filter(word => word !== '').length;
  }, []);

  const handleWordCount = (args) => {
    setPresentingText(args.value);
  };

  // useCallbacks
  const updateComponents = useCallback((action, component) => {
    setComponents(prevState => {
      const currentTextComps = prevState.textComps[selectedSkill] || [];
      const currentMissingComps = prevState.missingComps[selectedSkill] || [];

      switch(action) {
        case 'ADD_TO_TEXT':
          if (currentTextComps.some(comp => comp.title === component.title)) {
            return prevState;
          }
          return {
            textComps: {
              ...prevState.textComps,
              [selectedSkill]: [...currentTextComps, component]
            },
            missingComps: {
              ...prevState.missingComps,
              [selectedSkill]: currentMissingComps.filter(comp => comp.title !== component.title)
            }
          };

        case 'REMOVE_FROM_TEXT':
          const compToMove = currentTextComps.find(comp => comp.title === component.title);
          if (!compToMove) {
            return prevState;
          }
          return {
            textComps: {
              ...prevState.textComps,
              [selectedSkill]: currentTextComps.filter(comp => comp.title !== component.title)
            },
            missingComps: {
              ...prevState.missingComps,
              [selectedSkill]: [...currentMissingComps, compToMove]
            }
          };

        default:
          return prevState;
      }
    });
  }, [selectedSkill]);

  // Function to add highlights to the text
  const addHighlight = useCallback((highlightedWords, text) => {
    // Create a temporary div to manipulate the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;

    // Process highlights in reverse order (to maintain correct indices)
    highlightedWords[selectedSkill]
      .sort((a, b) => b.index - a.index)
      .forEach(highlight => {
        // Create a TreeWalker to iterate through text nodes
        const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null);
        let currentOffset = 0, node;

        // eslint-disable-next-line no-cond-assign
        while (node = walker.nextNode()) {
          // @ts-ignore
          if (currentOffset + node.length > highlight.index) {
            const range = document.createRange();
            const startOffset = highlight.index - currentOffset;
            range.setStart(node, startOffset);
            // @ts-ignore
            range.setEnd(node, Math.min(startOffset + highlight.text.length, node.length));

            const mark = document.createElement('mark');
            mark.className = `highlight${highlight.subComponent ? ' flag' : ''}`;
            mark.id = highlight.index;
            mark.dataset.highlightContent = highlight.text;
            mark.dataset.componentName = highlight.component;
            if (highlight.subComponent) {
              mark.dataset.subcomponentText = highlight.subComponent.subText || '\u2003';
            }

            const componentID = testComps[selectedSkill].find(c => c.title === highlight.component).id;
            mark.style.background = `var(--c${componentID}-background)`;
            if (highlight.subComponent) {
              mark.style.setProperty('--subcomponent-background', highlight.subComponent.subBackground);
            }

            try {
              range.surroundContents(mark);
            } catch (error) {
              console.error('Error applying highlight:', error);
            }
            break;
          }
          // @ts-ignore
          currentOffset += node.length;
        }
      });

    return tempDiv.innerHTML;
  }, [selectedSkill]);

  const updateHighlights = useCallback((component, text, index, subBackground, subText) => {
    if (text) {
      setHighlightedWords(prevWords => ({
        ...prevWords,
        [selectedSkill]: [
          ...(prevWords[selectedSkill] || []),
          {
            text: text, 
            component: component.title, 
            index: index, 
            subComponent: {
              subText: subText !== undefined ? subText : "",
              subBackground: subBackground
            }
          }
        ]
      }));
      updateComponents('ADD_TO_TEXT', component);
    }
  }, [updateComponents, selectedSkill]);

  // useEffects
  useEffect(() => {
    setComponents(prevComponents => {
      const currentTextComps = prevComponents.textComps[selectedSkill] || [];
      const currentMissingComps = testComps[selectedSkill].filter(comp => 
        !currentTextComps.some(textComp => textComp.title === comp.title)
      );

      return {
        textComps: {
          ...prevComponents.textComps,
          [selectedSkill]: currentTextComps
        },
        missingComps: {
          ...prevComponents.missingComps,
          [selectedSkill]: currentMissingComps
        }
      };
    });
  }, [selectedSkill]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsAddingMode(false);
        setIsDeleteMode(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const updatedText = addHighlight(highlightedWords, fetchedText);
    setPresentingText(updatedText);
  }, [addHighlight, fetchedText, highlightedWords]);

  useEffect(() => {
    setWordCount(countWords(presentingText));
  }, [presentingText, countWords]);

  //Props
  const skillProps = {
    handleSkillChange,
    selectedSkill,
    skillData: testSkillsInfo,
    text: presentingText,
    skillAnnotated,
    setSkillAnnotated
  };

  const modeProps = {
    isDeleteMode,
    isAddingMode,
    setIsAddingMode,
    setIsDeleteMode
  };

  const componentProps = {
    components: {
      textComps: components.textComps[selectedSkill] || [],
      missingComps: components.missingComps[selectedSkill] || []
    },
    updateComponents
  };

  return (
    <StyledBodyContainer id="target">
      <StyledSubBodyContainer1>
        <SkillSelector {...skillProps}/>
        <SkillCarousel skillData={skillData} />
        <div className="rte-container">
          <label className="floating-label" htmlFor="rte-target">Student Writing Text</label>
          <StyledRichTextEditor
            id="rte-target"
            value={presentingText}
            change={handleWordCount}
            toolbarSettings={{enable: false}}>
            <Inject services={[HtmlEditor, Toolbar]} />
          </StyledRichTextEditor>
          <div><b>Word Count: {wordCount}</b></div>
        </div>
      </StyledSubBodyContainer1>
      <SidePanel
        key={`${selectedSkill}-${JSON.stringify(components)}`}
        modeProps={modeProps}
        componentProps={componentProps}
        updateHighlights={updateHighlights}
        setHighlightedWords={setHighlightedWords}
        setPresentingText={setPresentingText}
        selectedSkill={selectedSkill}
        isAnnotated={skillAnnotated[selectedSkill]}
      />
    </StyledBodyContainer>
  );
};

export default Home;