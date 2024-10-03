import React from 'react';
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import { StyledAccordionComponent } from 'Styles/StyledAccordion';
import { StyledAccordionContainer, StyledAccordionMissingContainer } from 'Styles/StyledAccordionContainer';
import { BLACK, GREEN, RED } from 'Constraints/constants';

const AccordionSection = ({ title, components, handleAccordionClick, isMissing = false }) => {
  const Container = isMissing ? StyledAccordionMissingContainer : StyledAccordionContainer;

  const renderBadge = (color, translate, onClick, text = '') => (
    <span
      style={{
        zIndex: 1,
        background: color,
        position: 'absolute',
        borderRadius: '5px',
        padding: '3px 8px',
        lineHeight: 'normal',
        cursor: 'pointer',
        transform: translate,
        height: '15px',
        width: '15px',
        color: 'white'
      }}
      onClick={onClick}
    >{text}</span>
  );

  return (
    <Container>
      <h2>{title}</h2>
      <StyledAccordionComponent
        expandMode="Single"
        expanding={(e) => {
          const headerContent = e.item.properties.header()
          const comp = components.find(c => c.title === headerContent.props.children[0]);
          if (comp) handleAccordionClick(comp);
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
                  {comp.title}
                  {comp.subComponent === 2 && (
                    <>
                      {renderBadge(GREEN, 'translate(5px, -12px)', () => handleAccordionClick(comp, 'green', ''))}
                      {renderBadge(RED, 'translate(40px, -12px)', () => handleAccordionClick(comp, 'red', ''))}
                    </>
                  )}
                  {comp.subComponent === 1 && (
                    <>
                      {renderBadge(BLACK, 'translate(5px, -12px)', () => handleAccordionClick(comp, 'black', 'C'), 'C')}
                      {renderBadge(BLACK, 'translate(40px, -12px)', () => handleAccordionClick(comp, 'black', 'E'), 'E')}
                      {renderBadge(BLACK, 'translate(75px, -12px)', () => handleAccordionClick(comp, 'black', 'EE'), 'EE')}
                    </>
                  )}
                </div>
              )}
              content={comp.description}
            />
          ))}
        </AccordionItemsDirective>
      </StyledAccordionComponent>
    </Container>
  );
};

export default AccordionSection;