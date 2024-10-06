import React from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import StyledFlag from 'Styles/StyledFlag';
import { BLACK, GREEN, RED } from 'Constraints/constants';

const AccordionSection = ({ title, components, handleAccordionClick, flagCounts, isMissing = false }) => {
  const Container = isMissing ? StyledAccordionMissingContainer : StyledAccordionContainer;

  const renderBadge = (color, translate, onClick, text) => (
    <StyledFlag color={color} translate={translate} onClick={onClick}>
      {text}
    </StyledFlag>
  );

  return (
    <Container>
      <h2>{title}</h2>
      <StyledAccordionComponent
        expandMode="Single"
        expanding={(e) => {
          const headerContent = e.item.properties.header()
          const comp = components.find(c => c.name === headerContent.props.children[0]);
          if (comp && !comp.subComponent) handleAccordionClick(comp);
        }}
        components={components}
      >
        <AccordionItemsDirective>
          {components && components.map((comp, index) => (
            <AccordionItemDirective
              key={index}
              expanded={false}
              header={() => (
                <div style={{ position: 'relative' }}>
                  {comp.name}
                  {comp.subComponent === 2 && (
                    <>
                      {renderBadge(GREEN, 'translate(5px, -12px)', () => handleAccordionClick(comp, GREEN, ''), flagCounts[comp.name]?.correct || 0)}
                      {renderBadge(RED, 'translate(40px, -12px)', () => handleAccordionClick(comp, RED, ''), flagCounts[comp.name]?.incorrect || 0)}
                    </>
                  )}
                  {comp.subComponent === 1 && (
                    <>
                      {renderBadge(BLACK, 'translate(5px, -12px)', () => handleAccordionClick(comp, BLACK, 'C'), 'C')}
                      {renderBadge(BLACK, 'translate(40px, -12px)', () => handleAccordionClick(comp, BLACK, 'E'), 'E')}
                      {renderBadge(BLACK, 'translate(75px, -12px)', () => handleAccordionClick(comp, BLACK, 'EE'), 'EE')}
                    </>
                  )}
                </div>
              )}
              content={comp.example}
            />
          ))}
        </AccordionItemsDirective>
      </StyledAccordionComponent>
    </Container>
  );
};

export default AccordionSection;