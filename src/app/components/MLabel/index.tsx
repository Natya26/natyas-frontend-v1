import styled from 'styled-components/macro';
export function MHLabel() {
  return <div>Job Details</div>;
}

export const FloatLabel = styled.label`
  font-family: 'Urbanist';
  font-style: normal;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  line-height: 14px;
  z-index: 1;
`;

export const HeadingTitle = styled.label`
  font-family: 'Urbanist';
  font-style: normal;
  font-size: 50px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 75px;
  position: relative;
  z-index: 1;
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 45px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 40px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 35px;
  }
`;

export const TextFieldContentLabel = styled.label`
  font-family: 'Urbanist';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  line-height: 30px;
  position: relative;
  z-index: 1;
  word-wrap: break-word;
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 18px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 17px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 15px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 12px;
  }
`;
export const ListHeadingLabel = styled.label`
  font-family: 'Urbanist';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  z-index: 1;
`;
export const StyledLabel = styled.label`
  font-family: 'Urbanist';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 11px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 10px;
  }
`;
export const ViewAllLabel = styled(StyledLabel)`
  color: #e0be00 !important;
  font-size: 20px !important;
  text-transform: initial !important;
  letter-spacing: 1px !important;
  cursor: pointer;
`;
export const PaySuccessPrimarylabel = styled.label`
  font-family: 'Urbanist';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #e0be00 !important;
  font-size: 22px !important;
  text-transform: initial !important;
  letter-spacing: 1px !important;
  text-transform: capitalize !important;
  margin: 8px 0 8px 0;
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 16px !important;
  }
`;
export const PaySuccessSecondarylabel = styled.label`
  font-family: 'Urbanist';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff !important;
  font-size: 16px !important;
  text-transform: initial !important;
  letter-spacing: 1px !important;
  text-transform: capitalize !important;
  margin: 8px 0 0 0;
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 16px !important;
    letter-spacing: 0px !important;
  }
`;
export const ListHeadLabel = styled(StyledLabel)`
  font-family: 'Urbanist';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 16px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 14px;
  }
`;
export const SeasonAndDurationLabel = styled.label`
  font-family: 'Urbanist';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 18px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 17px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 15px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 12px;
  }
`;
