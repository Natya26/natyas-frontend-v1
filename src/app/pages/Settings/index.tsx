import { Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Notification } from './assets/img/icon/notification.svg';
import { ReactComponent as Profile } from './assets/img/icon/profile.svg';
import { ReactComponent as Help } from './assets/img/icon/help.svg';
import { ReactComponent as Privacy } from './assets/img/icon/privacy1.svg';
import { ReactComponent as Subscription } from './assets/img/icon/subscription1.svg';
import { HelpCentreTab } from './components/HelpCentreTab';
import PrivacyPolicyTab from './components/PrivacyPolicyTab';
import NotificationTab from './components/NotificationTab';
import StaticPlans from './components/StaticPlans';
import StaticProfile from './components/StaticProfile';
import { SettingsApiService } from 'services/openapi/services/SettingsApiService';
import { useManageUserSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import useApi from 'services/mavapi/useApi';
import dateFormat from 'dateformat';
import { selectPageLoader } from '../slice/selectors';
import { useManageAppSlice } from '../slice';
import PageLoaderWrapper from 'app/components/PageLoaderWrapper';
import PulseLoader from 'react-spinners/PulseLoader';
import { SubscriptionApiService } from 'services/openapi/services/SubscriptionApiService';
import {
  selectPaymentLoader,
  selectSettingsTabVal,
  selectSubscriptionPlans,
  selectTriggerApi,
} from './slice/selectors';
import { RoutePath } from '../../RoutePath';
import { Footer } from 'app/components/Footer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, pb: 3, width: '100%', height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const Settings = (props: any) => {
  const { getCurrentUser, updateCurrentUser } = SettingsApiService;
  const { getUserSubscriptionPlan, getSubscriptionList } =
    SubscriptionApiService;

  const { error: apiError, isLoading, handleRequest } = useApi();

  const { actions } = useManageUserSlice();
  const dispatch = useDispatch();

  //Loader
  const pageLoader = useSelector(selectPageLoader);
  const SubScriptionPlans = useSelector(selectSubscriptionPlans);
  const SelectSettingsTabVal = useSelector(selectSettingsTabVal);
  const selectPaymentLoading = useSelector(selectPaymentLoader);
  const selectedTriggerApi = useSelector(selectTriggerApi);

  const { actions: AppActions } = useManageAppSlice();
  //UseStates
  const [tabIndex, setTabIndex] = useState(0);

  //Demodata
  const GenderArray = [
    { id: 1, name: 'Male', code: 'M' },
    { id: 2, name: 'Female', code: 'F' },
    { id: 3, name: 'Other', code: 'O' },
  ];
  const pageStyles = {
    containerStyles: {
      background: '#111010 !important',
      color: '#FFFFFF !important',
      margin: '0',
      paddingTop: '90px',
      minHeight: '100vh',
      overflow: 'auto',
      pointerEvents: `${selectPaymentLoading ? 'none' : ''}`,
    },
    containerBoxStyles: {
      justifyContent: 'center',
      width: '100%',
      margin: '0 auto',
      padding: '40px 20px 0 20px',
      maxWidth: '1200px',
    },
    primaryHeadingContainer: {},
    primaryHeadingStyle: {
      margin: '10px 0px',
    },
    headingDivider: {
      backgroundColor: '#575757 !important',
      width: '100%',
    },
    tagStyle: { borderRight: 1, borderColor: 'divider' },
  };

  //Get Profile Data
  const handleGetProfileData = () => {
    handleRequest(getCurrentUser()).then(res => {
      if (res.data) {
        dispatch(actions.changeFirstname(res?.data?.first_name));
        dispatch(actions.changeLastName(res?.data?.last_name));
        dispatch(actions.changeEmail(res?.data?.email));
        dispatch(actions.changePhoneCode(res?.data?.phone_code));
        dispatch(actions.changePhoneNumber(res?.data?.phone_number));
        let convertedDob = dateFormat(res?.data?.date_of_birth, 'yyyy-mm-dd');
        dispatch(actions.changeDateofBirth(convertedDob));
        dispatch(actions.changeDobValue(res?.data?.date_of_birth));
        dispatch(
          actions.setPreviewFullName(
            res?.data?.first_name + ' ' + res?.data?.last_name,
          ),
        );
        dispatch(actions.setPreviewEmail(res?.data?.email));

        let selectedCategory = GenderArray?.filter((item, index) => {
          if (item?.name === res?.data?.gender) {
            return item;
          }
        });
        if (selectedCategory) {
          dispatch(actions.changeGender(selectedCategory?.[0]?.name));
          dispatch(actions.changeGenderValue(selectedCategory?.[0]?.id));
        }
        dispatch(AppActions.setPageLoader(false));
      } else return;
    });
  };
  //Get User Subscription
  const handleGetUserSubscription = () => {
    handleRequest(getUserSubscriptionPlan())
      .then(res => {
        if (res?.data?.subscription) {
          console.log(
            res,
            'user  subscription res--------------------------------------',
          );
          dispatch(actions.setCurrentUserSubscription(res?.data?.subscription));
        }
      })
      .catch(err => console.log(err, 'user subscription err'));
  };
  //Get  Subscription List
  const handleGetSubscriptionList = () => {
    handleRequest(getSubscriptionList())
      .then(res => {
        if (res.data) {
          console.log(res, '  subscription List');
          dispatch(actions.setSubscriptionPlans(res?.data));
        }
      })
      .catch(err => console.log(err, ' subscription list err'));
  };

  useEffect(() => {
    dispatch(AppActions.setPageLoader(false));
  }, [dispatch, AppActions]);
  return (
    <>
      {pageLoader ? (
        <>
          <PageLoaderWrapper>
            <PulseLoader color="#e0be00" />
          </PageLoaderWrapper>
        </>
      ) : (
        <Grid container sx={pageStyles.containerStyles}>
          <StyledBox sx={pageStyles.containerBoxStyles}>
            <Grid item sx={pageStyles.primaryHeadingContainer}>
              <Wrappr>
                <Typography
                  variant="h6"
                  component="h1"
                  sx={pageStyles.primaryHeadingStyle}
                >
                  Settings
                </Typography>
              </Wrappr>
              <Divider sx={pageStyles.headingDivider} />
              <SubWrapper>
                <Box className="Box-settings-title">
                  <Grid className="custom-grid-container" container spacing={2}>
                    <StyledGrid
                      className="StyledGrid"
                      item
                      xs={12}
                      sm={3}
                      md={4}
                    >
                      <StyledTab
                        orientation="vertical"
                        variant="fullWidth"
                        defaultValue={0}
                        value={SelectSettingsTabVal!}
                        onChange={(e: React.SyntheticEvent, val: any) => {
                          // setTabIndex(val);
                          dispatch(actions.setSettingsTabVal(val));
                          console.log('Vertical', e, val);
                        }}
                        aria-label="Vertical tabs example"
                        sx={pageStyles.tagStyle}
                      >
                        <Tab
                          icon={
                            <TabLabelWrapper>
                              <Profile />
                              <StyledSpanWrapper>My Profile</StyledSpanWrapper>
                            </TabLabelWrapper>
                          }
                          {...a11yProps(0)}
                        />
                        <Tab
                          icon={
                            <TabLabelWrapper>
                              <Notification />
                              <StyledSpanWrapper>
                                Notifications
                              </StyledSpanWrapper>
                            </TabLabelWrapper>
                          }
                          {...a11yProps(1)}
                        />
                        <Tab
                          {...a11yProps(2)}
                          icon={
                            <TabLabelWrapper>
                              <Help />
                              <StyledSpanWrapper>Help Centre</StyledSpanWrapper>
                            </TabLabelWrapper>
                          }
                        />
                        <Tab
                          {...a11yProps(3)}
                          icon={
                            <TabLabelWrapper>
                              <Privacy />
                              <StyledSpanWrapper>
                                Privacy & Policy
                              </StyledSpanWrapper>
                            </TabLabelWrapper>
                          }
                        />
                        <Tab
                          {...a11yProps(4)}
                          icon={
                            <TabLabelWrapper>
                              <Subscription />
                              <StyledSpanWrapper>
                                My Subscription
                              </StyledSpanWrapper>
                            </TabLabelWrapper>
                          }
                        />
                      </StyledTab>
                    </StyledGrid>
                    <Grid item xs={12} sm={9} md={8} sx={{ minWidth: 0 }}>
                      <TabPanel value={SelectSettingsTabVal!} index={0}>
                        <StaticProfile />
                      </TabPanel>
                      <TabPanel value={SelectSettingsTabVal!} index={1}>
                        <NotificationTab />
                      </TabPanel>
                      <TabPanel value={SelectSettingsTabVal!} index={2}>
                        <HelpCentreTab />
                      </TabPanel>
                      <TabPanel value={SelectSettingsTabVal!} index={3}>
                        <PrivacyPolicyTab />
                      </TabPanel>
                      <TabPanel value={SelectSettingsTabVal!} index={4}>
                        <StaticPlans />
                      </TabPanel>
                    </Grid>
                  </Grid>
                </Box>
              </SubWrapper>
            </Grid>
          </StyledBox>
        </Grid>
      )}
      <Footer />
    </>
  );
};

const SubWrapper = styled.div`
  .Box-settings-title {
    & > div {
      width: 100% !important;
      margin: 0 !important;
    }
  }
  .custom-grid-container {
    @media (min-width: 1366px) and (max-width: 4000px) {
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
    }
    @media (min-width: 992px) and (max-width: 1199px) {
    }
    @media (min-width: 768px) and (max-width: 991px) {
      /* max-width: 150px; */
    }
    @media (min-width: 576px) and (max-width: 767px) {
      height: 100% !important;
      display: block !important;
      .StyledGrid {
        height: fit-content !important;
        max-width: 100% !important;
        .MuiTabs-vertical {
          .MuiTabs-scroller {
            .MuiTabs-flexContainer.MuiTabs-flexContainerVertical {
              flex-direction: row !important;
              .MuiTab-root {
                min-width: unset !important;
                width: 30px !important;
                & > div {
                  width: 35px !important;
                }
              }
            }
          }
        }
      }
      .MuiGrid-root.MuiGrid-item {
        max-width: 100% !important;
      }
    }
    @media (min-width: 320px) and (max-width: 575px) {
      height: 100% !important;
      display: block !important;
      .StyledGrid {
        height: fit-content !important;
        padding-top: 10px;
        .MuiTabs-vertical {
          .MuiTabs-scroller {
            padding-top: 0px !important;
            .MuiTabs-flexContainer.MuiTabs-flexContainerVertical {
              flex-direction: row !important;
              .MuiTab-root {
                min-width: unset !important;
                width: 30px !important;
                & > div {
                  width: 35px !important;
                }
              }
            }
          }
        }
      }
      .CheckoutFormWrapper {
        padding: 20px 20px !important;
      }
    }
  }
`;
const Wrappr = styled.div`
  h1 {
    text-align: start;
    color: #ffffff;
    font-family: Urbanist;
    font-size: 22px;
  }
`;
const StyledTab = styled(Tabs)`
  border: none !important;
  .MuiTabs-scroller {
    padding-top: 12px;
    @media (min-width: 768px) and (max-width: 991px) {
      padding-top: 12px;
    }
  }
  .Mui-selected {
    color: #e0be00 !important;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    svg {
      path {
        stroke: #e0be00 !important;
      }
    }
  }
  .MuiGrid-root {
    margin-top: 8px;
  }

  .MuiTab-root {
    color: #ffffff;
    font-size: 12px;
    text-align: unset !important;
    align-items: unset;
    text-transform: unset;
    letter-spacing: 0.5px;
    padding: 0 !important;
  }
  .MuiAvatar-root {
    margin-bottom: 0 !important;
    width: 15px;
    height: 15px;
  }
  .MuiTabs-indicator {
    background: none !important;
  }
`;

const TabLabelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-family: Urbanist;
  font-size: 14px;
  svg {
    margin-right: 20px !important;
    /* fill: #ffffff; */
    color: #ffffff;
    width: 20px;
    height: 20px;
    path {
      stroke: #ffffff;
    }
  }
`;
const StyledSpanWrapper = styled.span`
  @media (min-width: 576px) and (max-width: 767px) {
    display: none;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    display: none;
  }
`;
const StyledBox = styled(Box)`
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;
export default Settings;

const StyledGrid = styled(Grid)`
  @media (min-width: 320px) and (max-width: 575px) {
    /* padding-left: 0px !important; */
  }
`;
