import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useApi from 'services/mavapi/useApi';
import { VideoApIsService } from 'services/openapi/services/VideoApIsService';
import { useManagePlayVideoSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentlyWatching,
  selectThumbnail,
  selectVideoUrl,
} from './slice/selectors';
import { SERVER_BASE_URL } from 'utils/constants';
//...........VimeVideoPlayer Imports......./
import '@vime/core/themes/default.css';
import {
  Player,
  Ui,
  Icon,
  IconLibrary,
  Hls,
  Controls,
  PlaybackControl,
  ControlSpacer,
  TimeProgress,
  FullscreenControl,
  SettingsControl,
  VolumeControl,
  ScrubberControl,
  DefaultSettings,
  ClickToPlay,
  DblClickFullscreen,
  usePlayerContext,
  LoadingScreen,
  Video,
} from '@vime/react';

import playIcon from './assets/img/icons/playIcon.svg';
import pauseIcon from './assets/img/icons/pauseIcon.svg';
import settingsIcon from './assets/img/icons/settingIcon.svg';
import backwardIcon from './assets/img/icons/backward.svg';
import forwardIcon from './assets/img/icons/forward.svg';
import back from './assets/img/icons/back.svg';
import { WatchCard } from 'app/components/WatchCard';
import { TextFieldContentLabel } from 'app/components/MLabel';
import { SpinnerCircularFixed } from 'spinners-react';
import PageLoaderWrapper from 'app/components/PageLoaderWrapper';
import { selectPageLoader } from '../slice/selectors';
import { useManageAppSlice } from '../slice';
import { Footer } from 'app/components/Footer';
import FusionVideo from '../FusionHomePage/constants/index';

type Props = {};

const PlayVideo = (props: Props) => {
  const { videoId: routeVideoId } = useParams();
  // const { error: apiError, isLoading, handleRequest } = useApi();
  // const { getVideo } = VideoApIsService;
  const dispatch = useDispatch();
  const { actions: AppActions } = useManageAppSlice();

  const { actions } = useManagePlayVideoSlice();

  //Selectors
  const VideoUrl = useSelector(selectVideoUrl);
  // const thumbnail = useSelector(selectThumbnail);
  // const CurrentlyWatchingPayload = useSelector(selectCurrentlyWatching);
  const pageLoader = useSelector(selectPageLoader);

  const [currentTime, setCurrentTime] = useState(0);
  const FusionSeriesPayload = FusionVideo.filter(
    item => item.id.toString() === routeVideoId,
  );
  const onTimeUpdate = (event: CustomEvent<number>) => {
    setCurrentTime(event.detail);
  };
  const seekForward = () => {
    setCurrentTime(currentTime + 10);
  };
  const seekBackward = () => {
    setCurrentTime(currentTime - 10);
  };
  const onClickBack = () => {
    window.history.back();
  };
  const handleGetVideo = id => {
    //commented out for fusion
    // handleRequest(getVideo(id)).then(res => {
    //   if (res.data) {
    //     dispatch(
    //       actions.setThumbnail(
    //         res?.data?.metadata?.poster
    //           ? SERVER_BASE_URL + res?.data?.metadata?.poster
    //           : '',
    //       ),
    //     );
    //     dispatch(actions.setVideoUrl(res?.data?.metadata?.encodings?.[0]?.url));
    //     dispatch(
    //       actions.setCurrentlyWatching({
    //         name: res?.data?.metadata?.name,
    //         description: res?.data?.metadata?.description,
    //         duration: res?.data?.metadata?.duration!,
    //         poster: res?.data?.metadata?.poster,
    //       }),
    //     );
    //     setTimeout(() => {
    //       dispatch(AppActions.setPageLoader(false));
    //     }, 2000);
    //   }
    // });
    dispatch(actions.setVideoUrl(FusionSeriesPayload[0]?.url));
    setTimeout(() => {
      dispatch(AppActions.setPageLoader(false));
    }, 2000);
  };
  useEffect(() => {
    dispatch(AppActions.setPageLoader(true));
    handleGetVideo(routeVideoId);
  }, []);

  // const handlePlay = () => {
  //   console.log('eeeeeeeeeeeeeee');
  // };
  return (
    <>
      {pageLoader ? (
        <PageLoaderWrapper
          className={`PageLoaderWrapper ${pageLoader ? 'loading' : ''}`}
        >
          <SpinnerCircularFixed
            size={69}
            thickness={73}
            speed={143}
            color="rgba(244, 121, 59, 1)"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </PageLoaderWrapper>
      ) : VideoUrl && !pageLoader ? (
        <MainWrapper id="mainWrapper">
          <SubWrapper>
            <NavarasaVideoPlayer
              currentTime={currentTime}
              className="navarasa-player"
            >
              {/* <Hls version="1.4.14">
                <source data-src={VideoUrl} type="application/x-mpegURL" />
              </Hls> */}

              {/* //updated for fusion */}
              <Video crossOrigin="" poster="">
                <source data-src={VideoUrl} type="video/mp4" />
              </Video>

              <Ui>
                <LoadingScreen hideDots={false}>Loading</LoadingScreen>
                <ClickToPlay />
                <Controls pin="topLeft">
                  <div className="back-icon">
                    <Icon
                      src={back}
                      label="back"
                      style={{ scale: '1' }}
                      onClick={onClickBack}
                    />
                    <div>
                      <StyledTextFieldContentLabel>
                        {/* {CurrentlyWatchingPayload?.name} */}
                        {FusionSeriesPayload[0]?.title}
                      </StyledTextFieldContentLabel>
                    </div>
                  </div>
                </Controls>
                <div className="setting-style">
                  <Controls pin="topRight" justify="end">
                    <div className="icon-style">
                      <Controls>
                        <IconLibrary
                          name="setting"
                          resolver={iconName =>
                            iconName === 'settingsIcon' ? `${settingsIcon}` : ``
                          }
                        />
                      </Controls>
                      <SettingsControl
                        icons="setting"
                        icon="settingsIcon"
                        style={{ padding: '20px' }}
                        aria-checked
                      />
                    </div>
                    <div className="d-setting">
                      <DefaultSettings
                        pin="topRight"
                        className="default-settings"
                      />
                    </div>
                  </Controls>
                </div>
                <Controls pin="center" justify="center">
                  <IconLibrary
                    name="my-library"
                    resolver={iconName =>
                      iconName === 'playIcon' ? `${playIcon}` : `${pauseIcon}`
                    }
                  />
                  <PlaybackControl
                    hideTooltip
                    icons="my-library"
                    playIcon="playIcon"
                    pauseIcon="pauseIcon"
                  ></PlaybackControl>
                </Controls>
                <Controls className="time-volume">
                  <TimeProgress
                    separator="/"
                    style={{ paddingLeft: '20px', paddingBottom: '20px' }}
                  />
                  <VolumeControl
                    style={{ scale: '.5', marginBottom: '20px' }}
                    hideTooltip
                  />
                  <ControlSpacer />
                  <FullscreenControl
                    style={{ scale: '.5', marginBottom: '20px' }}
                    hideTooltip
                  />
                </Controls>

                <div className="scrubber">
                  <Controls>
                    <ScrubberControl />
                  </Controls>
                </div>
                <Controls pin="center">
                  <div className="backard-icon">
                    <Icon
                      src={backwardIcon}
                      label="backard"
                      style={{ scale: '2.75' }}
                      onClick={seekBackward}
                    />
                  </div>
                </Controls>
                <Controls pin="center">
                  <div className="forward-icon">
                    <Icon
                      src={forwardIcon}
                      label="forward"
                      style={{ scale: '2.75' }}
                      onClick={seekForward}
                    />
                  </div>
                </Controls>
                <DblClickFullscreen />
              </Ui>
            </NavarasaVideoPlayer>
          </SubWrapper>
          {/* <WatchWrapper>
            <h4>You are currently watching</h4>
            <StyledWatchCard
              src={
                CurrentlyWatchingPayload?.poster
                  ? SERVER_BASE_URL + CurrentlyWatchingPayload?.poster
                  : ''
              }
              name={CurrentlyWatchingPayload?.name}
              summary={CurrentlyWatchingPayload?.description}
              duration={CurrentlyWatchingPayload?.duration}
            />
          </WatchWrapper> */}
          <Footer />
        </MainWrapper>
      ) : (
        ''
      )}
    </>
  );
};

export default PlayVideo;
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #000000;

  .border {
    border-bottom: 1px solid black;
  }
  vm-controls {
    --vm-control-scale: 1.75;
    --vm-icon-fill: transparent !important;
    --vm-settings-max-height: fit-content;
    --vm-controls-padding:: 0px !important;
  }
  .backard-icon {
    margin-left: 15%;
    cursor: pointer;
    position: absolute;
  }
  .forward-icon {
    margin-right: 15%;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
  .back-icon {
    cursor: pointer;
    margin: 2%;
    position: absolute;
    top:0;
    display: flex;
    align-items: center;
    justify-content: start;
  }
  vm-player[video] {
    position: relative !important;
  }
  .icon-style {
      --vm-icon-fill: transparent !important;
      margin-right: 25px;
  }
  .setting-style{
    vm-controls {--vm-control-icon-size: 20px;
      z-index: 1000;
      --vm-icon-fill: #ffffff !important;
      }
    position: absolute;
    right: 0px;
     
   
  }
  .d-setting {
    top: 65px;
    position: absolute;
    
  }
  vm-menu-item {
    vm-controls {}
  }
  .scrubber{
    vm-controls {
      --vm-slider-value-color: #F4793B !important;
      --vm-slider-track-height: 15px;
      --vm-scrubber-buffered-bg: #ffffff !important;
      --vm-slider-track-focused-height: 15px;
      --vm-slider-thumb-bg: transparent;
      

    }
    vm-scrubber-control{
      margin-right: unset;
      left: unset;
    }
  }
  
  vm-volume-control {
    --vm-icon-fill: white;
  }
  vm-fullscreen-control {
     --vm-icon-fill: white;
  }
`;
const SubWrapper = styled.div`
  margin: auto;
  max-width: 178vh;
`;
const NavarasaVideoPlayer = styled(Player)``;
const WatchWrapper = styled.div`
  width: 100%;
  background-color: #000000;
  position: relative;
  padding: 1% 6.5%;
  margin: auto;
  @media (min-width: 320px) and (max-width: 1366px) {
    width: 100%;
  }
  h4 {
    color: #ffffff;
    font-family: 'Urbanist';
    text-transform: capitalize;
    letter-spacing: 1px;
    margin: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 1%;
  }
  .watch-wrapper {
    background: #000000 !important;
    padding: 30px;
    box-shadow: none;
    margin: 0px;

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
const StyledWatchCard = styled(WatchCard)``;
const StyledTextFieldContentLabel = styled(TextFieldContentLabel)`
  font-weight: 700 !important;
  margin-left: 15px;
`;
