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
import { BLACK, GREEN } from "Constraints/constants";
import getCriteriaForASkill from "api/getCriteriaForASkill";
import getTextComponentsForSkill from "api/getTextComponentsforSkill";
import getSkillsList from "api/getSkillsList";

const API_KEY = process.env.REACT_APP_CONTENT_FUNCTION_KEY;
const API_URL = process.env.REACT_APP_CONTENT_FUNCTION_URL;

const Home = () => {
  // Constants
  const fetchedText = "";

  // States
  const [skillsList, setSkills] = useState([]);
  const [originalText, setOriginalText] = useState("");
  const [firstTime, setFirstTime] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState({ 0: [], 1: [], 2: [], 3: [], 4: [] });
  const [presentingTexts, setPresentingTexts] = useState({ 0: "", 1: "", 2: "", 3: "", 4: "" });
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [skillAnnotated, setSkillAnnotated] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false });
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [components, setComponents] = useState({
    textComps: [],
    missingComps: [],
    notes: []
  });
  const [textComponent, setTextComponent] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [skillTexts, setSkillTexts] = useState({ 0: "", 1: "", 2: "", 3: "", 4: "" });
  const [currentText, setCurrentText] = useState("");
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
    getTextComponentsForSkill(API_URL, (selectedSkill + 1), API_KEY)
      .then((res) => res.data)
      .then((data) => {
        setTextComponent(prev => data);
        data.map(skill => {
          return skill.map((comp, index = 1) => ({...comp, colorIndex: index}))
        })
        setComponents(prevComponents => {
          const currentTextComps = prevComponents.textComps[selectedSkill] || [];
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
    const newSkill = parseInt(event.target.value, 10);
    setSelectedSkill(newSkill);
    // Load the text for the new skill
    setCurrentText(skillTexts[newSkill]);
  };

  const countWords = useCallback((text) => {
    // if (typeof text !== 'string') {
    //   console.warn('countWords received non-string input:', text);
    //   return 0;
    // }
    return text.replace(/<[^>]*>/g, '')
      .replace(/[^a-zA-Z\s]/g, '')
      .trim()
      .split(/\s+/)
      .filter(word => word !== '').length;
  }, []);

  const handleWordCount = (args) => {
    if (!firstTime) {
      setOriginalText(args.value);
      // Initialize all skill texts and presenting texts with the original text
      setSkillTexts({ 0: args.value, 1: args.value, 2: args.value, 3: args.value, 4: args.value });
      setPresentingTexts({ 0: args.value, 1: args.value, 2: args.value, 3: args.value, 4: args.value });
    } else {
      // Update the text for the current skill only
      setSkillTexts(prev => ({ ...prev, [selectedSkill]: args.value }));
    }
    setCurrentText(args.value);
  };

  // useCallbacks
  const updateComponents = useCallback((action, component) => {
    setComponents(prevState => {
      const currentTextComps = prevState.textComps[selectedSkill] || [];
      const currentMissingComps = prevState.missingComps[selectedSkill] || [];
      const currentNotes = prevState.notes[selectedSkill] || [];

      switch (action) {
        case 'ADD_TO_TEXT':
          if (currentTextComps.some(comp => comp.name === component.name)) {
            return prevState;
          }
          return {
            textComps: {
              ...prevState.textComps,
              [selectedSkill]: [...currentTextComps, component]
            },
            missingComps: {
              ...prevState.missingComps,
              [selectedSkill]: currentMissingComps.filter(comp => comp.name !== component.name)
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
              [selectedSkill]: currentTextComps.filter(comp => comp.name !== component.name)
            },
            missingComps: {
              ...prevState.missingComps,
              [selectedSkill]: [...currentMissingComps, compToMove]
            },
            notes: {
              ...prevState.notes,
              [selectedSkill]: [...currentNotes]
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

    // Ensure highlightedWords[selectedSkill] is an array
    const currentHighlights = Array.isArray(highlightedWords[selectedSkill])
      ? highlightedWords[selectedSkill]
      : [];

    // Group highlights by their index
    currentHighlights.forEach((highlight) => {
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
            console.log('textCompoent', textComponent)
            const componentID = textComponent.map(c => c.name).indexOf(highlight.component) + 1;
            console.log(highlight);
            mark.style.background = `var(--c${componentID + 1}-background)`;

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

  }, [selectedSkill, textComponent]);

  const updateHighlights = useCallback((component, text, index, subBackground, subText) => {
    if (text) {
      setHighlightedWords(prevWords => {
        const currentSkillHighlights = Array.isArray(prevWords[selectedSkill])
          ? prevWords[selectedSkill]
          : [];
        return {
          ...prevWords,
          [selectedSkill]: [
            ...currentSkillHighlights,
            {
              text: text,
              component: component.name,
              index: index,
              subComponent: {
                subText: subText !== undefined ? subText : "",
                subBackground: subBackground
              }
            }
          ]
        };
      });

      updateComponents('ADD_TO_TEXT', component);
    }


    // TODO: Check if FlagCounts is updated properly


    // setFlagCounts(prevCounts => {
    //   // Update presenting text for the current skill
    //   setPresentingTexts(prev => ({
    //     ...prev,
    //     [selectedSkill]: addHighlight({ [selectedSkill]: [...(prev[selectedSkill] || []), { text, component: component.name, index, subComponent: { subText, subBackground } }] }, skillTexts[selectedSkill])
    //   }));
    // })

    setFlagCounts(prevCounts => {
      const componentCounts = prevCounts[component.name] || { correct: 0, incorrect: 0 };
      return {
        ...prevCounts,
        [component.name]: {
          ...componentCounts,
          [subBackground === GREEN ? 'correct' : 'incorrect']: componentCounts[subBackground === GREEN ? 'correct' : 'incorrect'] + 1
        }
      };
    });
  }, [updateComponents, selectedSkill]);

  // useEffects
  useEffect(() => {
    // Update the presenting text when switching skills
    const updatedText = addHighlight(highlightedWords, skillTexts[selectedSkill]);
    setPresentingTexts(prev => ({ ...prev, [selectedSkill]: updatedText }));
    console.log("highlightedWords:", highlightedWords);
  }, [selectedSkill, addHighlight, highlightedWords, skillTexts]);

  useEffect(() => {
    setComponents(prevComponents => {
      const currentTextComps = prevComponents.textComps[selectedSkill] || [];
      const currentMissingComps = textComponent.filter(comp =>
        !currentTextComps.some(textComp => textComp.name === comp.name)
      );

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
        }
      };
    });
  }, [selectedSkill, textComponent]);

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
    const textToCount = presentingTexts[selectedSkill] || '';
    setWordCount(countWords(textToCount));
  }, [presentingTexts, selectedSkill, countWords]);

  // New useEffect to handle text changes
  useEffect(() => {
    if (!firstTime && currentText) {
      setOriginalText(currentText);
      setSkillTexts({ 0: currentText, 1: currentText, 2: currentText, 3: currentText, 4: currentText });
      setFirstTime(true);
    } else if (firstTime) {
      setSkillTexts(prev => ({ ...prev, [selectedSkill]: currentText }));
    }
  }, [currentText, firstTime, selectedSkill]);

  //Props
  const skillProps = {
    handleSkillChange,
    selectedSkill,
    skillData: skillsList,
    text: presentingTexts,
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
      missingComps: components.missingComps[selectedSkill] || [],
      notes: components.notes[selectedSkill] || []
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
        <SkillSelector {...skillProps} setFirstTime={setFirstTime} firstTime={firstTime} />
        <SkillCarousel skillData={criteria}/>
        <div className="rte-container">
          <label className="floating-label" htmlFor="rte-target">Student Writing Text</label>
          <StyledRichTextEditor
            id="rte-target"
            value={presentingTexts[selectedSkill]}
            change={handleWordCount}
            toolbarSettings={{ enable: false }}>
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
        setHighlightedWords={(newHighlights) => setHighlightedWords(prev => ({
          ...prev,
          [selectedSkill]: newHighlights
        }))}
        setPresentingText={(newText) => setPresentingTexts(prev => ({ ...prev, [selectedSkill]: newText }))}
        selectedSkill={selectedSkill}
        isAnnotated={skillAnnotated[selectedSkill]}
        flagProps={flagProps}
      />
    </StyledBodyContainer>
  );
};

export default Home;