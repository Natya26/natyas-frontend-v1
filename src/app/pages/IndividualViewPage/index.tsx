import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import vector from './assets/images/icons/Vector.png';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from 'app/RoutePath';
import Box from '@mui/material/Box';
import MyComponent from 'app/components/AddButton';
import { useState } from 'react';
import { PlayButton } from 'app/components/PlayButton';
import { LikeButton } from 'app/components/LikeButton';
import { Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { WatchCard } from 'app/components/WatchCard';
import { TrailerCard } from 'app/components/TrailerCard';
import ImageCard from 'app/components/ImageCard';
import logo from './assets/images/logo/Fusion-logo.png';
import { selectSeries, selectSimilarSeries } from './slice/selectors';
import dateFormat from 'dateformat';
import { useDispatch, useSelector } from 'react-redux';
import useApi from 'services/mavapi/useApi';
import { HomeApiService } from 'services/openapi/services/HomeApiService';
import { SeriesApIsService } from 'services/openapi/services/SeriesApIsService';
import { SERVER_BASE_URL } from 'utils/constants';
import {
  HomeHeadLabelWrapper,
  HomeSectionWrapper,
  SectionWrapper,
} from 'app/components/Wrappers';
import { SliderCarouselResponsive } from '../HomePage/components/CarouselResponsiveData';
import { ListHeadLabel } from 'app/components/MLabel';
import Carousel from 'react-multi-carousel';
import { useIndividualViewSlice } from './slice';
import { selectPageLoader } from '../slice/selectors';
import { useManageAppSlice } from '../slice';
import PageLoaderWrapper from 'app/components/PageLoaderWrapper';
import PulseLoader from 'react-spinners/PulseLoader';
import { Footer } from 'app/components/Footer';
import { selectCurrentUserSubscription } from '../Settings/slice/selectors';
import { useManageUserSlice } from '../Settings/slice';
import { SubscriptionApiService } from 'services/openapi/services/SubscriptionApiService';
// import FusionVideo from '../FusionHomePage/constants/index';

type Props = {
  children?: React.ReactNode;
  index?: number;
  value?: number;
  episodeId?: number;
  count?: string;
  name?: string;
  duration?: string;
  summary?: string;
  src?: string;
  title?: string;
  className?: string;
  // id?: number | string;
  image?: string;
  url?: string;
};

export const IndividialView = ({
  children,
  value,
  index,
  episodeId,
  count,
  name,
  duration,
  summary,
  src,
  title,
  className,
  // id,
  image,
  url,
  ...other
}: Props) => {
  const { seriesId: routeSeriesId } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const handleBack = () => {
    window.history.back();
  };
  const { error: apiError, isLoading, handleRequest } = useApi();
  const [error, setError] = React.useState<unknown | null>();
  const SeriesPayload = useSelector(selectSeries);

  //updated for fusion
  // const FusionSeriesPayload = FusionVideo.filter(
  //   item => item.id.toString() === routeSeriesId,
  // );

  // const FusionSimilarSeriesPayload = FusionVideo.filter(
  //   obj => JSON.stringify(obj) !== JSON.stringify(FusionSeriesPayload[0]),
  // );
  const SimilarSeriesPayload = useSelector(selectSimilarSeries);
  const pageLoader = useSelector(selectPageLoader);

  //Slice
  const { actions: userActions } = useManageUserSlice();

  //Currrent user subscription
  const dispatch = useDispatch();
  const { actions: IndividualViewAction } = useIndividualViewSlice();
  const { actions: AppActions } = useManageAppSlice();
  const currentSubscription = useSelector(selectCurrentUserSubscription);
  //Services
  const { addOrRemoveMyList } = HomeApiService;
  const { addOrRemoveLikedSeries, getSeries, getSimilarSeries } =
    SeriesApIsService;
  const { getUserSubscriptionPlan } = SubscriptionApiService;

  const handleAddMyList = e => {
    if (e === true) {
      handleRequest(addOrRemoveMyList({ series_id: SeriesPayload?.id }, 'ADD'))
        .then(res => {
          if (res.data) {
          }
        })
        .catch(error => {
          setError(apiError);
        });
    } else {
      handleRequest(
        addOrRemoveMyList({ series_id: SeriesPayload?.id }, 'REMOVE'),
      )
        .then(res => {
          if (res.data) {
          }
        })
        .catch(error => {
          setError(apiError);
        });
    }
  };
  const handleLike = e => {
    if (e === true) {
      handleRequest(
        addOrRemoveLikedSeries({ series_id: SeriesPayload?.id }, 'ADD'),
      )
        .then(res => {
          if (res.data) {
          }
        })
        .catch(error => {
          setError(apiError);
        });
    } else {
      handleRequest(
        addOrRemoveLikedSeries({ series_id: SeriesPayload?.id }, 'REMOVE'),
      )
        .then(res => {
          if (res.data) {
          }
        })
        .catch(error => {
          setError(apiError);
        });
    }
  };
  //Get User Subscription
  const handleGetUserSubscription = () => {
    handleRequest(getUserSubscriptionPlan())
      .then(res => {
        if (res?.data?.subscription) {
          console.log(
            res,
            'user  subscription res from home--------------------------------------',
          );
          dispatch(
            userActions.setCurrentUserSubscription(res?.data?.subscription),
          );
        }
      })
      .catch(err => console.log(err, 'user subscription err'));
  };
  //expiry date
  const ExpiryDate: boolean =
    currentSubscription?.valid_till! > new Date().toISOString();
  //Handle get series
  const handleGetSeries = (seriesId?: number) => {
    handleRequest(getSeries(seriesId))
      .then(res => {
        if (res.data) {
          dispatch(IndividualViewAction.setSeries(res?.data));
          dispatch(AppActions.setPageLoader(false));
          scrollToTop();
        }
      })
      .catch(error => {
        setError(apiError);
      });
  };
  //Handle get similar-series
  const handleGetSimilarSeries = (seriesId?: number) => {
    handleRequest(getSimilarSeries(seriesId))
      .then(res => {
        if (res.data) {
          dispatch(IndividualViewAction.setSimilarSeries(res?.data));
        }
      })
      .catch(error => {
        setError(apiError);
      });
  };

  const handleSimilarSeriesClick = e => {
    if (e) {
      navigate(
        RoutePath.individualview.path.replace(':seriesId', e.toString()),
      );
    }
    handleGetSeries(e);
    handleGetSimilarSeries(e);
  };
  const handlePlayClick = (e, id: string) => {
    if (currentSubscription?.active && ExpiryDate) {
      navigate(RoutePath.playvideo.path.replace(':videoId', id));
    } else {
      navigate(RoutePath.settings.path); //Redirect to settings page
      dispatch(userActions.setSettingsTabVal(4)); //for making subscription tab active
    }
    // navigate(RoutePath.playvideo.path.replace(':videoId', id));
  };
  const handleWatch = (e, id: string) => {
    if (currentSubscription?.active && ExpiryDate) {
      navigate(RoutePath.playvideo.path.replace(':videoId', id));
    } else {
      navigate(RoutePath.settings.path); //Redirect to settings page
      dispatch(userActions.setSettingsTabVal(4)); //for making subscription tab active
    }
    // navigate(RoutePath.playvideo.path.replace(':videoId', id));
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  function TabPanel({ children, value, index, ...other }: Props) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
        )}
      </div>
    );
  }
  const release_date = '2024';
  const releaseYear = dateFormat(release_date?.toString(), 'yyyy');
  const scrollToTop = () => {
    var element = document.getElementById('mainWrapper');
    element!.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  useEffect(() => {
    dispatch(AppActions.setPageLoader(true));
    handleGetUserSubscription();
    let seriesId: number = parseInt(routeSeriesId!);
    handleGetSeries(seriesId);
    handleGetSimilarSeries(seriesId);
  }, []);

  const encodedBannerImg = encodeURI(SERVER_BASE_URL + SeriesPayload?.poster);

  //updated for fusion static page.
  // const encodedBannerImg = encodeURI(FusionSeriesPayload[0]?.image);
  return (
    <>
      {pageLoader ? (
        <>
          <PageLoaderWrapper>
            <PulseLoader color="#f4793b" />
          </PageLoaderWrapper>
        </>
      ) : (
        <MainWrapper id="mainWrapper">
          <FirstWrapper
            style={{
              background: `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${encodedBannerImg})`,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid xs={7} sm={6} md={6} lg={6} xl={6}>
                  <LeftWrapper>
                    <TopWrapper>
                      <VectorButton variant="text" onClick={handleBack}>
                        <VectorImg src={vector} alt="vector" />
                      </VectorButton>

                      <HeadingWrapper>{SeriesPayload?.name}</HeadingWrapper>
                    </TopWrapper>

                    <ContentWrapper>
                      <ParaWrapper>
                        {releaseYear}. {SeriesPayload?.languages?.[0]?.name}
                      </ParaWrapper>
                      <FirstParaWrapper>
                        {SeriesPayload?.description}
                      </FirstParaWrapper>
                      <IconWrapper>
                        <ListWrapper>
                          <StyledMyList
                            value={SeriesPayload?.isInMyList}
                            onClick={handleAddMyList}
                          />
                          <SecondParaWrapper>My List</SecondParaWrapper>
                        </ListWrapper>
                        <LikeWrapper>
                          <div className="icon">
                            <LikeButton
                              value={SeriesPayload?.isLiked}
                              onClick={handleLike}
                            />
                          </div>
                          <ThirdParaWrapper>Like</ThirdParaWrapper>
                        </LikeWrapper>
                      </IconWrapper>
                    </ContentWrapper>
                  </LeftWrapper>
                </Grid>
                <Grid xs={5} sm={6} md={6} lg={6} xl={6}>
                  {SeriesPayload?.trailers?.length ? (
                    <RightWrapper>
                      <PlayButton
                        onClick={e =>
                          handlePlayClick(
                            e,
                            SeriesPayload?.trailers?.[0]?.fwp_id!,
                          )
                        }
                        className="playbtn"
                      />
                    </RightWrapper>
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
            </Box>
          </FirstWrapper>
          <SecondWrapper>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  borderBottom: '1px solid',
                  borderColor: '#000000',
                  width: '100%',
                }}
              >
                <StyledTab
                  value={tabIndex}
                  onChange={handleChange}
                  defaultValue={0}
                  aria-label="basic tabs example"
                >
                  <Tab label="Watch" {...a11yProps(0)} />
                  <Tab label="Cast and Details" {...a11yProps(1)} />
                </StyledTab>
              </Box>
              <TabPanel value={tabIndex} index={0}>
                <WatchWrapper>
                  <h4>{SeriesPayload?.seasons?.[0]?.name}</h4>

                  {SeriesPayload?.seasons?.[0]?.episodes?.map(
                    (episode, index) => {
                      return (
                        <StyledWatchCard
                          key={index}
                          src={
                            episode?.poster
                              ? SERVER_BASE_URL + episode?.poster
                              : ''
                          }
                          name={episode.name}
                          summary={episode.description}
                          duration={episode?.duration}
                          onClick={e => handleWatch(e, episode?.fwp_id!)}
                        />
                      );
                    },
                  )}
                  {/* updated for fusion static page */}
                  {/* {FusionSeriesPayload?.map((episode, index) => {
                    return (
                      <StyledWatchCard
                        key={index}
                        src={episode?.image ? episode?.image : ''}
                        name={episode.title}
                        summary={episode.description}
                        duration={episode?.duration}
                        onClick={e => handleWatch(e, episode?.id.toString()!)}
                      />
                    );
                  })} */}
                  <div className="border" />
                  {/* <h4>Trailers</h4>
                  <TrailerWrapper>
                    {SeriesPayload?.trailers?.map((trailer, index) => {
                      return (
                        <TrailerCard
                          key={trailer.id}
                          src={
                            trailer?.poster
                              ? SERVER_BASE_URL + trailer?.poster
                              : ''
                          }
                          label={trailer.name}
                          onClick={e => handlePlayClick(e, trailer?.fwp_id!)}
                          className="card"
                        />
                      );
                    })}
                  </TrailerWrapper> */}
                  <div className="border" />
                </WatchWrapper>
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <SubWrapper style={{ marginTop: '30px' }}>
                  <SubHeadingWrapper>Director</SubHeadingWrapper>
                  <SubParaWrapper>
                    {SeriesPayload?.director
                      ? SeriesPayload?.director
                      : 'No data availabale'}
                  </SubParaWrapper>
                </SubWrapper>
                <SubWrapper>
                  <SubHeadingWrapper>Cast</SubHeadingWrapper>
                  {SeriesPayload?.casts?.length ? (
                    SeriesPayload?.casts?.map((cast, index) => {
                      return <SubParaWrapper>{cast.name},</SubParaWrapper>;
                    })
                  ) : (
                    <SubParaWrapper>No data availabale</SubParaWrapper>
                  )}
                </SubWrapper>
                <hr color="#000000" />
              </TabPanel>
            </Box>
          </SecondWrapper>
          {SimilarSeriesPayload?.length && (
            <SectionWrapper>
              <HomeHeadLabelWrapper>
                <ListHeadLabel>SIMILAR SERIES</ListHeadLabel>
              </HomeHeadLabelWrapper>
              <StyledHomeSectionWrapper>
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  responsive={SliderCarouselResponsive}
                  ssr={true}
                  infinite={false}
                  arrows={false}
                  autoPlay={false}
                  autoPlaySpeed={1000}
                  keyBoardControl={false}
                  customTransition="transform 300ms ease-in-out"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  deviceType={'desktop'}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {SimilarSeriesPayload?.map((item, index) => (
                    <ImageCard
                      key={index}
                      poster={
                        item?.poster ? SERVER_BASE_URL + item?.poster : ''
                      }
                      onClick={e => handleSimilarSeriesClick(item.id!)}
                    />
                  ))}
                </Carousel>
              </StyledHomeSectionWrapper>
            </SectionWrapper>
          )}
          <Footer />
        </MainWrapper>
      )}
    </>
  );
};
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2a2727;
  .border {
    border-bottom: 1px solid black;
  }
`;
const FirstWrapper = styled.div`
  font-family: Urbanist !important;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  width: 100%;
  height: 87vh;
  padding: 70px 40px 40px 50px;
  background-size: cover !important;
  background-position: 25% 50% !important;
  background-repeat: no-repeat !important;
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 60px 20px 10px 20px !important;
    height: 70vh;
  } ;
`;
const LeftWrapper = styled.div``;

const TopWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  @media (min-width: 320px) and (max-width: 575px) {
    // justify-content: center;
  }
`;

const VectorButton = styled(Button)`
  min-width: unset !important;
  padding: 0px;
`;
const VectorImg = styled.img`
  width: 15x;
  height: 15px;
  @media (min-width: 320px) and (max-width: 575px) {
    padding-right: 15px;
  }
`;

const HeadingWrapper = styled.h1`
  font-size: 50px;
  color: #ffffff;
  margin: 0px;
  font-weight: 900;
  text-align: left;
  padding: 15px 0px 0px 30px;
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 45px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 40px;
    padding: 10px 0px 0px 30px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 35px;
    padding: 6px 0px 0px 30px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 26px;
    padding: 3px 0px 0px 11px;
  }
  @media (min-width: 415px) and (max-width: 575px) {
    padding: 0px 0px 0px 0px;
    font-size: 22px;
  }
  @media (min-width: 320px) and (max-width: 414px) {
    padding: 30px 20px 0px 0px;
    font-size: 20px;
  }
`;

const ParaWrapper = styled.pre`
  margin: 5px 0px 90px 0px;
  font-weight: 100;
  font-family: 'Urbanist';
  font-size: 17px;
  letter-spacing: 2px;
  text-align: left;

  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 13px;
    margin: 5px 0px 80px 0px;
    // padding-right: 34px;
  }
`;

const FirstParaWrapper = styled.p`
  font-weight: 100;
  font-family: 'Urbanist';
  font-size: 16px;
  overflow: auto;
  letter-spacing: 2px;
  text-align: left;

  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 12px;
  }
`;

const ContentWrapper = styled.div`
  padding-left: 53px;
  @media (min-width: 576px) and (max-width: 767px) {
    padding-left: 33px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    padding-left: 38px;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-top: 10px;
  @media (min-width: 320px) and (max-width: 575px) {
    padding-right: 12px;
  }
`;

const ListWrapper = styled.div`
  padding-right: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 10px;
`;
const StyledMyList = styled(MyComponent)`
  width: 100px !important;
  height: 100px !important;
  cursor: pointer;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  .css-1e6y48t-MuiButtonBase-root-MuiButton-root {
    padding: 0px;
  }
`;

const SecondParaWrapper = styled.p`
  font-size: 14px;
  margin: 10px 0px;
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 10px;
  }
`;
const ThirdParaWrapper = styled.p`
  font-size: 14px;
  margin: 10px 0px;
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 10px;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .playbtn {
    img {
      width: 170px;
      height: auto;
      cursor: pointer;
    }
    @media (min-width: 1366px) and (max-width: 4000px) {
      img {
        width: 180px;
        height: auto;
      }
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      img {
        width: 165px;
        height: auto;
      }
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      img {
        width: 155px;
        height: auto;
      }
    }
    @media (min-width: 768px) and (max-width: 991px) {
      img {
        width: 140px;
        height: auto;
      }
    }
    @media (min-width: 576px) and (max-width: 767px) {
      img {
        width: 110px;
        height: auto;
      }
    }
    @media (min-width: 320px) and (max-width: 575px) {
      img {
        width: 90px;
        height: auto;
      }
    }
  }
`;
const SecondWrapper = styled.div`
  font-family: Urbanist !important;
  display: flex;
  justify-content: center;
  color: #ffffff;
  width: 100%;
  height: 100%;
  padding: 20px 50px 20px 50px;
  border-bottom: '1px solid #000000';
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 15px;
  }
`;

const StyledTab = styled(Tabs)`
  border: none !important;
  padding-bottom: 0px;
  .Mui-selected {
    color: #f4793b !important;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }
  .MuiTab-root {
    color: #ffffff;
    font-family: Urbanist;
    font-weight: 500;
    font-size: 13px;
    text-align: unset !important;
    align-items: unset;
    text-transform: unset;
  }
  .MuiAvatar-root {
    margin-bottom: 0 !important;
    width: 15px;
    height: 15px;
  }
  .MuiTabs-indicator {
    height: 2px;
    bottom: 0;
    background-color: #f4793b !important;
  }
  .MuiBox-root {
    border: none !important;
  }
`;

const WatchWrapper = styled.div`
  position: relative;
  padding: 0px;
  margin: 0px;
  h4 {
    color: #ffffff;
    text-transform: capitalize;
    letter-spacing: 1px;
    margin: 0px;
    margin-top: 40px;
  }
  .watch-wrapper {
    justify-content: space-between;
    padding: 0px;
    box-shadow: none;

    .summary {
      padding-right: 50px;
    }

    @media (min-width: 320px) and (max-width: 575px) {
      h4 {
        text-align: left;
      }
      p {
        font-size: 10px !important;
      }
    }
  }
`;
const StyledWatchCard = styled(WatchCard)`
  padding-right: 30px;
`;
const SubWrapper = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 30px;
`;

const SubHeadingWrapper = styled.h2`
  margin: 0px !important;
  padding: 0px;
  color: #ffffff;
  font-weight: 700;
  font-family: Urbanist !important;
  font-size: 15px !important;
  letter-spacing: 0.5px;
  line-height: 1.6;
`;

const SubParaWrapper = styled.p`
  margin: 0px !important;
  padding: 0px;
  position: absolute;
  top: 1px;
  left: 100px;
  color: #ffffff;
  font-weight: 100;
  font-family: Urbanist !important;
  font-size: 14px !important;
  letter-spacing: 0.5px;
  line-height: 1.6; ;
`;

const TrailerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  flex-wrap: wrap;
  .card {
    padding-right: 50px;
  }

  // @media (min-width: 576px) and (max-width: 767px) {
  //   display: flex;
  //   justify-content: center;
  //   flex-wrap: wrap;
  // }
  // @media (min-width: 320px) and (max-width: 575px) {
  //   display: flex;
  //   justify-content: center;
  //   padding: 0px 40px;
  //   flex-wrap: wrap;
  // }
`;
const StyledHomeSectionWrapper = styled(HomeSectionWrapper)`
  .react-multi-carousel-item {
    width: fit-content !important;
    margin-right: 2.5% !important;
  }
`;
