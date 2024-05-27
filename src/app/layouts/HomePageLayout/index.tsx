import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import Header from './components/Header';
import styled from 'styled-components';

type Props = {};

const HomePageLayout = (props: Props) => {
  return (
    <MainGrid className="" container>
      <Header />
      <Outlet />
    </MainGrid>
  );
};
const MainGrid = styled(Grid)`
    width: 100% !important;
  ::-webkit-scrollbar {
    width: 5px;
    margin-left: 3px;
  }
  ::-webkit-scrollbar-track {
    background: transparent !important;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    width: 9px;
    background: #201e1e !important;
    border-radius: 10px;
  }
`;

export default HomePageLayout;
