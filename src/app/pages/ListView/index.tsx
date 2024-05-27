import styled from 'styled-components';
import ImageCard from 'app/components/ImageCard';
import vector from './assets/img/icons/Vector.png';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { RoutePath } from 'app/RoutePath';
import { useDispatch, useSelector } from 'react-redux';
import { selectListHeaderName, selectListViewList } from './slice/selectors';
import { useManageListViewSlice } from './slice';
import useApi from 'services/mavapi/useApi';
import { useEffect } from 'react';
import { HomeApiService } from 'services/openapi/services/HomeApiService';
import { SERVER_BASE_URL } from 'utils/constants';
import { selectPageLoader } from '../slice/selectors';
import { useManageAppSlice } from '../slice';
import PageLoaderWrapper from 'app/components/PageLoaderWrapper';
import PulseLoader from 'react-spinners/PulseLoader';
import { Footer } from 'app/components/Footer';

type Props = {};

export const ListView = (props: Props) => {
  const { listName: allListName } = useParams();
  const navigate = useNavigate();
  const { error: apiError, isLoading, handleRequest } = useApi();
  const { getHomePageList, getNewAndHotList } = HomeApiService;
  const dispatch = useDispatch();
  const { actions } = useManageListViewSlice();
  const allSeriesList = useSelector(selectListViewList);
  const listHeaderName = useSelector(selectListHeaderName);
  //Loader
  const pageLoader = useSelector(selectPageLoader);
  const { actions: AppActions } = useManageAppSlice();

  const ListPath = {
    newandhot: 'newandhot',
    allseries: 'allseries',
    recommended: 'recommended',
    malayalam: 'malayalam',
    hindi: 'hindi',
    tamil: 'tamil',
  };
  const handleBack = (): void => {
    navigate(RoutePath.homepage.path);
  };
  const getAllListViewList = (lang?: string) => {
    if (allListName === ListPath.newandhot) {
      handleRequest(getNewAndHotList()).then(res => {
        if (res.data) {
          dispatch(actions.setListViewList(res?.data?.series));
          dispatch(actions.setListHeaderName('New and Hot'));
          dispatch(AppActions.setPageLoader(false));
        }
      });
    } else {
      handleRequest(getHomePageList(lang)).then(res => {
        if (res.data) {
          if (allListName === ListPath.allseries) {
            dispatch(actions.setListViewList(res?.data?.allSeries));
            dispatch(actions.setListHeaderName('All Series'));
            dispatch(AppActions.setPageLoader(false));
          } else if (allListName === ListPath.recommended) {
            dispatch(actions.setListViewList(res?.data?.recommended));
            dispatch(actions.setListHeaderName('Recommended For You'));
            dispatch(AppActions.setPageLoader(false));
          } else if (allListName === ListPath.malayalam) {
            dispatch(actions.setListViewList(res?.data?.malayalam));
            dispatch(actions.setListHeaderName('Malayalam'));
            dispatch(AppActions.setPageLoader(false));
          } else if (allListName === ListPath.hindi) {
            dispatch(actions.setListViewList(res?.data?.hindi));
            dispatch(actions.setListHeaderName('Hindi'));
            dispatch(AppActions.setPageLoader(false));
          } else if (allListName === ListPath.tamil) {
            dispatch(actions.setListViewList(res?.data?.tamil));
            dispatch(actions.setListHeaderName('Tamil'));
            dispatch(AppActions.setPageLoader(false));
          }
        }
      });
    }
  };
  const handleSeriesViewClick = (e: number) => {
    if (e) {
      navigate(
        RoutePath.individualview.path.replace(':seriesId', e.toString()),
      );
    }
  };
  const scrollToTop = () => {
    var element = document.getElementById('mainWrapper');
    element!.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    dispatch(AppActions.setPageLoader(true));
    getAllListViewList();
    scrollToTop();
  }, []);

  return (
    <>
      {pageLoader ? (
        <>
          <PageLoaderWrapper>
            <PulseLoader color="#f4793b" />
          </PageLoaderWrapper>
        </>
      ) : (
        <>
          <MainWrapper id="mainWrapper">
            <SubWrapper>
              <TopWrapper onClick={handleBack} style={{ cursor: 'pointer' }}>
                <ButtonOneWrapper variant="text">
                  <ImgWrapperOne src={vector} alt="vector" />
                </ButtonOneWrapper>
                <span>{listHeaderName}</span>
              </TopWrapper>
              <BodyWrapper>
                <ArrayWrapper>
                  {allSeriesList?.map((item, index) => {
                    return (
                      <CardWrapper key={index}>
                        <StyledImageCard
                          onClick={e => handleSeriesViewClick(item?.id!)}
                          className="myhomecard"
                          poster={
                            item?.poster ? SERVER_BASE_URL + item?.poster : ''
                          }
                        />
                      </CardWrapper>
                    );
                  })}
                </ArrayWrapper>
              </BodyWrapper>
            </SubWrapper>
          </MainWrapper>
          <Footer />
        </>
      )}
    </>
  );
};

const MainWrapper = styled.div`
  font-family: Urbanist !important;
  background-color: #2a2727 !important;
  color: #ffffff;
  width: 100%;
  min-height: 100vh;
  padding: 10px 40px 40px 40px;
  @media (min-width: 1366px) and (max-width: 4000px) {
    /* padding: 0px 62px; */
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    padding: 0px 57px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 0px 50px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 0px 50px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    padding: 0px 40px 0px 40px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    padding: 0px 25px;
  }
`;
const SubWrapper = styled.div`
  margin-top: 120px;
`;
const ArrayWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 37px;
  @media (min-width: 2560px) and (max-width: 4000px) {
    gap: 50px 0px;
    display: grid;
    grid-template-columns: 16.6% 16.6% 16.6% 16.6% 16.6% 16.6%;
  }
  @media (min-width: 1920px) and (max-width: 2559px) {
    gap: 20px 30px;
    display: grid;
    grid-template-columns: 18% 18% 18% 18% 18%;
  }
  @media (min-width: 1366px) and (max-width: 1919px) {
    gap: 20px 30px;
    display: grid;
    grid-template-columns: 18% 18% 18% 18% 18%;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    gap: 20px 15px;
    display: grid;
    grid-template-columns: 23% 23% 23% 23%;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    gap: 20px 15px;
    display: grid;
    grid-template-columns: 32% 32% 32%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    gap: 20px 15px;
    display: grid;
    grid-template-columns: 32% 32% 32%;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    gap: 20px 6px;
    display: grid;
    grid-template-columns: 32% 32% 32%;
  }
  @media (min-width: 425px) and (max-width: 575px) {
    gap: 20px 6px;
    display: grid;
    grid-template-columns: 32% 32% 32%;
  }
  @media (min-width: 375px) and (max-width: 424px) {
    gap: 20px 0px;
    display: grid;
    grid-template-columns: 50% 50%;
  }
  @media (min-width: 320px) and (max-width: 374px) {
    gap: 20px 0px;
    display: grid;
    grid-template-columns: 50% 50%;
  }
`;
const CardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
  }
`;
const ButtonOneWrapper = styled(Button)`
  &.css-1e6y48t-MuiButtonBase-root-MuiButton-root {
    color: #ffffff !important;
    font-size: 10px;
    font-weight: 400;
    font-size: 12px;
    min-width: unset;
    @media (min-width: 1366px) and (max-width: 4000px) {
      font-size: 13px !important;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 11px !important;
    }
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0px !important;
  margin-bottom: 10px;
  .topSec {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .edit {
    background-color: F4793B;
  }
  button {
    padding: 0px !important;
  }
  span {
    font-size: 18px;
    text-transform: uppercase;
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 13px;
    }
  }
`;
const StyledImageCard = styled(ImageCard)`
  &.myhomecard {
    margin: 0px 0px;
    height: auto !important;
    padding: 0px;
    /* width: 175px; */
    @media (min-width: 320px) and (max-width: 575px) {
      width: 125px;
    }

    // Small devices (landscape phones to  tablets)
    @media (min-width: 576px) and (max-width: 767px) {
      width: 125px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      width: 200px;
    }

    // Medium devices (tablets to desktops)
    @media (min-width: 991.98px) and (max-width: 1198px) {
      width: 265px;
    }

    // Large devices (desktops to  large desktops)
    @media (min-width: 1199.98px) and (max-width: 1365px) {
      width: 265px;
    }

    // X-Large devices (large desktops, less than 1400px)
    @media (min-width: 1366px) and (max-width: 1439px) {
      width: 265px;
    }

    @media (min-width: 1440px) and (max-width: 1600px) {
      width: 265px;
    }
    .MuiPaper-root img.MuiCardMedia-root {
      height: 364px;
      @media (min-width: 1366px) and (max-width: 4000px) {
        height: 364px;
      }
      @media (min-width: 1200px) and (max-width: 1365px) {
        height: 364px;
      }
      @media (min-width: 992px) and (max-width: 1199px) {
        height: 364px;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        height: 275px;
      }
      @media (min-width: 576px) and (max-width: 767px) {
        height: 185px;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        height: 185px;
      }
    }
  }
`;
const ImgWrapperOne = styled.img`
  width: 7px;
  height: auto;
  padding: 0px !important;
  margin: 0px 20px 0px 0px !important;
  @media (min-width: 320px) and (max-width: 575px) {
    width: 5px;
  }
`;

const BodyWrapper = styled.div`
  background-color: #2a2727;
  overflow: auto;
  /* height: 800px;
  padding: 0px 25px; */
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

  .myList {
    display: flex;
    justify-content: center;
  }
  .myhomecard {
    .MuiPaper-root {
      img.MuiCardMedia-root {
        /* width: 100%; */
      }
    }
  }
`;
