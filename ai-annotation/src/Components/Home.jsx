import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  StyledBodyContainer,
  StyledSubBodyContainer1,
} from "../Styles/StyledBody";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import TestText from "../testText.json";
import testSkillsInfo from '../testSkillsInfo';
import testComps from "../testComp";
import { HtmlEditor, Inject, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import skillsObject from "../Constraints/SkillsObject";
import { COLOURS } from "Constraints/colours";
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";
import SidePanel from "./SidePanel";

const Home = () => {
  // Constants
  const fetchedText = TestText.test;

  // States
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [components, setComponents] = useState({
    textComps: [],
    missingComps: testComps
  });

  // Memoized values
  const colours = useMemo(() => COLOURS, []);
  const skillData = useMemo(() => testSkillsInfo[skillsObject[selectedSkill]], [selectedSkill]);

  const handleSkillChange = useCallback((event) => {
    setSelectedSkill(parseInt(event.target.value, 10));
  }, []);

  const countWords = useCallback((text) => {
    const words = text.replace(/<[^>]*>/g, '')
                      .replace(/[^a-zA-Z\s]/g, '')
                      .trim()
                      .split(/\s+/);
    return words.filter(word => word !== '').length;
  }, []);

  const handleWordCount = useCallback((args) => {
    const count = countWords(args.value);
    setWordCount(count);
  }, [countWords]);

  const highlightText = useCallback((highlights) => {
    if (highlights.length === 0) return;
    let annotatedText = fetchedText;

    highlights.forEach((highlight, index) => {
      const regex = new RegExp(`(<mark[^>]*>[^<]*</mark>|${highlight.text})`, "gi");
      annotatedText = annotatedText.replace(regex, (match) => {
        const color = colours[index];
        return `<mark class="highlight" id="${highlight.component}" style="background-color: ${color}; cursor: pointer;" data-highlight>${match}</mark>`;
      });
    });

    setPresentingText(annotatedText);
  }, [colours, fetchedText]);

  const updateComponents = useCallback((action, component) => {
    setComponents(prevState => {
      switch(action) {
        case 'ADD_TO_TEXT':
          if (!prevState.textComps.some(comp => comp.title === component.title)) {
            return {
              textComps: [...prevState.textComps, component],
              missingComps: prevState.missingComps.filter(comp => comp.title !== component.title)
            };
          }
          return prevState;
        case 'REMOVE_FROM_TEXT':
          return {
            textComps: prevState.textComps.filter(comp => comp.title !== component.title),
            missingComps: [...prevState.missingComps, component]
          };
        default:
          return prevState;
      }
    });
  }, []);

  const updateHighlights = useCallback((component, text) => {
    if (text) {
      setHighlightedWords(prevWords => {
        const updatedWords = [...prevWords, {text: text, component: component.title}];
        return updatedWords;
      });

      updateComponents('ADD_TO_TEXT', component);
    }
  }, [updateComponents]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsAddingMode(false);
        setIsDeleteMode(false);
      }
    };

    highlightText(highlightedWords);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightText, highlightedWords, isAddingMode, isDeleteMode]);

  return (
    <StyledBodyContainer id="target">
      <StyledSubBodyContainer1>
        <SkillSelector
          handleSkillChange={handleSkillChange}
          selectedSkill={selectedSkill}
          skillData={testSkillsInfo}
          text={presentingText}
        />
        <SkillCarousel skillData={skillData} />
        <StyledRichTextEditor
          value={presentingText}
          change={handleWordCount}>
          <Inject services={[Toolbar, HtmlEditor]} />
        </StyledRichTextEditor>
        <div><b>Word Count: {wordCount}</b></div>
      </StyledSubBodyContainer1>
      <SidePanel
        isDeleteMode={isDeleteMode} 
        isAddingMode={isAddingMode}
        textComps={components.textComps}
        missingComps={components.missingComps}
        createHighlight={updateHighlights} 
        setIsDeleteMode={setIsDeleteMode}
        setIsAddingMode={setIsAddingMode}
        setHighlightedWords={setHighlightedWords}
        highlightText={highlightText}
        updateComponents={updateComponents}
      />
    </StyledBodyContainer>
  );
};

export default Home;
