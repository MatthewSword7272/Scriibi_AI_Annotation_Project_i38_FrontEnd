import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  StyledBodyContainer,
  StyledSubBodyContainer1,
} from "../Styles/StyledBody";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import { Toolbar } from "@syncfusion/ej2-react-richtexteditor";
import TestText from "../testText.json";
import { HtmlEditor, Inject } from '@syncfusion/ej2-react-richtexteditor';
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";
import SidePanel from "./SidePanel";
import { BLACK } from "Constraints/constants";
import getCriteriaForASkill from "api/getCriteriaForASkill";
import getTextComponentsForSkill from "api/getTextComponentsforSkill";
import getSkillsList from "api/getSkillsList";
import { COLOURS } from "Constraints/colours";

const API_KEY = process.env.REACT_APP_CONTENT_FUNCTION_KEY;
const API_URL = process.env.REACT_APP_CONTENT_FUNCTION_URL;
import { GREEN } from "Constraints/constants";

const Home = () => {
  // Constants
  const fetchedText = TestText.test;

  // States
  const [highlightedWords, setHighlightedWords] = useState({ 0: [], 1: [], 2: [], 3: [], 4: []}); // Saving the annotation
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [skillsList, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [skillAnnotated, setSkillAnnotated] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false})
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [components, setComponents] = useState({
    textComps: {},
    missingComps: {},
    notes: {}
  });
  const [textComponent, setTextComponent] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [flagCounts, setFlagCounts] = useState({});

  // Memoized values
  useEffect(() => {
    console.log('Running');
    getCriteriaForASkill(API_URL, (selectedSkill + 1), API_KEY)
    .then((res) => res.data)
    .then((data) => {
      setCriteria(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [selectedSkill])

  // Get text component
  useEffect(() => {
    getTextComponentsForSkill(API_URL, selectedSkill, API_KEY)
    .then((res) => res.data)
    .then((data) => {
      setTextComponent(data);

      setComponents(prevComponents => {
        const currentTextComps = prevComponents.textComps[selectedSkill - 1] || [];
        let currentMissingComps = data.filter((txtComponent) => txtComponent.markup_id === 1);
        let currentNotes = data.filter((txtComponent) => txtComponent.markup_id === 2);
  
        return {
          textComps: {
            ...prevComponents.textComps,
            [selectedSkill]: currentTextComps
          },
          missingComps: {
            ...prevComponents.missingComps,
            [selectedSkill]: currentMissingComps
          },
          notes: {
            ...prevComponents.notes,
            [selectedSkill]: currentNotes
          }
        };
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }, [selectedSkill])

  // Get Skills
  useEffect(() => {
    getSkillsList(API_URL, API_KEY)
    .then((res) => res.data)
    .then((data) => {
      setSkills(data);
    })
  }, [])

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
      const currentTextComps = prevState.textComps[selectedSkill - 1] || [];
      const currentMissingComps = prevState.missingComps[selectedSkill - 1] || [];
      const currentNotes = prevState.notes[selectedSkill - 1] || [];

      switch(action) {
        case 'ADD_TO_TEXT':
          if (currentTextComps.some(comp => comp.name === component.name)) {
            return prevState;
          }
          return {
            textComps: {
              ...prevState.textComps,
              [selectedSkill - 1]: [...currentTextComps, component]
            },
            missingComps: {
              ...prevState.missingComps,
              [selectedSkill - 1]: currentMissingComps.filter(comp => comp.name !== component.name)
            },
            notes: {
              ...prevState.notes
            }
          };

        case 'REMOVE_FROM_TEXT':
          const compToMove = currentTextComps.find(comp => comp.name === component.name);
          if (!compToMove) {
            return prevState;
          }
          return {
            textComps: {
              ...prevState.textComps,
              [selectedSkill - 1]: currentTextComps.filter(comp => comp.title !== component.title)
            },
            missingComps: {
              ...prevState.missingComps,
              [selectedSkill - 1]: [...currentMissingComps, compToMove]
            },
            notes: {
              ...prevState.notes,
              [selectedSkill - 1]: [...currentNotes]
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

    const highlightMap = new Map();

    // Group highlights by their index
    highlightedWords[selectedSkill - 1].forEach((highlight) => {
      if (!highlightMap.has(highlight.index)) {
        highlightMap.set(highlight.index, []);
      }
      highlightMap.get(highlight.index).push(highlight);
    });

    // Sort indices in descending order to avoid offsetting subsequent highlights
    const sortedIndices = Array.from(highlightMap.keys()).sort((a, b) => b - a);

    sortedIndices.forEach((index) => {
      const highlights = highlightMap.get(index);
      highlights.forEach((highlight) => {
        // Create a TreeWalker to iterate through text nodes
        const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null);
        let currentOffset = 0, node;
        // Find the color for the current component
        const compMap = textComponent.map((e) => e.name)
        const color = COLOURS[textComponent.map(component => component.name).indexOf(highlight.component)];
        console.log(compMap, highlight);

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
    });

    return tempDiv.innerHTML;
  }, [selectedSkill]);

  const updateHighlights = useCallback((component, text, index, subBackground, subText) => {
    if (text) {
      setHighlightedWords(prevWords => ({
        ...prevWords,
        [selectedSkill]: [
          ...(prevWords[selectedSkill] || []),
          {text: text, component: component.title, index: index}
        ]
      }));
      updateComponents('ADD_TO_TEXT', component);

      // Update flag counts
      setFlagCounts(prevCounts => {
        const componentCounts = prevCounts[component.title] || { correct: 0, incorrect: 0 };
        return {
          ...prevCounts,
          [component.title]: {
            ...componentCounts,
            [subBackground === GREEN ? 'correct' : 'incorrect']: componentCounts[subBackground === GREEN ? 'correct' : 'incorrect'] + 1
          }
        };
      });
    }
  }, [updateComponents, selectedSkill]);

  // useEffects - Accordion noted
  // useEffect(() => {
  //   setComponents(prevComponents => {
  //     const currentTextComps = prevComponents.textComps[selectedSkill] || [];
  //     const currentMissingComps = testComps[selectedSkill].filter(comp => 
  //       !currentTextComps.some(textComp => textComp.title === comp.title)
  //     );

  //     return {
  //       textComps: {
  //         ...prevComponents.textComps,
  //         [selectedSkill]: currentTextComps
  //       },
  //       missingComps: {
  //         ...prevComponents.missingComps,
  //         [selectedSkill]: currentMissingComps
  //       }
  //     };
  //   });
  // }, [selectedSkill]);

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
    skillData: skillsList,
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

  const flagProps = {
    flagCounts,
    setFlagCounts
  }

  return (
    <StyledBodyContainer id="target">
      <StyledSubBodyContainer1>
        <SkillSelector {...skillProps}/>
        <SkillCarousel skillData={criteria} />
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
        flagProps={flagProps}
      />
    </StyledBodyContainer>
  );
};

export default Home;