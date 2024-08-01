/* eslint-disable jsx-a11y/alt-text */

import { StyledBodyContainer } from "../Styles/StyledBody";
import * as Constants from "../constants";
import { AccordionItemDirective, AccordionItemsDirective } from "@syncfusion/ej2-react-navigations";
import {StyledAccordionComponent} from "../Styles/StyledAccordion";
import { StyledEditButton, StyledEditButtonContainer, StyledEditContainer, StyledEditInnerContainer } from "../Styles/StyledEditContainter";
import { StyledAccordionContainer, StyledAccordionMissingContainer } from "../Styles/StyledAccordionContainter";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(process.env.SYNCFUSION_KEY);

function Home() {

  const aspContent = () => {
    return (<div>
      Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.
    </div>);
  }

  return (
    <StyledBodyContainer>

      <StyledAccordionContainer>

        <h2>Annotation</h2>

        <StyledAccordionComponent expandMode='Multiple' color={Constants.CAM}>
          <AccordionItemsDirective>
            <AccordionItemDirective expanded={false} header='ASP.NET' content={aspContent} />
            <AccordionItemDirective expanded={false} header='ASP.NET2' content={aspContent} />
          </AccordionItemsDirective>
        </StyledAccordionComponent>
        <StyledAccordionMissingContainer>

        <h3>Missing</h3>

        <StyledAccordionComponent expandMode='Multiple' color={Constants.CAM}>
          <AccordionItemsDirective>
            <AccordionItemDirective expanded={false} header='ASP.NET3' content={aspContent} />
            <AccordionItemDirective expanded={false} header='ASP.NET4' content={aspContent} />
          </AccordionItemsDirective>
        </StyledAccordionComponent>
        </StyledAccordionMissingContainer>
        
      </StyledAccordionContainer>

      <StyledEditContainer>
        <h2>Edit</h2>
        <StyledEditInnerContainer>
          <StyledEditButtonContainer color={Constants.GREEN}>
            <h6>Add</h6>
            <StyledEditButton isToggle={true} iconCss='e-icons e-edit-2'></StyledEditButton>
          </StyledEditButtonContainer>
          <StyledEditButtonContainer color={Constants.RED}>
            <h6>Delete</h6>
            <StyledEditButton isToggle={true} iconCss="e-icons e-delete-2"></StyledEditButton>
          </StyledEditButtonContainer>
        </StyledEditInnerContainer>
      </StyledEditContainer>
    </StyledBodyContainer>
  )
}

export default Home;