import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@semcore/flex-box';

const StyledWrapper = styled(Box)({
  width: '100%',
  maxWidth: '1140px',
  margin: 'auto',
  padding: '0 20px',
});

const MainLayout: React.FC = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default MainLayout;
