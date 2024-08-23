import {
  AccordionItemDirective,
  AccordionItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import React from "react";
import { StyledAccordionComponent } from "Styles/StyledAccordion";
import {
  StyledAccordionContainer,
  StyledAccordionMissingContainer,
} from "Styles/StyledAccordionContainer";
import * as Constants from "../Constraints/constants";

const AccordionContainer = () => {
  const aspContent = () => {
    //Dummy Data
    return (
      <div>
        Microsoft ASP.NET is a set of technologies in the Microsoft .NET
        Framework for building Web applications and XML Web services.
      </div>
    );
  };

  return (
    <>
      <StyledAccordionContainer>
        <h2>Notes</h2>
        <StyledAccordionComponent expandMode="Multiple" color={Constants.CAM}>
          <AccordionItemsDirective>
            <AccordionItemDirective
              expanded={false}
              header="ASP.NET"
              content={aspContent}
            />
            <AccordionItemDirective
              expanded={false}
              header="ASP.NET2"
              content={aspContent}
            />
          </AccordionItemsDirective>
        </StyledAccordionComponent>
      </StyledAccordionContainer>

      <StyledAccordionContainer>
        <h2>Annotation</h2>
        <StyledAccordionComponent expandMode="Multiple" color={Constants.CAM}>
          <AccordionItemsDirective>
            <AccordionItemDirective
              expanded={false}
              header="ASP.NET"
              content={aspContent}
            />
            <AccordionItemDirective
              expanded={false}
              header="ASP.NET2"
              content={aspContent}
            />
          </AccordionItemsDirective>
        </StyledAccordionComponent>
        <StyledAccordionMissingContainer>
          <h3>Missing</h3>

          <StyledAccordionComponent expandMode="Multiple" color={Constants.CAM}>
            <AccordionItemsDirective>
              <AccordionItemDirective
                expanded={false}
                header="ASP.NET3"
                content={aspContent}
              />
              <AccordionItemDirective
                expanded={false}
                header="ASP.NET4"
                content={aspContent}
              />
            </AccordionItemsDirective>
          </StyledAccordionComponent>
        </StyledAccordionMissingContainer>
      </StyledAccordionContainer>
    </>
  );
};

export default AccordionContainer;
