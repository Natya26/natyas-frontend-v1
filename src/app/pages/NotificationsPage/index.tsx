import React, { useEffect } from 'react';
import styled from 'styled-components';
import vector from './assets/img/icons/Vector.png';
import logo from './assets/img/logo/Fusion-logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { RoutePath } from 'app/RoutePath';
import { NotificationsCard } from 'app/components/NotificationsCard';
import useApi from 'services/mavapi/useApi';
import { NotificationApiService } from 'services/openapi/services/NotificationApisServices';
import { useDispatch, useSelector } from 'react-redux';
import { useManageNotificationSlice } from './slice';
import { selectNotificationList } from './slice/selectors';
import Cookies from 'js-cookie';
import { SERVER_BASE_URL } from 'utils/constants';
import { selectPageLoader } from '../slice/selectors';
import { useManageAppSlice } from '../slice';
import PageLoaderWrapper from 'app/components/PageLoaderWrapper';
import PulseLoader from 'react-spinners/PulseLoader';

type Props = {
  name?: string;
  summary?: string;
  id?: number;
};

export const NotificationsPage = ({ name, summary, id }: Props) => {
  const navigate = useNavigate();
  const { error: apiError, isLoading, handleRequest } = useApi();
  const { getNotificationList } = NotificationApiService;
  const dispatch = useDispatch();
  const { actions } = useManageNotificationSlice();
  const allNotificationList = useSelector(selectNotificationList);
  const pageLoader = useSelector(selectPageLoader);
  const { actions: AppActions } = useManageAppSlice();

  const handleBack = (): void => {
    navigate(RoutePath.homepage.path);
  };

  const getAllNotificationList = (
    page?: number,
    pageLength?: number,
    order?: string,
    userId?: string,
  ) => {
    handleRequest(getNotificationList(page, pageLength, order, userId)).then(
      res => {
        if (res.data) {
          dispatch(actions.setNotificationList(res?.data?.items));
          dispatch(AppActions.setPageLoader(false));
        } else return;
      },
    );
  };

  const handleNotificationViewClick = (id: number) => {
    if (id) {
      navigate(
        RoutePath.individualview.path.replace(':seriesId', id.toString()),
      );
    }
  };
  useEffect(() => {
    dispatch(AppActions.setPageLoader(true));
    let userId = Cookies.get('userId') ? atob(Cookies.get('userId')!) : '';

    getAllNotificationList(undefined, undefined, undefined, userId);
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
        <MainWrapper>
          <SubWrapper>
            <TopWrapper>
              <ButtonOneWrapper variant="text" onClick={handleBack}>
                <ImgWrapperOne src={vector} alt="vector" />
              </ButtonOneWrapper>
              <span>Notifications</span>
            </TopWrapper>
            <BodyWrapper>
              {allNotificationList?.map((item, index) => {
                return (
                  <NotificationsCard
                    key={item.id}
                    src={
                      item?.details?.poster
                        ? SERVER_BASE_URL + item?.details?.poster
                        : ''
                    }
                    name={item.details?.headings?.en}
                    summary={item.details?.contents?.en}
                    onClick={e =>
                      handleNotificationViewClick(item?.details?.series_id!)
                    }
                  />
                );
              })}
            </BodyWrapper>
          </SubWrapper>
          <FooterWrapper>
            <ImgWrapperThree src={logo} />
          </FooterWrapper>
        </MainWrapper>
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
  padding: 40px 50px;
  @media (min-width: 320px) and (max-width: 575px) {
  }
`;
const SubWrapper = styled.div`
  margin-top: 64px;
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
  padding: 0px 10px !important;
  margin-bottom: 30px;
  button {
    padding: 0px !important;
  }
  span {
    font-size: 18px;
    text-transform: uppercase;
  }
`;
const ImgWrapperOne = styled.img`
  width: 9px;
  height: auto;
  padding: 0px !important;
  margin: 0px 20px 0px 0px !important;
`;

const BodyWrapper = styled.div`
  background-color: #2a2727;
  padding: 20px 35px;
`;
const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 300px !important;
  max-height: 300px !important;
  align-items: center;
`;

const ImgWrapperThree = styled.img`
  width: 200px;
  height: 90px;
`;
