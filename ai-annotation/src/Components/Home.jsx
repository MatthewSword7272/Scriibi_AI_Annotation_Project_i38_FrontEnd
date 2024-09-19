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
    console.log(highlights);
    if (highlights.length === 0) return;
    let annotatedText = presentingText;
    let offset = 0;

    highlights.forEach((highlight, index) => {
      const regex = new RegExp(`(<mark[^>]*>[^<]*</mark>|${highlight.text})`, "gi");
      let match;
      while ((match = regex.exec(annotatedText)) !== null) {
        const originalStart = match.index - offset;
        const originalEnd = originalStart + highlight.text.length;

        console.log(`Highlight: "${highlight.text}", Start: ${originalStart}, End: ${originalEnd}`);

        if (match[0].startsWith('<mark') && match[0].includes(`id="${highlight.component}"`)) {
          continue; // Skip this match, it's already highlighted
        }

        const color = colours[index];
        const newMark = `<mark class="highlight" id="${highlight.component}" 
                      style="background-color: ${color}; cursor: pointer; padding: 3px 5px; border-radius: 5px;" 
                      data-highlight>
                        ${highlight.text}
                      </mark>`;
      
        const before = annotatedText.slice(0, match.index);
        const after = annotatedText.slice(match.index + highlight.text.length);
        annotatedText = before + newMark + after;

        offset += newMark.length - highlight.text.length;
        regex.lastIndex += newMark.length - highlight.text.length;
      }
    });

    setPresentingText(annotatedText);
  }, [colours, presentingText]);

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

  
  const addHighlight = useCallback((highlightedWords, text) => {
    let result = text;
    let offset = 0;
  
    // Sort highlightedWords by their start position in the text
    const sortedHighlights = [...highlightedWords].sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text));
  
    sortedHighlights.forEach((highlight, index) => {
      const startIndex = result.indexOf(highlight.text, offset);
      if (startIndex === -1) return; // Text not found, skip this highlight
  
      const endIndex = startIndex + highlight.text.length;
      const color = colours[index % colours.length]; // Cycle through colors

      console.log(`Highlight: "${highlight.text}", Start: ${startIndex}, End: ${endIndex}`);

      // Check if the text is already wrapped in a mark element
      const beforeText = result.slice(0, startIndex);
      const afterText = result.slice(endIndex, result.length - endIndex);
      const isAlreadyHighlighted = 
        beforeText.includes('<mark class="highlight"') &&
        afterText.includes('</mark>') &&
        beforeText.lastIndexOf('<mark') > beforeText.lastIndexOf('</mark');
  
      if (!isAlreadyHighlighted) {
        const newMark = `<mark class="highlight" id="${highlight.component}" 
          style="background-color: ${color}; cursor: pointer; padding: 3px 5px; border-radius: 5px;" 
          data-highlight>${highlight.text}</mark>`;
  
        result = result.slice(0, startIndex) + newMark + result.slice(endIndex);
        offset = startIndex + newMark.length;
      } else {
        offset = endIndex;
      }
    });
  
    return result;
  }, [colours]);

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
    
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const updatedText = addHighlight(highlightedWords, presentingText);
    setPresentingText(updatedText);
  }, [addHighlight, highlightedWords]);

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
        setPresentingText={setPresentingText}
      />
    </StyledBodyContainer>
  );
};

export default Home;