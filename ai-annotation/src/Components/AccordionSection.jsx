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
          const comp = components.find(c => c.name === e.item.header);
          if (comp) handleAccordionClick(comp);
        }}
        components={components}
      >
        <AccordionItemsDirective>
          {components && components.map((comp, index) => (
            <AccordionItemDirective
              key={index}
              expanded={false}
              header={comp.name}
              content={comp.example}
            />
          ))}
        </AccordionItemsDirective>
      </StyledAccordionComponent>
    </Container>
  );
};

export default AccordionSection;