import React from "react";
import {
  StyledHeader,
  StyledHeaderSection,
  StyledHeaderLogo,
  StyledHeaderLinks,
  StyledHeaderProfile,
} from "../Styles/StyledHeader";

function Header() {
  return (
    <StyledHeader>
      <StyledHeaderSection>
        <StyledHeaderLogo src={"scriibi-logo.png"} />
        <StyledHeaderLinks>
          <h4>HOME</h4>
          <h4>LESSONS</h4>
          <h4>DATA</h4>
          <h4>ASSESSMENTS</h4>
        </StyledHeaderLinks>
      </StyledHeaderSection>
      <StyledHeaderProfile>
        <span>David Nicolaides</span>
        <span className="e-icons e-settings"></span>
      </StyledHeaderProfile>
    </StyledHeader>
  );
}

export default Header;
