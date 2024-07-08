import React from 'react';
import styled from 'styled-components';
import logo from './assets/img/logo/Fusion-logo.png';
import { Box, Grid } from '@mui/material';
import emailIcon from './assets/img/icons/email.png';
import phoneIcon from './assets/img/icons/phone.png';
import WhatsappIcon from './assets/img/icons/whatsapp.png';
import location from './assets/img/icons/location.png';
import ApkDownloadIcon from './assets/img/icons/android-download-button.png';
import { SERVER_BASE_URL } from 'utils/constants';

type Props = {
  className?: string;
};

export const Footer = ({ className }: Props) => {
  const handleTerms = () => {
    window.open(
      'https://apidev.navarasaworld.com/v1/policies/terms-and-conditions',
      '_blank',
    );
  };
  const handlePrivacy = () => {
    window.open(
      'https://apidev.navarasaworld.com/v1/policies/privacy-policy',
      '_blank',
    );
  };
  const handleRefundPolicy = () => {
    window.open(
      'https://apidev.navarasaworld.com/v1/policies/refund-policy',
      '_blank',
    );
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
    <FooterWrapper
      className={`navarasa-footer ${className}`}
      id="FooterWrapper"
    >
      <Box>
        <Grid className="footerContainer" container spacing={0}>
          <Grid className="footer" item xs={12} sm={6} md={4}>
            <div className="footer-logo-block">
              <LogoImage src={logo} alt="Fusion-logo" />
            </div>
            <div>
              <ul className="contact-ul">
                <li>
                  <StyledImageIcon src={location} alt="phone" />
                  <a>
                    FUSION &nbsp; 51/3079 PRA 9 , <br /> NIKUNJAM,
                    PUNNAKKAMUGHAL , <br /> ARAMADA TRIVANDRUM Kerala 695032,
                    INDIA
                  </a>
                </li>
                <li>
                  <StyledImageIcon src={emailIcon} alt="email" />
                  <a href="mailto:info@fusionflix.in">
                    info@fusionflix.in
                  </a>
                </li>
                {/* <li>
                  <StyledImageIcon src={phoneIcon} alt="phone" />
                  <a href="tel:884-824-9902">+91 8848249902</a>
                </li> */}

                {/* <li>
                  <StyledImageIcon src={WhatsappIcon} alt="watsapp" />
                  <a
                    href="https://wa.me/918590691762"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Whatsapp
                  </a>
                </li> */}
              </ul>
            </div>
          </Grid>
          <Grid className="terms-footer-grid" item xs={12} sm={6} md={8}>
            <div className="terms-block">
              <ul className="terms-conditions-ul">
                <li>
                  <a
                    href="/FooterStaticPages/terms-and-conditions.html"
                    target="_blank"
                    // onClick={handleTerms}
                    rel="noreferrer"
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a
                    href="/FooterStaticPages/privacy-policy.html"
                    target="_blank"
                    // onClick={handlePrivacy}
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/FooterStaticPages/terms-and-conditions.html"
                    target="_blank"
                    // onClick={handleTerms}
                    rel="noreferrer"
                  >
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/FooterStaticPages/refund-policy.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
              <div
                className="download-buttons-block"
                style={{ display: 'none' }}
              >
                <ImgWrapper>
                  <div
                    style={{
                      textDecoration: 'none',
                    }}
                    className="store-image-block"
                  >
                    <img
                      className="appButton"
                      src={ApkDownloadIcon}
                      alt="download apk"
                      onClick={handleDownloadAndroidApkClick}
                    />
                  </div>
                </ImgWrapper>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <div className="copyright">
        {' '}
        <p>Copyright &copy; 2024, All Right Reserved Fusion </p>
      </div>
    </FooterWrapper>
  );
};
const LogoImage = styled.img`
  width: 170px;
  object-fit: contain;
`;
const StyledImageIcon = styled.img`
  width: 100%;
  max-width: 20px;
  margin: 0px 5px 0px 0px;
  filter: invert(1);
  &:first-child {
    opacity: 0.6;
    margin-top: 3px;
  }
`;

const FooterWrapper = styled.div`
  .copyright {
    margin-bottom: 10px;
    p {
      color: #a5a5a5;
    }
    a {
      text-decoration: none;
      color: #a5a5a5;
    }
  }
  padding: 40px 40px 0 40px;
  background-color: #212121;
  color: #ffffff !important;
  width: 100%;
  height: 100%;
  min-height: 300px;
  /* max-height: 300px; */
  display: flex;
  align-items: center;
  text-align: center;
  flex-flow: column;
  &.landing-page {
    background-color: #2a2727 !important;
  }
  .footer-logo-block {
    text-align: start;
  }
  .terms-footer-grid {
    .terms-block {
      text-align: right;
      ul {
        max-width: 160px;
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
  }

  .download-buttons-block {
    max-width: 150px;
    margin: 0 0 0 auto;
  }

  .footerContainer {
    align-items: center;
    width: 80%;
    margin: 0 auto;
  }
  .MuiBox-root {
    width: 100%;
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
      display: flex;
      align-items: flex-start;
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
    .download-buttons-block {
      margin: 0 auto;
    }
  }
`;

const ImgWrapperThree = styled.img`
  width: 200px;
  height: 90px;
`;

const ImgWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .appButton {
    width: 100%;
  }

  @media (min-width: 320px) and (max-width: 575px) {
    margin-top: 0px;
    flex-direction: column;
    .store-image-block {
      margin: 10px 0px;
    }
    .appButton {
      width: 100%;
    }
  }
  @media (min-width: 576px) and (max-width: 767px) {
    margin-top: 5px;
    .appButton {
      width: 100%;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    margin-top: 15px;
    .appButton {
      width: 100%;
    }
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    margin-top: 20px;
    .appButton {
      width: 100%;
    }
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    margin-top: 25px;
    .appButton {
      width: 100%;
    }
  }

  /* @media (min-width: 1366px) and (max-width: 4000px) {
    margin-top: 30px;
    .appButton {
      width: 100px;
      height: 40px;
    }
  } */
`;
