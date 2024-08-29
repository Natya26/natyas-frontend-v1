import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from './assets/img/bg/Indhriya_background_Img.png';
import { Grid, Box, Divider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import RightLogo from './assets/img/bg/Indhriya-Right-logo.png';

const OnboardLayout = () => {
  return (
    <Box className="login">
      <Box sx={{ display: 'flex' }}>
        <Grid sx={loginLeft}>
          <Outlet />
        </Grid>
        <Grid sx={loginRight}>
          <StyledBox>
            <LogoWrapper src={RightLogo} />
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
  }
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
  }
};
const StyledBox = styled.div`
  background-image: url(${bgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100% !important;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  @media (min-width: 576px) and (max-width: 767px) {
    display:none;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    display:none;
  }
`;
const LogoWrapper = styled.img`
  width: 100%;
  height: auto;
`;
