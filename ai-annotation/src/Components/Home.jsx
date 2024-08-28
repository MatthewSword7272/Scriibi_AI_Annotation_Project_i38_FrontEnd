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
  const fetchedText = TestText.test;

  const [text, setText] = useState("");
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [presentingText, setPresentingText] = useState(fetchedText);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const colours = shuffleArray(COLOURS);

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

  // const generateRandomColour = useCallback(() => { //Select colour
  //   return Math.floor(Math.random() * colours.length);
  // }, [colours.length])

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
    <StyledBodyContainer>
      <StyledSubBodyContainer1>
        <SkillSelector
          handleSkillChange={handleSkillChange}
          selectedSkill={selectedSkill}
          skillData={testSkillsInfo}
        />
        <SkillCarousel skillData={skillData} />
        <StyledRichTextEditor value={presentingText}>
          {/* .body.innerHTML  */}
          <Inject services={[Toolbar, HtmlEditor]} />
        </StyledRichTextEditor>
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
