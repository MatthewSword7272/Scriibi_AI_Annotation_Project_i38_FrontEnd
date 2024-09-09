import {
  StyledBodyContainer,
  StyledSubBodyContainer1,
} from "../Styles/StyledBody";
import { StyledRichTextEditor } from "../Styles/StyledTextArea";
import TestText from "../testText.json"
import testSkillsInfo from '../testSkilsInfo'
import React, { useCallback, useEffect, useState } from "react";
import { HtmlEditor, Inject, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import skillsInterface from "../Interfaces/SkillsInterface";
import SkillCarousel from "./SkillCarousel";
import SkillSelector from "./SkillSelector";
import { COLOURS } from "Constraints/colours";
import SidePanel from "./SidePanel";

const Home = () => {
  const fetchedText = TestText.pronouns2;

  const [text, setText] = useState("");
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const [colours] = useState(COLOURS)

  const aspContent = () => {
    //Dummy Data
    return (
      <div>
        Microsoft ASP.NET is a set of technologies in the Microsoft .NET
        Framework for building Web applications and XML Web services.
      </div>
    );
  };

  // const parser = new DOMParser();
  // const startingText =  parser.parseFromString(fetchedText, "text/html")

  //So far it only adds marks to strings. We need to further develop this.

  const skillData = testSkillsInfo[skillsInterface[selectedSkill]]; //Use Interface to get Skills Level and Description

  const createHighlight = () => {
    if (text) {
      const updatedHighlights = [...highlightedWords, text];
      setHighlightedWords(updatedHighlights);

      // Update the highlighted text
      highlightText(updatedHighlights); //.body.innerHTML
      setText(""); //Resets the getText back to default
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
    const handleSelectionChange = () => {
      // Get highlighted text and save state
      const selectedText = document.getSelection().toString();
      setText(selectedText.trim());
    };

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

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("click", handleDeleteHighlight);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
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
        text={text}
        isDeleteMode={isDeleteMode} 
        isAddingMode={isAddingMode} 
        createHighlight={createHighlight} 
        setIsDeleteMode={setIsDeleteMode} 
        aspContent={aspContent}/>
    </StyledBodyContainer>
  );
};

export default Home;
