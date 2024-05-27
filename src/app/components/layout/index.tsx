import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import Header from './Header';
import './assets/css/common.css';
import Sidebar from './Sidebar';
// import { SidebarList } from './SidebarList';

export const Layout = () => {
  return (
    <Grid container>
      <Header />
      {/* <Sidebar data={SidebarList} /> */}
      <Outlet />
    </Grid>
  );
};
