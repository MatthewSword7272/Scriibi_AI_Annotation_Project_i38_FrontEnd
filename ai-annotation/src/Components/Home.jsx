import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  StyledBodyContainer,
  StyledSubBodyContainer1,
} from "../Styles/StyledBody";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import TestText from "../testText.json";
import testSkillsInfo from '../testSkillsInfo';
import testComps from "../testComp";
import { HtmlEditor, Inject } from '@syncfusion/ej2-react-richtexteditor';
import skillsObject from "../Constraints/SkillsObject";
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";
import SidePanel from "./SidePanel";
import { BLACK } from "Constraints/constants";

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
    let result = text;
    const highlightMap = new Map();

    // Group highlights by their index
    highlightedWords[selectedSkill].forEach((highlight) => {
      if (!highlightMap.has(highlight.index)) {
        highlightMap.set(highlight.index, []);
      }
      highlightMap.get(highlight.index).push(highlight);
    });

    // Sort indices in descending order to avoid offsetting subsequent highlights
    const sortedIndices = Array.from(highlightMap.keys()).sort((a, b) => b - a);

    // Apply highlights to the text
    sortedIndices.forEach((index) => {
      const highlights = highlightMap.get(index);
      highlights.forEach((highlight) => {
        // Find the color for the current component
        const color = testComps[selectedSkill].find(component => component.title === highlight.component).color;

        // Highlight data
        const data = {
          id: index,
          content: highlight.text,
          componentData: {
            name: highlight.component,
            background: color,
            // subComponent: { // all properties of subComponent are non-nullable
            //   text: "",
            //   background: ""
            // }
          }
        }

        // Create the HTML markup for the highlight
        const newMarkHtml = 
        `<mark 
          class="highlight${data.componentData.subComponent && ' flag'}"
          id="${data.id}"
          data-highlight-content="${data.content}" 
          data-component-name="${data.componentData.name}"
          ${data.componentData.subComponent ? `
            data-subcomponent-text="${data.componentData.subComponent.text || '\u2003'}"` : 
          ""}
          style="background: ${data.componentData.background};
          ${data.componentData.subComponent && 
          `--subcomponent-background: ${data.componentData.subComponent.background || `${BLACK}`};`}">
          ${data.content}
        </mark>`.replace(/\n/g, '').replace(/\s{2,}/g, ' ').replace(/>\s+</g, '><').replace(/>\s+/g, '>').replace(/\s+</g, '<'); // clean white spaces and new line characters
      
        // Insert the highlight into the text
        result = result.slice(0, index) + newMarkHtml + result.slice(index + highlight.text.length);
      });
    });

    return result;
  }, [selectedSkill]);

  const updateHighlights = useCallback((component, text, index) => {
    if (text) {
      setHighlightedWords(prevWords => ({
        ...prevWords,
        [selectedSkill]: [
          ...(prevWords[selectedSkill] || []),
          {text: text, component: component.title, index: index}
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

  return (
    <StyledBodyContainer id="target">
      <StyledSubBodyContainer1>
        <SkillSelector
          handleSkillChange={handleSkillChange}
          selectedSkill={selectedSkill}
          skillData={testSkillsInfo}
          text={presentingText}
          skillAnnotated={skillAnnotated}
          setSkillAnnotated={setSkillAnnotated}
        />
        <SkillCarousel skillData={skillData} />
        <StyledRichTextEditor
          id="rte-target"
          value={presentingText}
          change={handleWordCount}
          toolbarSettings={{enable: false}}>
          <Inject services={[HtmlEditor]} />
        </StyledRichTextEditor>
        <div><b>Word Count: {wordCount}</b></div>
      </StyledSubBodyContainer1>
      <SidePanel
        key={`${selectedSkill}-${JSON.stringify(components)}`}
        isDeleteMode={isDeleteMode} 
        isAddingMode={isAddingMode}
        components={{
          textComps: components.textComps[selectedSkill] || [],
          missingComps: components.missingComps[selectedSkill] || []
        }}
        updateHighlights={updateHighlights} 
        setIsDeleteMode={setIsDeleteMode}
        setIsAddingMode={setIsAddingMode}
        setHighlightedWords={setHighlightedWords}
        updateComponents={updateComponents}
        setPresentingText={setPresentingText}
        selectedSkill={selectedSkill}
        isAnnotated={skillAnnotated[selectedSkill]}
      />
    </StyledBodyContainer>
  );
};

export default Home;