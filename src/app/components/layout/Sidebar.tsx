import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import logo from './assets/img/logo/logo.png';
import { SidebarListData } from './SidebarList';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';

export type SideBarProps = {
  data?: SidebarListData[];
};

const Sidebar = ({ data }: SideBarProps) => {
  const navigate = useNavigate();
  const [userSidebarList, setUserSidebarList] = useState(data);
  const [sidebarCurrentIndex, setSidebarCurrentIndex] = useState<number>(0);
  const [sidebarActiveIndex, setSidebarActiveIndex] = useState<number>(0);
  const drawerWidth = 240;

  const handleSibeBarClick = (index?: number, route?: string) => {
    if (index !== undefined && route) {
      localStorage.setItem('sidebarActiveIndex', index?.toString());
      setSidebarCurrentIndex(index!);
      navigate(route);
    }
  };

  //Logout Fn
  const handleLogout = () => {
    Cookies.set('accessToken', '');
    Cookies.set('idToken', '');
    Cookies.set('refreshToken', '');
    localStorage.setItem('sidebarActiveIndex', '0');
    navigate('/');
  };
  useEffect(() => {
    setSidebarActiveIndex(
      parseInt(localStorage.getItem('sidebarActiveIndex')!),
    );
  }, [sidebarCurrentIndex, handleSibeBarClick]);
  return (
    <Box sx={{ display: 'flex' }} className="menu">
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none !important',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
          }}
        >
          <Avatar alt="logo" src={logo} sx={logoStyles} />{' '}
          <span
            style={{
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '1.5px',
            }}
          >
            Fusion
          </span>
        </Box>
        {/* <Divider /> */}
        <Box sx={sideBarStye}>
          <Box sx={sideBarListStyle}>
            <List sx={styles.list}>
              {userSidebarList?.map((item, index) => (
                <ListItem
                  sx={linkBtn}
                  disablePadding
                  key={item.label}
                  onClick={e => handleSibeBarClick(index, item?.route)}
                >
                  <ListItemButton
                    sx={styles.link}
                    selected={
                      sidebarActiveIndex === index && index !== undefined
                    }
                  >
                    {/* <Icon src={item.icon} /> */}
                    {item.icon}
                    <ListItemText>{item.label}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        {/* <Divider /> */}
      </Drawer>
    </Box>
  );
};
//Styles
const styles = {
  list: {
    background: '#ffffff',
    fontSize: '0.9rem !important',
    padding: '20px 15px !important',
    '& 	.MuiListItem-root ': {
      '&:hover, &:focus': {
        backgroundColor: ' #f9f9f9',
        borderRadius: '0.6rem',
        color: '#fff',
        '& .MuiSvgIcon-root': {
          color: '#ffffff !important',
        },
        '& .MuiListItemText-root': {
          color: ' #000000',
        },
      },
    },

    '& .Mui-selected': {
      backgroundColor: '#ffb84d !important',
      borderRadius: '6px',
      color: '#fff',
      '& .MuiSvgIcon-root': {
        color: '#ffffff !important',
      },
    },
  },
  link: {
    display: 'flex',
    alignItemsCenter: 'center',
    justifyContent: 'center',
  },
};

const sideBarStye = {
  padding: '15px',
  background: '#f7f7f7',
  height: 'calc(100vh - 65px)',
  borderTop: 'solid 1px #ffffff',
};

const sideBarListStyle = {
  height: '100%',
  background: '#ffffff',
  borderRadius: '12px',
  overflow: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const linkBtn = {
  borderRadius: '10px !important',
  overflow: 'hidden',
  marginBottom: '10px',
};
const logoStyles = {
  padding: '0',
  '& img': {
    objectFit: 'contain !important',
  },
};
const Icon = styled.img`
  padding: 0px 0px;
  margin: 0px 6px;
`;
export default Sidebar;
