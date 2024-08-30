import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageCard from 'app/components/ImageCard';
import vector from './assets/img/icons/Vector.png';
import EditButton from 'app/components/EditButton';
import { SaveButton } from 'app/components/SaveButton';
import { CancelButton } from 'app/components/CancelButton';
import { CloseButton } from 'app/components/CloseButton';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { RoutePath } from 'app/RoutePath';
import useApi from 'services/mavapi/useApi';
import { HomeApiService } from 'services/openapi/services/HomeApiService';
import { useDispatch, useSelector } from 'react-redux';
import { useManageMyListSlice } from './slice';
import { selectMyList } from './slice/selectors';
import { SERVER_BASE_URL } from 'utils/constants';
import { selectPageLoader } from '../slice/selectors';
import { useManageAppSlice } from '../slice';
import PageLoaderWrapper from 'app/components/PageLoaderWrapper';
import PulseLoader from 'react-spinners/PulseLoader';
import { Footer } from 'app/components/Footer';

type Props = {};

export const MyListPage = (props: Props) => {
  const { error: apiError, isLoading, handleRequest } = useApi();
  const [error, setError] = React.useState<unknown | null>();
  const { getMyList, addOrRemoveMyList } = HomeApiService;
  const dispatch = useDispatch();
  const { actions } = useManageMyListSlice();
  const pageLoader = useSelector(selectPageLoader);
  const { actions: AppActions } = useManageAppSlice();

  //Selectors
  const myList = useSelector(selectMyList);

  const [fetch, setFetch] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEdit = (): void => {
    setEdit(true);
    setClose(true);
    setView(true);
  };
  const handleCancel = (): void => {
    setEdit(false);
    setClose(false);
    setView(false);
  };
  const handleBack = (): void => {
    navigate(RoutePath.homepage.path);
  };
  const handleSave = (): void => {
    setClose(false);
    setClose(false);
    setEdit(false);
    setView(false);
  };
  const handleGetMyList = () => {
    handleRequest(getMyList())
      .then(res => {
        if (res.data) {
          dispatch(actions.setMyList(res?.data));
          dispatch(AppActions.setPageLoader(false));
        }
      })
      .catch(error => {});
  };
  const handleRemoveMyList = (e: number) => {
    handleRequest(addOrRemoveMyList({ series_id: e }, 'REMOVE'))
      .then(res => {
        if (res.data) {
        }
      })
      .catch(error => {
        setError(apiError);
      });
    setTimeout(() => {
      setFetch(!fetch);
    }, 150);
  };

  const handleSeriesViewClick = (e: number) => {
    if (e) {
      navigate(
        RoutePath.individualview.path.replace(':seriesId', e.toString()),
      );
    }
  };

  useEffect(() => {
    dispatch(AppActions.setPageLoader(true));
    handleGetMyList();
    const element: HTMLElement | null = document.getElementById('mainWrapper');
    element!.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [fetch]);
  return (
    <>
      {pageLoader ? (
        <>
          <PageLoaderWrapper>
            <PulseLoader color="#e0be00" />
          </PageLoaderWrapper>
        </>
      ) : (
        <>
          <MainWrapper id="mainWrapper">
            <SubWrapper>
              <TopWrapper>
                <TopLeftwrapper
                  onClick={handleBack}
                  style={{ cursor: 'pointer' }}
                >
                  <ButtonOneWrapper
                    variant="text"
                    style={
                      view
                        ? {
                            cursor: 'pointer',
                            pointerEvents: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                            userSelect: 'none',
                          }
                        : {}
                    }
                  >
                    <ImgWrapperOne src={vector} alt="vector" />
                  </ButtonOneWrapper>
                  <span>My List</span>
                </TopLeftwrapper>
                <div className="topSec">
                  {edit ? (
                    <BtnWrapper>
                      <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                      <SaveButton onClick={handleSave}>Save</SaveButton>
                    </BtnWrapper>
                  ) : (
                    <StyledEditButton onClick={handleEdit} />
                  )}
                </div>
              </TopWrapper>
              <BodyWrapper>
                <ArrayWrapper>
                  {myList?.map((item, index) => {
                    return (
                      <CardWrapper key={index}>
                        <StyledImageCard
                          className="myhomecard"
                          poster={
                            item?.poster ? SERVER_BASE_URL + item?.poster : ''
                          }
                          onClick={e => handleSeriesViewClick(item.id!)}
                          disabled={view}
                        />
                        {close ? (
                          <StyledCloseButton
                            className="imgOne"
                            onClick={e => handleRemoveMyList(item.id!)}
                          />
                        ) : (
                          ''
                        )}
                      </CardWrapper>
                    );
                  })}
                </ArrayWrapper>
              </BodyWrapper>
              {/* <Footer /> */}
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
  padding: 0px 40px 0px 40px;
  @media (min-width: 1366px) and (max-width: 4000px) {
    padding: 0px 62px;
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
    padding: 0px 30px;
  }
`;
const SubWrapper = styled.div`
  margin-top: 120px;
`;
const TopLeftwrapper = styled.div`
  display: flex;
  align-items: center;
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
  justify-content: space-between;
  align-items: center;
  padding: 0px !important;
  margin-bottom: 10px;
  .topSec {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .edit {
    background-color: #e0be00;
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

const StyledCloseButton = styled(CloseButton)`
  .css-1e6y48t-MuiButtonBase-root-MuiButton-root {
    min-width: 100% !important;
  }
  position: absolute !important;
  right: -20px;
  top: -18px;
  @media (min-width: 992px) and (max-width: 1199px) {
    right: -14px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    right: -14px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    right: -14px;
    top: -15px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    right: -15px;
  }
  button {
    padding: 0 !important;
    img {
      width: 40px;
      height: auto;
      @media (min-width: 992px) and (max-width: 1199px) {
        width: 32px;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        width: 27px;
      }
      @media (min-width: 576px) and (max-width: 767px) {
        width: 25px;
      }
      @media (min-width: 320px) and (max-width: 575px) {
        width: 30px;
      }
    }
  }
`;

const StyledEditButton = styled(EditButton)`
  background-color: #2a2727 !important;
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
const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
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
