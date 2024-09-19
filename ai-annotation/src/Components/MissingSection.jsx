import React from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';

const MissingSection = ({ components, handleAccordionClick }) => {
  return (
    <StyledAccordionMissingContainer>
      <h2>Missing</h2>
      <StyledAccordionComponent 
        expandMode="Single"
        expanding={(e) => {
          const comp = components.missingComps.find(c => c.title === e.item.header);
          if (comp) handleAccordionClick(comp);
        }}
      >
        <AccordionItemsDirective>
          {components.missingComps && components.missingComps.map((comp, index) => (
            <AccordionItemDirective
              key={index}
              expanded={false}
              header={comp.title}
              content={comp.description}
            />
          ))}
        </AccordionItemsDirective>
      </StyledAccordionComponent>
    </StyledAccordionMissingContainer>
  );
};

export default MissingSection;