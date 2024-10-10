import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  column-gap: 24px;
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.p`
  color: white;
  font-size: 18px;
  margin-top: 20px;
`;

const LoadingScreen = () => (
  <LoadingOverlay>

      <SpinnerContainer />
      <LoadingText>Annotating...</LoadingText>

  </LoadingOverlay>
);

export default LoadingScreen;
