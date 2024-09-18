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
import HighlightTooltip from "./HighlightTooltip";
import { createRoot } from "react-dom/client";

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

  // Callback Functions
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
    setWordCount(countWords(args.value));
  }, [countWords]);

  const highlightText = useCallback((highlights) => {
    if (highlights.length === 0) return;
    let annotatedText = fetchedText;

    highlights.forEach((highlight, index) => {
      const regex = new RegExp(`(<mark[^>]*>[^<]*</mark>|${highlight.text})`, "gi");
      annotatedText = annotatedText.replace(regex, (match) => {
        const color = colours[index];
        return `<span class="highlight-wrapper" data-highlight-id="${highlight.component}" 
                      data-color="${color}" data-highlight-text="${match}"></span>`;
      });
    });

    setPresentingText(annotatedText);
  }, [colours, fetchedText]);

  const updateComponents = useCallback((action, component) => {
    setComponents(prevState => {
      switch(action) {
        case 'ADD_TO_TEXT':
          if (prevState.textComps.some(comp => comp.title === component.title)) {
            return prevState;
          }
          return {
            textComps: [...prevState.textComps, component],
            missingComps: prevState.missingComps.filter(comp => comp.title !== component.title)
          };

        case 'REMOVE_FROM_TEXT':
          const compToMove = prevState.textComps.find(comp => comp.title === component.title);
          if (!compToMove) {
            return prevState;
          }
          return {
            textComps: prevState.textComps.filter(comp => comp.title !== component.title),
            missingComps: [...prevState.missingComps, compToMove]
          };

        default:
          return prevState;
      }
    });
  }, []);

  const updateHighlights = useCallback((component, text) => {
    if (text) {
      setHighlightedWords(prevWords => [...prevWords, {text: text, component: component.title}]);
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

  useEffect(() => {
    const container = document.querySelector('.e-content');
    if (container) {
      const highlights = container.querySelectorAll('.highlight-wrapper');
      highlights.forEach(highlight => {
        const highlightId = highlight.getAttribute('data-highlight-id');
        const color = highlight.getAttribute('data-color');
        const text = highlight.getAttribute('data-highlight-text');
        const root = createRoot(highlight);
        root.render(
          <HighlightTooltip
            isDeleteMode={isDeleteMode}
            isAddingMode={isAddingMode}
            setIsDeleteMode={setIsDeleteMode}
            setIsAddingMode={setIsAddingMode}
          >
            <mark 
              className="highlight" 
              style={{backgroundColor: color, cursor: 'pointer', padding: '3px 5px', borderRadius: '5px'}}
            >
              {text}
            </mark>
          </HighlightTooltip>
        );
      });
    }
  }, [presentingText, isDeleteMode, isAddingMode, setIsDeleteMode, setIsAddingMode]);

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
        key={JSON.stringify(components)}
        isDeleteMode={isDeleteMode} 
        isAddingMode={isAddingMode}
        components={components}
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