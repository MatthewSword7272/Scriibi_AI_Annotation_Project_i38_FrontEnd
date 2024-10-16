import React, { useCallback, useEffect, useState } from "react";
import { StyledBodyContainer, StyledSubBodyContainer1 } from "../Styles/StyledBody";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import { Toolbar, HtmlEditor, Inject } from '@syncfusion/ej2-react-richtexteditor';
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";
import SidePanel from "./SidePanel";
import { GREEN } from "Constraints/colours";
import { stripHtml } from "string-strip-html";
import LoadingScreen from "Styles/StyledLoadingScreen";
import getCriteriaForASkill from "api/getCriteriaForASkill";
import getTextComponentsForSkill from "api/getTextComponentsforSkill";
import getSkillsList from "api/getSkillsList";

const API_KEY = process.env.REACT_APP_CONTENT_FUNCTION_KEY;
const API_URL = process.env.REACT_APP_CONTENT_FUNCTION_URL;

const Home = () => {
  // States
  const [skillsList, setSkills] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [allTextComponents, setAllTextComponents] = useState({});

  // Fetch criteria for selected skill
  useEffect(() => {
    console.log('Running');
    setIsLoading(true);
    getCriteriaForASkill(API_URL, (selectedSkill + 1), API_KEY)
      .then((res) => res.data)
      .then((data) => {
        setCriteria(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [selectedSkill]);

  // Fetch all text components for all skills
  useEffect(() => {
    setIsLoading(true);
    Promise.all(
      [1, 2, 3, 4, 5].map(skillId =>
        getTextComponentsForSkill(API_URL, skillId, API_KEY)
          .then(res => res.data)
          .then(data => ({
            skillId: skillId - 1,
            data: data.map((comp, index) => ({
              ...comp,
              colorIndex: index + 1,
              flag: comp.flag ? {
                ...comp.flag,
                flagId: comp.flag.flagId,
                name: comp.flag.name,
                colour: comp.flag.colour,
                characters: comp.flag.characters
              } : undefined
            }))
          }))
      )
    ).then(results => {
      const textComponentsMap = results.reduce((acc, { skillId, data }) => {
        acc[skillId] = data;
        return acc;
      }, {});
      setAllTextComponents(textComponentsMap);
    }).catch(error => {
      console.error("Error fetching text components:", error);
    }).finally(() => setIsLoading(false));
  }, []);

  // Update components when skill changes or allTextComponents updates
  useEffect(() => {
    if (allTextComponents[selectedSkill]) {
      const processedData = allTextComponents[selectedSkill];
      setTextComponent(processedData);

      setComponents(prevComponents => {
        const currentTextComps = prevComponents.textComps[selectedSkill] || [];
        let currentMissingComps = processedData.filter((txtComponent) => txtComponent.markup_id === 1);
        let currentNotes = processedData.filter((txtComponent) => txtComponent.markup_id === 2);

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

      console.log("Updated text components:", processedData);
    }
  }, [selectedSkill, allTextComponents]);

  // Get Skills
  useEffect(() => {
    setIsLoading(true);
    getSkillsList(API_URL, API_KEY)
      .then((res) => res.data)
      .then((data) => {
        setSkills(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Functions
  const handleSkillChange = (event) => {
    const newSkill = parseInt(event.target.value, 10);
    setSelectedSkill(newSkill);
    setCurrentText(skillTexts[newSkill]);
    setIsLoading(true);
  };

  const countWords = useCallback((text) => {
    if (typeof text !== 'string') return 0;
    let number = text.replace(/<[^>]*>/g, '')  // Remove HTML tags
               .replace(/[^\w\s]/g, '')  // Remove punctuation
               .trim();                  // Remove leading/trailing whitespace
    
    // Check if the trimmed text is empty
    if (number === '') {
      return 0;
    }
    
    return number.split(/\s+/).length;  // Split into words and count
  }, []);

  const handleTextSaving = useCallback((args) => {
    const plainText = stripHtml(args.value).result;
    if (!firstTime) {
      setSkillTexts({ 0: plainText, 1: plainText, 2: plainText, 3: plainText, 4: plainText });
      setPresentingTexts({ 0: args.value, 1: args.value, 2: args.value, 3: args.value, 4: args.value });
    } else {
      setSkillTexts(prev => ({ ...prev, [selectedSkill]: plainText }));
    }
    setCurrentText(plainText);
  }, [firstTime, selectedSkill]);

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

  const addHighlight = useCallback((highlightedWords, text) => {
    // Create a temporary div to manipulate the HTML
    if (isLoading) return;
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
            const colorIndex = textComponent.find(component => component.name === highlight.component).colorIndex;
            console.log(highlight);
            mark.style.setProperty('--component-background', `var(--c${colorIndex}-background)`)

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

  }, [isLoading, selectedSkill, textComponent]);

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
          [subBackground !== undefined &&
            (subBackground === GREEN ? 'correct' : 'incorrect')]: 
          componentCounts[subBackground !== undefined &&
            (subBackground === GREEN ? 'correct' : 'incorrect')] + 1
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
      setSkillTexts({ 0: currentText, 1: currentText, 2: currentText, 3: currentText, 4: currentText });
      setFirstTime(true);
    } else if (firstTime) {
      setSkillTexts(prev => ({ ...prev, [selectedSkill]: currentText }));
    }
  }, [currentText, firstTime, selectedSkill]);

  // Props
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
  };

  return (
    <StyledBodyContainer id="target">
      {isLoading && <LoadingScreen text="Loading..." />}
      <StyledSubBodyContainer1>
        <SkillSelector {...skillProps} setHighlightedWords={setHighlightedWords} setFirstTime={setFirstTime} firstTime={firstTime} setPresentingTexts={setPresentingTexts} setComponents={setComponents} />
        <SkillCarousel skillData={criteria}/>
        <div className="rte-container">
          <label className="floating-label" htmlFor="rte-target">Student Writing Text</label>
          <StyledRichTextEditor
            id="rte-target"
            value={presentingTexts[selectedSkill]}
            change={handleTextSaving}
            toolbarSettings={{ enable: false }}>
            <Inject services={[HtmlEditor, Toolbar]} />
          </StyledRichTextEditor>
          <div><b>Word Count: {wordCount}</b></div>
        </div>
      </StyledSubBodyContainer1>
      <SidePanel
        textComponent={textComponent}
        key={`${selectedSkill}-${JSON.stringify(components)}`}
        modeProps={modeProps}
        componentProps={componentProps}
        updateHighlights={updateHighlights}
        setHighlightedWords={setHighlightedWords}
        setPresentingText={setPresentingTexts}
        selectedSkill={selectedSkill}
        isAnnotated={skillAnnotated[selectedSkill]}
        flagProps={flagProps}
      />
    </StyledBodyContainer>
  );
};

export default Home;