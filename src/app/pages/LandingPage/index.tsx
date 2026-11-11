import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import backImg from './assets/image/background/Indhriya_background_Img.png';
import { NatyaWordmark } from 'app/components/NatyaWordmark';
import appStore from './assets/image/icons/download-apk.png';
import googlePlay from './assets/image/icons/google-play-button.png';
import emailIcon from './assets/image/icons/email.png';
import phoneIcon from './assets/image/icons/phone.png';
import WhatsappIcon from './assets/image/icons/whatsapp.png';
// import { ReactComponent as GooglePlay } from './assets/image/icons/Googleplay.svg';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import aaraWide from './assets/image/natya/aara-wide.jpg';
import unmadamWide from './assets/image/natya/unmadam-wide.jpg';
import devices from './assets/image/icons/devices.png';
import chuzhal from './assets/image/natya/chuzhal.jpg';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/RoutePath';
import { SERVER_BASE_URL } from 'utils/constants';
import { Footer } from 'app/components/Footer';

type Props = {};

export const LandingPage = (props: Props) => {
  const navigate = useNavigate();

  const mainWrapperRef = useRef<null | HTMLElement>(null);

  const handleWatchClick = () => {
    navigate(RoutePath.signup.path);
  };

  const handleDownloadAndroidApkClick = () => {
    var url = SERVER_BASE_URL + 'download/apk';
    var link = document.createElement('a');
    link.href = url!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MainWrapper id="landingPageMainWrapperId">
      <FirstWrapper id="FirstWrapper">
        <SubWrapper>
          <LandingWordmark />
          <HeadingWrapper>Exclusive content, wherever you go</HeadingWrapper>
          <FirstParaWrapper>
            Get early access to new releases to content exclusively available on
            Natya
          </FirstParaWrapper>
          <ButtonWrapper
            onClick={handleWatchClick}
            variant="contained"
            className="btn-one"
          >
            Watch Movies Online
          </ButtonWrapper>
          <br />
          <div
            style={{
              textDecoration: 'none',
            }}
          >
            <SpanWrapper style={{ display: 'none' }}>
              {' '}
              Download our app{' '}
            </SpanWrapper>
          </div>
          <br />
          <ImgWrapper style={{ display: 'none' }}>
            {/* <div
              style={{
                textDecoration: 'none',
              }}
              className="store-image-block"
            >
              <img
                className="googleButton"
                src={googlePlay}
                alt="google_play"
                onClick={handleGooglePlay}
              />
            </div> */}
            <div
              style={{
                textDecoration: 'none',
              }}
              className="store-image-block"
            >
              <img
                className="appButton"
                src={appStore}
                alt="app_store"
                onClick={handleDownloadAndroidApkClick}
              />
            </div>
          </ImgWrapper>
        </SubWrapper>
      </FirstWrapper>
      <SecondWrapper id="SecondWrapper">
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid className="leftGrid" container spacing={0}>
              <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
                <div>
                  <SecondHeadingWrapper>
                    Exclusive content, <span>wherever you go</span>
                  </SecondHeadingWrapper>
                  <SecondParaWrapper>
                    Become a part of the exclusive Natya community.
                  </SecondParaWrapper>
                  <SecondParaWrapper>
                    Only subscribed members have access to this exclusive
                    content, so you'll be joining a community of like-minded
                    people who love Natya originals.
                  </SecondParaWrapper>
                </div>
              </Grid>
              <Grid className="rightGrid" xs={12} sm={6} md={6} lg={6} xl={6}>
                <GifOneWrapper src={aaraWide} alt="Aara on Natya" />
              </Grid>
            </Grid>
          </Box>
        </div>
      </SecondWrapper>
      <ThirdWrapper id="ThirdWrapper">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid className="leftDevice" xs={12} md={6}>
              <div className="positionDevice">
                <StyledImage
                  className="imgpositionDevice"
                  src={unmadamWide}
                  alt="Unmadam on Natya"
                />
              </div>
            </Grid>
            <Grid className="rightDevice" xs={12} md={6}>
              <div>
                <ThirdHeadingWrapper>
                  Customize your viewing <span>experience</span>
                </ThirdHeadingWrapper>
                {/* <ThirdParaWrapper>
                  Create your own personalized watchlists
                </ThirdParaWrapper> */}
                <ThirdParaWrapper>
                  Change the way you watch content on Natya.
                </ThirdParaWrapper>
                <ThirdParaWrapper>
                  {' '}
                  With our seamless website and mobile application, you can
                  watch content on any device.
                </ThirdParaWrapper>
              </div>
            </Grid>
          </Grid>
        </Box>
      </ThirdWrapper>
      <Fourthwrapper id="Fourthwrapper">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid className="leftNavigation" xs={12} sm={6} md={6}>
              <div>
                <FourthHeadingWrapper>
                  Seamless <span>navigation</span>
                </FourthHeadingWrapper>
                {/* <FourthParaWrapper>
                  User-friendly interface and easy-to-use search function
                </FourthParaWrapper> */}
                <FourthParaWrapper>
                  With our intuitive interface, you can easily navigate our
                  website and mobile app, so you can focus on the content.
                </FourthParaWrapper>
              </div>
              {/* <div>
                <ul>
                  <li>
                    User-friendly interface and easy-to-use search function
                  </li>
                  <li>
                    User-friendly interface and easy-to-use search function
                  </li>
                  <li>
                    User-friendly interface and easy-to-use search function
                  </li>
                  <li>
                    User-friendly interface and easy-to-use search function
                  </li>
                </ul>
              </div> */}
            </Grid>
            <Grid className="rightNavigation" xs={12} sm={6} md={6}>
              <div className="navDiv">
                <ImgFourthWrapper src={chuzhal} alt="Chuzhal on Natya" />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Fourthwrapper>
      <Footer className="landing-page" />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  font-family: Urbanist !important;
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
const ButtonWrapper = styled(Button)`
  &.btn-one {
    color: #ffffff;
    text-transform: capitalize;
    background-color: #e0be00;
    font-family: urbanist !important;
    border-radius: 9px !important;
    @media (min-width: 1366px) and (max-width: 4000px) {
      width: 240px;
      height: 42px;
      font-size: 18px;
      font-weight: 850;
      margin-top: 20px;
      margin-bottom: 45px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      width: 200px;
      height: 38px;
      font-size: 15px;
      font-weight: 750;
      margin-top: 17px;
      margin-bottom: 40px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      width: 160px;
      height: 32px;
      font-size: 13px;
      font-weight: 650;
      margin-top: 15px;
      margin-bottom: 35px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      width: 130px;
      height: 28px;
      font-size: 10px;
      font-weight: 550;
      margin-top: 12px;
      margin-bottom: 30px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 10px;
      font-weight: 400;
      margin-top: 5px;
      margin-bottom: 30px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px;
      font-weight: 300;
      margin-top: 3px;
      margin-bottom: 20px;
      display: inline-block;
    }
    &:hover {
      background-color: #e0be00;
    }
  }
`;

const LandingWordmark = styled(NatyaWordmark)`
  height: 180px;
  margin: 0 auto 12px;
`;
const FirstWrapper = styled.div`
  padding: 40px;
  background-color: #000000;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: #ffffff;
  background: url(${backImg});
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -1;
`;
const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  @media (min-width: 320px) and (max-width: 575px) {
    width: 100%;
  }
  @media (min-width: 576px) and (max-width: 767px) {
  }
  @media (min-width: 768px) and (max-width: 991px) {
  }
  @media (min-width: 992px) and (max-width: 1199px) {
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
  }
  @media (min-width: 1366px) and (max-width: 4000px) {
  }
`;
const SubWrapper = styled.div`
  width: 100%;
`;
const StyledImageIcon = styled.img`
  width: 100%;
  max-width: 20px;
  margin: 0px 5px 0px 0px;
  filter: invert(1);
`;

const HeadingWrapper = styled.h1`
  color: #ffffff;
  @media (min-width: 1366px) and (max-width: 4000px) {
    margin-top: 35px;
    font-weight: 700;
    font-size: 23px;
    margin-bottom: 5px;
    margin-top: 31px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-weight: 700;
    font-size: 21px;
    margin-bottom: 0px;
    margin-top: 28px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-weight: 700;
    font-size: 19px;
    margin-bottom: 0px;
    margin-top: 25px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 0px;
    margin-top: 23px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 0px;
    margin-top: 21px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-weight: 500;
    font-size: 13px;
    margin-bottom: 0px;
    margin-top: 19px;
  }
`;

const FirstParaWrapper = styled.div`
  color: #ffffff;
  font-weight: 100;
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 20px;
    margin-top: 8px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 18px;
    margin-top: 6px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 13px;
    margin-top: 1px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 11px;
    margin-top: 0px;
    margin-bottom: 16px !important;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 10px;
    margin-top: 0px;
    margin-bottom: 12px !important;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 9px;
    margin-top: 0px;
    margin-bottom: 10px !important;
  }
`;

const SpanWrapper = styled.span`
  color: #ffffff;
  text-decoration: none;
  font-weight: 100;
  @media (min-width: 1400px) and (max-width: 1599px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 16px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 12px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 11px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 9px;
  }
`;

const ImgWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .googleButton {
    width: 230px;
    /* height: 50px; */
    /* margin-right: 45px;
    margin-right: 45px; */
  }
  .appButton {
    width: 230px;
    /* height: 50px; */
  }

  @media (min-width: 320px) and (max-width: 575px) {
    margin-top: 0px;
    flex-direction: column;
    .store-image-block {
      margin: 10px 0px;
    }
    .googleButton {
      width: 150px;
      margin: 0px;
    }
    .appButton {
      width: 150px;
    }
  }
  @media (min-width: 576px) and (max-width: 767px) {
    margin-top: 5px;
    .googleButton {
      width: 150px;
    }
    .appButton {
      width: 150px;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    margin-top: 15px;
    .googleButton {
      width: 150px;
    }
    .appButton {
      width: 150px;
    }
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    margin-top: 20px;
    .googleButton {
      width: 150px;
    }

    .appButton {
      width: 150px;
    }
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    margin-top: 25px;
    .googleButton {
      width: 150px;
    }
    .appButton {
      width: 150px;
    }
  }

  /* @media (min-width: 1366px) and (max-width: 4000px) {
    margin-top: 30px;
    .googleButton {
      width: 150px;
      height: 50px;
      margin-right: 45px;
    }
    .appButton {
      width: 150px;
      height: 50px;
    }
  } */
`;

const SecondWrapper = styled.div`
  padding: 40px;
  background-color: #000000;
  width: 100%;
  height: 100%;
  .leftGrid {
    display: flex;
    align-items: center;
    text-align: left;
    height: 100%;
    justify-content: center;
    padding: 50px 20px 50px 20px;
    @media (min-width: 576px) and (max-width: 767px) {
      text-align: center !important;
      align-items: center !important;
    }

    @media (min-width: 320px) and (max-width: 575px) {
      text-align: center !important;
      align-items: center !important;
    }
  }
  .rightGrid {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    padding: 50px 20px 50px 20px;
    @media (min-width: 320px) and (max-width: 575px) {
      padding: 10px 20px 50px 20px;
    }
  }
`;
const SecondHeadingWrapper = styled.h1`
  color: #ffffff;
  text-align: left;
  span {
    color: #e0be00;
    font-weight: 100;
  }
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-weight: 900;
    font-size: 26px;
    margin-bottom: 5px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-weight: 800;
    font-size: 24px;
    margin-bottom: 3px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 2px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-weight: 700;
    font-size: 19px;
    margin-bottom: 0px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-weight: 700;
    font-size: 21px;
    margin-bottom: 0px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-weight: 700;
    font-size: 22px;
  } ;
`;

const SecondParaWrapper = styled.p`
  color: #ffffff;
  font-weight: 100;
  text-align: left;

  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 16px;
    margin-top: 9px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 12px;
    margin-top: 3px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 11px;
    margin-bottom: 0px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 11px;
    margin-bottom: 0px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 11px;
    margin-bottom: 0px;
  } ;
`;

const GifOneWrapper = styled.img`
  height: auto;
  width: 100%;
  border-radius: 5px;
`;
const ThirdWrapper = styled.div`
  padding: 40px;
  display: flex;
  background-color: #2a2727;
  width: 100%;
  height: 100%;
  color: #ffffff;
  align-items: center;
  justify-content: center;

  .leftDevice {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rightDevice {
    display: flex;
    align-items: center !important;
    text-align: right;
    justify-content: center;
    @media (min-width: 576px) and (max-width: 767px) {
      text-align: center !important;
      padding: 0 0;
      padding: 30px 0px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      padding: 30px 0px;
    }
  }
`;
const ThirdHeadingWrapper = styled.h1`
  color: #ffffff;
  text-align: right;
  span {
    color: #e0be00;
    font-weight: 100;
  }
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 28px;
    font-weight: 800;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 25px;
    font-weight: 700;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 21px;
    font-weight: 700;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 18px;
    font-weight: 700;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 20px;
    font-weight: 700;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 20px;
    font-weight: 600;
  } ;
`;
const ThirdParaWrapper = styled.p`
  font-weight: 100;
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 15px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 14px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 13px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 12px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 11px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 11px;
  } ;
`;
const ImgThirdWrapper = styled.img`
  width: 100%;
  height: auto;
`;

const Fourthwrapper = styled.div`
  background-color: #1e1e1e;
  color: #ffffff;
  width: 100%;
  height: 100%;
  padding: 50px;

  ul {
    padding-left: 0 !important;
  }

  ul li::marker {
    color: #e0be00 !important;
  }
  .leftNavigation {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    text-align: left;
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 11px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      padding: 50px 0px;
      font-size: 14px;
    }
  }
  .rightNavigation {
    padding: 120px;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    text-align: left;
    @media (min-width: 992px) and (max-width: 1199px) {
      padding: 80px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      padding: 40px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      padding: 0px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      padding: 0px 40px 80px 40px;
    }
  }

  @media (min-width: 1366px) and (max-width: 4000px) {
    ul li {
      font-size: 15px;
      font-weight: 100;
      padding-bottom: 40px;
    }
  }

  @media (min-width: 1200px) and (max-width: 1365px) {
    ul li {
      font-size: 12px;
      font-weight: 100;
      margin-bottom: 18px;
    }
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    ul li {
      font-size: 11px;
      font-weight: 100;
      margin-bottom: 16px;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    ul li {
      font-size: 10px;
      font-weight: 100;
      margin-bottom: 13px;
    }
  }
  @media (min-width: 576px) and (max-width: 767px) {
    ul li {
      font-size: 11px;
      font-weight: 100;
      margin-bottom: 10px;
    }
  }
  @media (min-width: 320px) and (max-width: 575px) {
    ul li {
      font-size: 10px;
      font-weight: 100;
      margin-bottom: 25px;
    }
  } ;
`;

const FourthHeadingWrapper = styled.h1`
  text-align: left;
  color: #ffffff;
  margin-bottom: 0px;
  span {
    color: #e0be00;
    font-weight: 100;
  }
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 28px;
    font-weight: 700;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 26px;
    font-weight: 700;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 24px;
    font-weight: 600;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 22px;
    font-weight: 600;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 19px;
    font-weight: 600;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const FourthParaWrapper = styled.p`
  font-weight: 100;
  margin-top: 0px !important;
  padding-bottom: 30px;
  text-align: left;
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 17px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 16px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 15px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 14px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 13px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 12px;
  }
`;
const ImgFourthWrapper = styled.img`
  width: 100%;
  max-width: 420px;
  height: auto;
  object-fit: cover;
  border-radius: 15px;
  @media (min-width: 576px) and (max-width: 767px) {
    width: 300px;
    height: 350px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    width: 250px;
    height: 300px;
  }
`;
const FooterWrapper = styled.div`
  padding: 40px;
  background-color: #2a2727 !important;
  color: #ffffff !important;
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 300px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-flow: column;
  .footer-logo-block {
    text-align: start;
  }
  .terms-block {
    text-align: right;
    ul {
      max-width: 150px;
      margin: 0 0 0 auto;
      text-align: left;
      li {
        padding: 5px 0;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        width: 100%;
        display: inline-flex;
        gap: 0px;
        margin: 0;
        flex-wrap: wrap;
        width: 100%;
        text-align: start;
        justify-content: flex-start;
        max-width: 100%;
        padding: 25px 0;
      }
    }
  }
  .footerContainer {
    align-items: center;
    width: 80%;
    margin: 0 auto;
  }
  .MuiBox-root {
    width: 100%;
    display: flex;
    align-items: center;
  }
  ul {
    /* display: flex; */
    list-style-type: none;
    gap: 50px;
    padding: 0px;
    margin: 20px 0px 0px;
    text-align: left;
    li {
      padding: 5px 0px;
      a {
        color: #ffffff !important;
        text-decoration: none !important;
        margin: 0px 0px 0px 10px;
      }
    }
    p {
      margin: 0px;
    }
  }

  .footer {
    white-space: nowrap;
  }
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 15px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 14px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 13px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 12px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 11px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 11px;
    ul {
      gap: 30px;
    }
  }
`;

const ImgFifthWrapper = styled.img`
  width: 170px;
  object-fit: contain;
`;
