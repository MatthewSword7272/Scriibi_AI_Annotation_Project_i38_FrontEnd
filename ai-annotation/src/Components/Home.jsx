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
  const skillData = useMemo(() => testSkillsInfo[skillsObject[selectedSkill]], [selectedSkill]);

  // Callback Functions
  const handleSkillChange = useCallback((event) => {
    setSelectedSkill(parseInt(event.target.value, 10));
  }, []);

  const countWords = useCallback((text) => {
    return text.replace(/<[^>]*>/g, '')
                      .replace(/[^a-zA-Z\s]/g, '')
                      .trim()
                      .split(/\s+/)
                      .filter(word => word !== '').length;
  }, []);

  const handleWordCount = useCallback((args) => {
    setWordCount(countWords(args.value));
  }, [countWords]);

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

  
  // Function to add highlights to the text
  const addHighlight = useCallback((highlightedWords, text) => {
    let result = text;
    const highlightMap = new Map();

    // Group highlights by their index
    highlightedWords.forEach((highlight) => {
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
        const color = testComps.find(component => component.title === highlight.component).color;
        
        // Create the HTML markup for the highlight
        const newMark = `<mark class="highlight" id="${highlight.component}" style="background-color: ${color}; cursor: pointer; padding: 3px 5px; border-radius: 5px;" data-highlight>${highlight.text}</mark>`;
        
        // Insert the highlight into the text
        result = result.slice(0, index) + newMark + result.slice(index + highlight.text.length);
      });
    });

    return result;
  }, []);

  const updateHighlights = useCallback((component, text, index) => {
    if (text) {
      setHighlightedWords(prevWords => [...prevWords, {text: text, component: component.title, index: index}]);
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
    
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const updatedText = addHighlight(highlightedWords, fetchedText);
    setPresentingText(updatedText);
  }, [addHighlight, fetchedText, highlightedWords]);

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
        updateHighlights={updateHighlights} 
        setIsDeleteMode={setIsDeleteMode}
        setIsAddingMode={setIsAddingMode}
        setHighlightedWords={setHighlightedWords}
        updateComponents={updateComponents}
        setPresentingText={setPresentingText}
      />
    </StyledBodyContainer>
  );
};

export default Home;