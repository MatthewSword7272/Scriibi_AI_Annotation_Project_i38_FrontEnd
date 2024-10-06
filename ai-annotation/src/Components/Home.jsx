import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  StyledBodyContainer,
  StyledSubBodyContainer1,
} from "../Styles/StyledBody";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
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

const Home = () => {
  // Constants
  const fetchedText = TestText.test;

  // States
  const [highlightedWords, setHighlightedWords] = useState({ 0: [], 1: [], 2: [], 3: [], 4: []}); // Saving the annotation
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [skillsList, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(1);
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

  // Memoized values
  useEffect(() => {
    console.log('Running');
    getCriteriaForASkill(API_URL, selectedSkill, API_KEY)
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
    let result = text;
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

    // Apply highlights to the text
    sortedIndices.forEach((index) => {
      const highlights = highlightMap.get(index);
      highlights.forEach((highlight) => {
        // Find the color for the current component
        const compMap = textComponent.map((e) => e.name)
        const color = COLOURS[textComponent.map(component => component.name).indexOf(highlight.component)];
        console.log(compMap, highlight);

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
          {text: text, component: component.name, index: index}
        ]
      }));
      updateComponents('ADD_TO_TEXT', component);
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

  return (
    <StyledBodyContainer id="target">
      <StyledSubBodyContainer1>
        <SkillSelector
          handleSkillChange={handleSkillChange}
          selectedSkill={selectedSkill}

          skillData={skillsList}
          text={presentingText}
        />
        <SkillCarousel
          skillData={criteria}
          skillsList={skillsList}
        />
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
        // Accordion
        components={{
          textComps: components.textComps[selectedSkill] || [],
          missingComps: components.missingComps[selectedSkill] || [],
          notes: components.notes[selectedSkill] || []
        }}
        updateHighlights={updateHighlights} 
        setIsDeleteMode={setIsDeleteMode}
        setIsAddingMode={setIsAddingMode}
        setHighlightedWords={setHighlightedWords}
        updateComponents={updateComponents}
        setPresentingText={setPresentingText}
        selectedSkill={selectedSkill}
      />
    </StyledBodyContainer>
  );
};

export default Home;