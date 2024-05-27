import React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';

type CardViewProps = {
  children?: React.ReactNode; //To make Component able to recieve children
  className?: string; //className
};
const styles = {
  windowWidth: {
    width: '100%',
    background: '#1e1e1e',
    height: ' 100vh !important',
  },
  innerWrapper: {
    padding: ' 10px 10px !important',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
const PageLoaderWrapper = ({ children, className }: CardViewProps) => {
  return (
    <StyledBox
      className={'windowRightBlock ' + `${className}`}
      sx={styles.windowWidth}
    >
      <Box sx={styles.innerWrapper}>{children}</Box>
    </StyledBox>
  );
};
const StyledBox = styled(Box)`
  transform: scale(0);
  -webkit-transition: all 9s ease;
  -moz-transition: all 9s ease;
  -o-transition: all 9s ease;
  transition: all 9s ease;
  &.loading {
    transform: scale(1);
  }
`;
export default PageLoaderWrapper;
