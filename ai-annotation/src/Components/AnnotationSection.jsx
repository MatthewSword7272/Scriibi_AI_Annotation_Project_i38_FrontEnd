import React from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer } from 'Styles/StyledAccordionContainer';

const AnnotationSection = ({ components, handleAccordionClick }) => {
  return (
    <StyledAccordionContainer>
      <h2>Annotation</h2>
      <StyledAccordionComponent 
        expandMode="Single"
        expanding={(e) => {
          const comp = components.textComps.find(c => c.title === e.item.header);
          if (comp) handleAccordionClick(comp);
        }}
      >
        <AccordionItemsDirective>
          {components.textComps && components.textComps.map((comp, index) => (
            <AccordionItemDirective
              key={index}
              expanded={false}
              header={comp.title}
              content={comp.description}
            />
          ))}
        </AccordionItemsDirective>
      </StyledAccordionComponent>
    </StyledAccordionContainer>
  );
};

export default AnnotationSection;
