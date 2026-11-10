import React, { useEffect } from 'react';
import {
  Box,
  Avatar,
  AppBar,
  Toolbar,
  Menu,
  Typography,
  MenuItem,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NatyaWordmark } from 'app/components/NatyaWordmark';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { ReactComponent as ProfileIcon } from './assets/img/icons/profile.svg';
import { ReactComponent as NotificationIcon } from './assets/img/icons/notification.svg';
import { ReactComponent as SearchIcon } from './assets/img/icons/search.svg';
import { RoutePath } from 'app/RoutePath';
import styled from 'styled-components';
import HomeNavDropdown from 'app/components/HomeNavDropdown';
import { HomeApiService } from 'services/openapi/services/HomeApiService';
import { useManageHomeSlice } from 'app/pages/HomePage/slice';
import { AuthenticationApIsService } from 'services/openapi';
import useApi from 'services/mavapi/useApi';
import Cookies from 'js-cookie';
import { useManageAppSlice } from 'app/pages/slice';
import { useManageLoginSlice } from 'app/layouts/OnboardLayout/slice';
import { useDispatch } from 'react-redux';
import { googleLogout } from '@react-oauth/google';
import { useManageUserDetailsSlice } from '../../slice';
import { SERVER_BASE_URL } from 'utils/constants';
import { localMovies } from 'app/data/localCatalog';

interface DropdownModel {
  id?: number;
  name?: string;
  code?: string;
}

export const LanguageModel: DropdownModel[] = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Malayalam',
  },
  {
    id: 3,
    name: 'Tamil',
  },
  {
    id: 4,
    name: 'Hindi',
  },
];

const Header = () => {
  const { logoutUser } = AuthenticationApIsService;
  const { error: apiError, isLoading, handleRequest } = useApi();
  const { actions: userDetails } = useManageUserDetailsSlice();
  const { actions: appSliceActions } = useManageAppSlice();
  const { actions: loginActions } = useManageLoginSlice();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const { actions } = useManageHomeSlice();
  const { getHomePageList, getMyList, getNewAndHotList, getComingSoonList } =
    HomeApiService;
  const [searchButton, setSearchButton] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
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
        Cookies.remove('userName');
        Cookies.remove('userEmail');
        Cookies.remove('userPhoto');

        dispatch(appSliceActions.setIsAuthenticated(false));
        dispatch(appSliceActions.setRedirectPath(RoutePath.login.path));
        dispatch(loginActions.changeLoginUsername(''));
        dispatch(loginActions.changeLoginOtp(''));
        dispatch(loginActions.changeLoginType('SEND_OTP'));
        navigate(RoutePath.login.path);
      }
    });
  };
  const handleSettingsClick = () => {
    navigate(RoutePath.settings.path);
  };
  const handleSearchClick = () => {
    navigate(RoutePath.search.path);
  };

  const handleHomePageList = (e?: string) => {
    handleRequest(getHomePageList(e)).then(res => {
      if (res.data) {
        dispatch(actions.setAllHomeList(res?.data));
        dispatch(appSliceActions.setPageLoader(false));
      } else return;
    });
  };
  const handleMyList = (e?: string) => {
    handleRequest(getMyList(e)).then(res => {
      if (res.data) {
        dispatch(actions.setGetMyList(res?.data));
      } else return;
    });
  };
  const handleNewAndHotList = (e?: string) => {
    handleRequest(getNewAndHotList(e)).then(res => {
      if (res.data) {
        dispatch(actions.setNewAndHotItems(res?.data?.items));
        dispatch(actions.setNewAndHotList(res?.data?.series));
      } else return;
    });
  };
  const handleComingSoonList = (e?: string) => {
    handleRequest(getComingSoonList(e)).then(res => {
      if (res.data) {
        dispatch(actions.setComingSoonList(res?.data));
      } else return;
    });
  };
  const handleHomeNavDropdown = e => {
    const selectedModel = LanguageModel.find(
      model => model.id === e.target.value,
    );
    const selectedName = selectedModel?.name || '';
    if (selectedName === 'All') {
      dispatch(appSliceActions.setPageLoader(true));
      handleHomePageList();
      handleMyList();
      handleNewAndHotList();
      handleComingSoonList();
    } else {
      dispatch(appSliceActions.setPageLoader(true));
      handleHomePageList(selectedName);
      handleMyList(selectedName);
      handleNewAndHotList(selectedName);
      handleComingSoonList(selectedName);
    }
  };
  const handleNotificationClick = () => {
    navigate(RoutePath.notifications.path);
  };
  const handleWatchMovie = () => {
    const demo = localMovies[0];
    navigate(RoutePath.homepage.path, { state: { playId: demo.id } });
  };
  const handleBackToHome = () => {
    navigate(RoutePath.homepage.path);
  };
  let userName = Cookies.get('userName')!
    ? atob(Cookies.get('userName')!)
    : null;
  let userEmail = Cookies.get('userEmail')!
    ? atob(Cookies.get('userEmail')!)
    : null;
  let userPhoto = Cookies.get('userPhoto')!
    ? atob(Cookies.get('userPhoto')!)
    : null;

  useEffect(() => {
    if (
      location?.pathname === RoutePath.search.path ||
      location?.pathname === RoutePath.individualview.path
    ) {
      setSearchButton(false);
    } else {
      setSearchButton(true);
    }
  }, []);
  return (
    <>
      <AppBar
        sx={{
          position: 'absolute !important',
          '@media (min-width: 320px) and (max-width: 575px)': {
            background:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgb(0 0 0 / 12%) 23%, rgb(12 11 11 / 5%) 66%, rgba(0,1,1,0.8855917366946778) 100%) !important',
          },
          background: 'transparent !important',
          border: 'none',
        }}
        className="appBar header-toolbar-main"
      >
        <Toolbar sx={headerStyles.Wrapper}>
          <LogoWrapper>
            <HeaderWordmark onClick={handleBackToHome} />
          </LogoWrapper>
          <Box sx={headerStyles.icon}>
            {searchButton &&
              !(
                location.pathname.includes('view') ||
                location.pathname.includes('my-list') ||
                location.pathname.includes('series') ||
                location.pathname.includes('search') ||
                location.pathname.includes('notifications')
              ) && (
                <Box sx={headerStyles.iconBox}>
                  {/* Language filter is hidden until there are films in more than one language.
                  <Box sx={headerStyles.iconBox}>
                    <HomeNavDropdown
                      data={LanguageModel}
                      value={1}
                      onChange={handleHomeNavDropdown}
                    />
                  </Box>
                  */}

                  <Box onClick={handleSearchClick} sx={headerStyles.iconBox}>
                    <SearchIcon />
                  </Box>
                </Box>
              )}
            <Box
              component="button"
              aria-label="Watch movie"
              onClick={handleWatchMovie}
              sx={{
                ...headerStyles.iconBox,
                background: 'transparent',
                border: 0,
                color: '#ffffff',
                lineHeight: 0,
              }}
            >
              <OndemandVideoOutlinedIcon sx={{ color: '#ffffff', fontSize: 26 }} />
            </Box>
            {location?.pathname !== RoutePath.notifications.path && (
              <Box sx={headerStyles.iconBox}>
                <NotificationIcon onClick={handleNotificationClick} />
              </Box>
            )}
            <Box onClick={handleOpenUserMenu} sx={headerStyles.iconBox}>
              <ProfileIcon />
            </Box>
            <AccountMenu
              id="home-menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <ProfileBlock>
                <Avatar
                  alt={userName || 'Natya'}
                  src={userPhoto ? SERVER_BASE_URL + userPhoto : undefined}
                  sx={{ bgcolor: '#e0be00', color: '#111', fontWeight: 700 }}
                >
                  {(userName || 'N').slice(0, 1)}
                </Avatar>
                <ProfileCopy>
                  <strong>{userName || 'Natya'}</strong>
                  <span>{userEmail || 'Your account'}</span>
                </ProfileCopy>
              </ProfileBlock>
              <StyledMenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleBackToHome();
                }}
              >
                <HomeOutlinedIcon />
                <span>Home</span>
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleWatchMovie();
                }}
              >
                <OndemandVideoOutlinedIcon />
                <span>Video</span>
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleSettingsClick();
                }}
              >
                <ManageAccountsOutlinedIcon />
                <span>Settings</span>
              </StyledMenuItem>
              <StyledMenuItem onClick={handleLogout}>
                <LogoutIcon />
                <span>Logout</span>
              </StyledMenuItem>
            </AccountMenu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
const HeaderWordmark = styled(NatyaWordmark)`
  height: 64px;
  @media (max-width: 575px) {
    height: 44px;
  }
`;
const LogoWrapper = styled(Box)`
  display: flex;
  align-items: center;
  @media (min-width: 768px) and (max-width: 991px) {
    width: 190px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    width: 180px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    min-width: 65px;
  }
`;
const headerStyles = {
  Wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    paddingRight: '40px',
    paddingLeft: '40px',
    '@media (min-width: 1366px) and (max-width: 4000px)': {
      padding: '13px 50px',
    },
    '@media (min-width: 1200px) and (max-width: 1365px)': {
      padding: '16px 45px',
    },
    '@media (min-width: 992px) and (max-width: 1199px)': {
      padding: '10px 40px',
    },
    '@media (min-width: 768px) and (max-width: 991px)': {
      padding: '8px 35px',
    },
    '@media (min-width: 576px) and (max-width: 767px)': {
      padding: '5px 20px',
      svg: {
        width: '20px',
        height: '20px',
      },
    },
    '@media (min-width: 320px) and (max-width: 575px)': {
      padding: '0px 10px',
      svg: {
        width: '15px',
        height: '15px',
      },
    },
  },
  icon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '35px',
    marginLeft: 'auto',
    width: 'auto',
    '@media (min-width: 576px) and (max-width: 767px)': {
      gap: '30px',
    },
    '@media (min-width: 320px) and (max-width: 575px)': {
      gap: '17px',
    },
  },
  logo: {
    width: '220px',
    height: '90px',
    borderRadius: '0px',
    cursor: 'pointer',
  },
  iconBox: {
    padding: '0px',
    cursor: 'pointer',
  },
};
const AccountMenu = styled(Menu)`
  .MuiPaper-root {
    margin-top: 10px;
    min-width: 248px;
    padding: 8px;
    color: #ffffff;
    background: #141414 !important;
    border: 1px solid rgba(224, 190, 0, 0.45);
    border-radius: 18px;
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5);
  }
  .MuiList-root {
    padding: 0;
  }
`;
const ProfileBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 14px;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;
const ProfileCopy = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  strong {
    font-size: 15px;
    font-weight: 700;
  }
  span {
    color: #bdbdbd;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  && {
    gap: 12px;
    margin: 2px 0;
    padding: 10px 12px;
    border-radius: 12px;
    color: #ffffff;
    justify-content: flex-start;
  }
  svg {
    color: #e0be00;
    font-size: 22px;
  }
  span {
    font-size: 15px;
    letter-spacing: 0.2px;
  }
  &&:hover {
    background: rgba(224, 190, 0, 0.16);
  }
`;

export default Header;
