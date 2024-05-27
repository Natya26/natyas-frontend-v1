import styled from 'styled-components';

type Props = { background?: string; height?: any; width?: any };

export const TabCardView = styled.div<Props>`
  height: ${props => (props.height ? props.height : '100%')};
  width: ${props => (props.width ? props.width : '100%')};
  min-height: 500px;
  background-color: ${props =>
    props.background ? props.background : '#181616'};
  color: white;
  border-radius: 10px;
  position: relative;
  margin: 15px 0px;
  @media (min-width: 992px) and (max-width: 1199px) {
    margin: 0px 0px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    margin: 0px 0px;
  }
  // @media (min-width: 576px) and (max-width: 767px) {
  //   padding: 0px 10px;
  //   margin-bottom: 15px;
  // }
  // @media (min-width: 320px) and (max-width: 575px) {
  //   padding: 0px 10px;
  //   margin-bottom: 10px;
  // }
`;
