import React, { useCallback } from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import StyledFlag from 'Styles/StyledFlag';
import { BLACK, GREEN, RED } from 'Constraints/colours';

const AccordionSection = ({ title, textComponent, components, handleAccordionClick, flagCounts, isMissing = false }) => {
  const Container = isMissing ? StyledAccordionMissingContainer : StyledAccordionContainer;

  const renderBadge = (color, translate, onClick, text) => (
    <StyledFlag color={color} translate={translate} onClick={onClick}>
      {text}
    </StyledFlag>
  );

  const handleExpanding = useCallback((e) => {
    if (e && e.item.properties) {
      const headerContent = e.item.properties.header();
      const comp = components.find(c => c && c.name === headerContent.props.children[0]);
      if (comp && !comp.flag) handleAccordionClick(comp);
    }
  }, [components, handleAccordionClick]);

  return (
    <Container>
      <h2>{title}</h2>
      <StyledAccordionComponent
        expandMode="Single"
        expanding={handleExpanding}
        components={components || []}
        textcomponent={textComponent}
      >
        <AccordionItemsDirective>
          {components && components.map((comp, index) => (
            <AccordionItemDirective
              key={index}
              expanded={false}
              header={() => (
                <div style={{ position: 'relative' }}>
                  {comp.name}
                  {comp.flag && (comp.flag.flagId === 10 || comp.flag.flagId === 11 ? (
                      <>
                        {renderBadge(GREEN, 'translate(5px, -12px)', () => handleAccordionClick(comp, GREEN, ''), flagCounts[comp.name]?.correct || 0)}
                        {renderBadge(RED, 'translate(40px, -12px)', () => handleAccordionClick(comp, RED, ''), flagCounts[comp.name]?.incorrect || 0)}
                      </>
                    ) : (
                      <>
                        {renderBadge(BLACK, 'translate(5px, -12px)', () => handleAccordionClick(comp, BLACK, comp.flag.characters), comp.flag.characters)}
                      </>
                    )
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