import {
  StyledBodyContainer,
  StyledSubBodyContainer1,
} from "../Styles/StyledBody";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import TestText from "../testText.json";
import testSkillsInfo from '../testSkillsInfo';
import TestComp from "../testComp.json";
import React, { useCallback, useEffect, useState } from "react";
import { HtmlEditor, Inject, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import skillsObject from "../Constraints/SkillsObject";
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";
import { COLOURS } from "Constraints/colours";
import SidePanel from "./SidePanel";

const Home = () => {
  const fetchedText = TestText.pronouns2;

  const [highlightedWords, setHighlightedWords] = useState([]);
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [textComps, setTextComps] = useState([]);
  const [missingComps, setMissingComps] = useState(TestComp);

  const [colours] = useState(COLOURS)

  //So far it only adds marks to strings. We need to further develop this.

  const skillData = testSkillsInfo[skillsObject[selectedSkill]]; //Use Interface to get Skills Level and Description

  const createHighlight = (component, event, text) => {
    if (text) {
      const updatedHighlights = [...highlightedWords, text];

      if (!textComps.includes(component))
      {
        setTextComps(prevState => [...prevState, component])
        setMissingComps(missingComps.filter(comp => comp !== component))
      }
      
      setHighlightedWords(updatedHighlights);

      // Update the highlighted text
      highlightText(updatedHighlights); //.body.innerHTML
    }
  };

  const handleSkillChange = (event) => {
    var skill = parseInt(event.target.value);
    setSelectedSkill(skill);
  };

  const highlightText = useCallback(
    (highlights) => {
      let index = 0;
      const regex = new RegExp(`(<mark[^>]*>[^<]*</mark>|${highlights.join("|")})`, "gi");
      const annotatedText = fetchedText.replace(regex, (match) => {
        const color = colours[index % colours.length];
        index++;
        return `<mark class="highlight" style="background-color: ${color}; cursor: pointer;" data-highlight">${match}</mark>`;
      });

      //Update the presenting text
      setPresentingText(annotatedText);
    },
    [colours, fetchedText]
  );

  const deleteHighlight = useCallback(
    (element) => {
      if (element && element.parentNode) {
        const textContent = element.textContent;
        element.parentNode.replaceChild(document.createTextNode(textContent),element);

        setHighlightedWords((prevHighlightedWords) => {
          const newArray = prevHighlightedWords.filter(
            (word) => word !== textContent
          );
          highlightText(newArray);
          return newArray;
        });
      }
    },
    [highlightText]
  );

  const countWords = (text) => {
    const words = text.replace(/<[^>]*>/g, '')  // Remove HTML tags
                      .replace(/[^a-zA-Z\s]/g, '')  // Remove special characters
                      .trim()
                      .split(/\s+/);
    return words.filter(word => word !== '').length;
  };

  const handleWordCount = (args) => {
    const text = args.value;
    const count = countWords(text);
    setWordCount(count);
  }

  useEffect(() => {
    

    const handleDeleteHighlight = (event) => {
      if (isDeleteMode && (event.target.matches(".highlight") || event.target.matches("[data-highlight]"))) {
        deleteHighlight(event.target);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isAddingMode) {
          setIsAddingMode(false);
        } else if (isDeleteMode) {
          setIsDeleteMode(false);
        }
      }
    };

    document.addEventListener("click", handleDeleteHighlight);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleDeleteHighlight);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [deleteHighlight, isAddingMode, isDeleteMode]);

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
        <div><b>Word Count: {wordCount}</b></div> {/* Word Count*/}
      </StyledSubBodyContainer1>
      <SidePanel
        isDeleteMode={isDeleteMode} 
        isAddingMode={isAddingMode}
        textComps={textComps}
        missingComps={missingComps}
        createHighlight={createHighlight} 
        setIsDeleteMode={setIsDeleteMode}
        setIsAddingMode={setIsAddingMode}/>
    </StyledBodyContainer>
  );
};

export default Home;
