import React from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';

const AccordionSection = ({ title, components, handleAccordionClick, isMissing = false }) => {
  const Container = isMissing ? StyledAccordionMissingContainer : StyledAccordionContainer;

  return (
    <Container>
      <h2>{title}</h2>
      <StyledAccordionComponent 
        expandMode="Single"
        expanding={(e) => {
          const comp = components.find(c => c.title === e.item.header);
          if (comp) handleAccordionClick(comp);
        }}
      >
        <AccordionItemsDirective>
          {components && components.map((comp, index) => (
            <AccordionItemDirective
              key={index}
              expanded={false}
              header={comp.title}
              content={comp.description}
            />
          ))}
        </AccordionItemsDirective>
      </StyledAccordionComponent>
    </Container>
  );
};

export default AccordionSection;