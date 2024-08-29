import React, { useState } from 'react';
import { Box, Button, Popover } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import icon from './assets/img/icon/usericon.jpg';
import IndhriyaHeadIcon from './assets/img/icon/indhriya-logo.svg';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { RoutePath } from 'app/RoutePath';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { googleLogout } from '@react-oauth/google';
import { AuthenticationApIsService } from 'services/openapi';
import useApi from 'services/mavapi/useApi';
import { useManageAppSlice } from 'app/pages/slice';
import { useManageLoginSlice } from 'app/layouts/OnboardLayout/slice';
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_BASE_URL } from 'utils/constants';
import arrow from './assets/img/icon/sidebar/arrow.png';
import { useLocation } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from './assets/img/icon/profile.svg';
import { selectPaymentLoader } from 'app/pages/Settings/slice/selectors';
type Props = {};

const Header = ({}: Props) => {
  const { logoutUser } = AuthenticationApIsService;
  const { error: apiError, isLoading, handleRequest } = useApi();
  const { actions: appSliceActions } = useManageAppSlice();
  const { actions: loginActions } = useManageLoginSlice();
  const location = useLocation();
  const selectPaymentLoading = useSelector(selectPaymentLoader);

  let userName = Cookies.get('userName') ? atob(Cookies.get('userName')!) : '';
  let userEmail = Cookies.get('userEmail')!
    ? atob(Cookies.get('userEmail')!)
    : '';
  let userPhoto = Cookies.get('userPhoto')!
    ? atob(Cookies.get('userPhoto')!)
    : '';

  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [popup, setPopup] = useState(false);
  const showPopup = () => {
    setPopup(!popup);
  };
  // const [open, setOpen] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpen = event => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const drawerWidth = 0;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //Logout Fn
  const handleLogout = () => {
    handleRequest(logoutUser()).then(res => {
      if (res) {
        googleLogout();
        Cookies.remove('idToken');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');
        localStorage.setItem('sidebarActiveIndex', '0');
        dispatch(appSliceActions.setIsAuthenticated(false));
        dispatch(appSliceActions.setRedirectPath(RoutePath.login.path));
        dispatch(loginActions.changeLoginUsername(''));
        dispatch(loginActions.changeLoginOtp(''));
        dispatch(loginActions.changeLoginType('SEND_OTP'));
        navigate(RoutePath.login.path);
      }
    });
  };
  const handleBackToHome = () => {
    navigate(RoutePath.homepage.path);
    // Changed for fusion
    // navigate(RoutePath.fusionhomepage.path);
  };
  console.log(location?.pathname, 'location?.pathname--------------');

  return (
    <HeaderWrapper className="HeaderWrapper">
      <AppBar
        position="absolute"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: '#030303 !important',
          border: 'none !important',
          pointerEvents: `${selectPaymentLoading ? 'none' : ''}`,
        }}
        className={`appBar header-toolbar-main ${
          location?.pathname === RoutePath?.paymentSuccess?.path
            ? 'payment-header'
            : ''
        } `}
      >
        <Toolbar sx={headerStyles.Wrapper}>
          <Avatar
            onClick={handleBackToHome}
            sx={headerStyles.headerAppIcon}
            alt="Fusion Header Icon"
            src={IndhriyaHeadIcon}
          />
          <Box sx={headerStyles.icon}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {/* <Avatar alt="" src={SERVER_BASE_URL + userPhoto} /> */}
              <ProfileIcon />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              className="admin-settings-popover"
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '20px 0px',
                  flexDirection: 'column',
                }}
              >
                <Avatar alt="" src={SERVER_BASE_URL + userPhoto} />
                <Typography
                  sx={{
                    padding: '15px 0px 5px 0px',
                    color: '#ffffff',
                  }}
                  component={'h5'}
                >
                  {userName}
                </Typography>
                <Typography
                  sx={{
                    padding: '5px 0px 5px 0px',
                    color: '#ffffff',
                  }}
                  component={'h5'}
                >
                  {userEmail}
                </Typography>
              </Box>
              <MenuItem onClick={handleBackToHome}>
                <HomeRoundedIcon sx={{ margin: '0px 8px' }} />

                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ margin: '0px 8px' }} />

                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
            <img src={arrow} onClick={handleOpenUserMenu} />
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Outlet /> */}
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.div`
  width: 100%;
  .payment-header {
    pointer-events: none !important;
  }
`;
export default Header;
const headerStyles = {
  Wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  },
  icon: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '15px',
    mr: '10px',
    width: 'calc(100% - 0px)',
  },
  headerAppIcon: {
    background: '#030303',
    height: '90px',
    width: '220px',
    cursor: 'pointer',
  },
};
