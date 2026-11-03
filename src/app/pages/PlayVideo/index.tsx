import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from 'app/RoutePath';
import useApi from 'services/mavapi/useApi';
import { VideoApIsService } from 'services/openapi/services/VideoApIsService';
import { useManagePlayVideoSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentlyWatching,
  selectThumbnail,
  selectVideoUrl,
} from './slice/selectors';
import { HLS_PLAYBACK_URL, SERVER_BASE_URL } from 'utils/constants';
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

type Props = {};

const PlayVideo = (props: Props) => {
  const { videoId: routeVideoId } = useParams();
  const navigate = useNavigate();
  const { error: apiError, isLoading, handleRequest } = useApi();
  const { getVideo } = VideoApIsService;
  const dispatch = useDispatch();
  const { actions: AppActions } = useManageAppSlice();

  const { actions } = useManagePlayVideoSlice();

  //Selectors
  const VideoUrl = useSelector(selectVideoUrl);
  const thumbnail = useSelector(selectThumbnail);
  const CurrentlyWatchingPayload = useSelector(selectCurrentlyWatching);
  const pageLoader = useSelector(selectPageLoader);

  const [currentTime, setCurrentTime] = useState(0);
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
    navigate(RoutePath.homepage.path);
  };
  const handleGetVideo = id => {
    dispatch(actions.setVideoUrl(HLS_PLAYBACK_URL));
    dispatch(
      actions.setCurrentlyWatching({
        name: 'Ambalapravu',
        description: '1970 Malayalam full movie',
        duration: 8501,
        poster: '',
      }),
    );
    handleRequest(getVideo(id)).then(res => {
      const metadata = res?.data?.metadata;
      if (metadata) {
        dispatch(
          actions.setThumbnail(
            metadata.poster ? SERVER_BASE_URL + metadata.poster : '',
          ),
        );
        dispatch(
          actions.setCurrentlyWatching({
            name: metadata.name || 'Ambalapravu',
            description: metadata.description,
            duration: metadata.duration || 8501,
            poster: metadata.poster,
          }),
        );
      }
      dispatch(AppActions.setPageLoader(false));
    });
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
            <NatyaVideoPlayer
              currentTime={currentTime}
              className="natya-player"
            >
              <Hls version="1.4.14">
                <source data-src={VideoUrl} type="application/x-mpegURL" />
              </Hls>

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
                        {CurrentlyWatchingPayload?.name}
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
            </NatyaVideoPlayer>
          </SubWrapper>
          <WatchWrapper>
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
          </WatchWrapper>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 120px 24px 0;
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
      --vm-slider-value-color: #e0be00 !important;
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
  margin: 0 auto;
  max-width: 1100px;
`;
const NatyaVideoPlayer = styled(Player)`
  display: block;
  width: 100%;
  height: min(62vh, 620px);
`;
const WatchWrapper = styled.div`
  width: 100%;
  flex: 1 0 auto;
  background-color: #000000;
  position: relative;
  padding: 1% 6.5% 24px;
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
