import styled from 'styled-components';

export const SectionWrapper = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  padding: 45px 0px 40px 50px;
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 40x 0px 40px 50px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 35px 0px 30px 50px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    padding: 33px 0px 30px 40px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 30px 0px 30px 15px;
  }
`;
export const HomeSectionWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
`;

export const HomeInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 2px;
    margin-left: 3px;
  }
  ::-webkit-scrollbar-track {
    background: transparent !important;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    width: 2px;
    height: 2px;
    background: #201e1e !important;
    border-radius: 10px;
  }
`;
export const HomeHeadLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 50px 30px 10px;
  @media (min-width: 1366px) and (max-width: 4000px) {}
  @media (min-width: 1200px) and (max-width: 1365px) {}
  @media (min-width: 992px) and (max-width: 1199px) {}
  @media (min-width: 768px) and (max-width: 991px) {}
  @media (min-width: 576px) and (max-width: 767px) {}
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 15px 15px 30px 0;
  }  
`;
export const RecommendedCardWrapper = styled.div`
  display: block;
  min-width: 80%;
`;
export const SearchPageWrapper = styled.div`
  display: block;
  width: 100%;
  background: #2a2727;
`;
export const SearchPageContentWrapper = styled.div`
  display: block;
  margin-top: 64px;
  @media (min-width: 1366px) and (max-width: 4000px) {}
  @media (min-width: 1200px) and (max-width: 1365px) {}
  @media (min-width: 992px) and (max-width: 1199px) {}
  @media (min-width: 768px) and (max-width: 991px) {}
  @media (min-width: 576px) and (max-width: 767px) {}
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 14px !important;
  }  
`;
export {};
