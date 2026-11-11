import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Box, Divider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NatyaWordmark } from 'app/components/NatyaWordmark';
import { NatyaPosterWall } from 'app/components/NatyaPosterWall';

const OnboardLayout = () => {
  return (
    <Box className="login">
      <Box sx={{ display: 'flex' }}>
        <Grid sx={loginLeft}>
          <Outlet />
        </Grid>
        <Grid sx={loginRight}>
          <StyledBox>
            <NatyaPosterWall columns={3} />
            <LogoWrapper>
              <SideWordmark />
            </LogoWrapper>
          </StyledBox>
        </Grid>
      </Box>
    </Box>
  );
};
export default OnboardLayout;
const loginLeft = {
  height: '100vh',
  width: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  position: 'relative',
  background: '#2B2727',
  minHeight: '100vh',
  overflow: 'auto',
  '@media (min-width: 576px) and (max-width: 767px)': {
    width: '100%',
  },
  '@media(min-width: 320px) and (max-width: 575px)': {
    width: '100%',
  },
};
const loginRight = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  width: 'calc(100% - 50%)',
  background: '#ffffff',
  justifyContent: 'center',
  '@media (min-width: 576px) and (max-width: 767px)': {
    width: 'auto',
  },
  '@media(min-width: 320px) and (max-width: 575px)': {
    width: 'auto',
  },
};
const StyledBox = styled.div`
  width: 100% !important;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  @media (min-width: 576px) and (max-width: 767px) {
    display: none;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    display: none;
  }
`;
const SideWordmark = styled(NatyaWordmark)`
  height: 220px;
`;
const LogoWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
