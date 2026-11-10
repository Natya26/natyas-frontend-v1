/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import { Layout } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-tooltip/dist/react-tooltip.css';
import {
  HomePage,
  Login,
  SignUp,
  Settings,
  LandingPage,
  MyListPage,
  IndividialView,
  SearchPage,
  NotFoundPage,
  ListView,
  NotificationsPage,
  PlayVideo,
  PreviewPage,
  PaymentSuccessPage,
} from './pages';
import { HomePageLayout, OnboardLayout } from './layouts';
import { RoutePath } from './RoutePath';
import Cookies from 'js-cookie';
import { useManageAppSlice } from './pages/slice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute, { ProtectedRouteProps } from './pages/ProtectedRoute';
import {
  selectIsAuthenticated,
  selectRedirectPath,
} from './pages/slice/selectors';

export function App() {
  const { actions } = useManageAppSlice();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  //Selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const redirectPath = useSelector(selectRedirectPath);

  function isAuthenicated(): boolean {
    const accessToken = Cookies.get('accessToken');
    const idToken = Cookies.get('idToken');
    const refreshToken = Cookies.get('refreshToken');
    let isAuth = true;
    if (accessToken === undefined || accessToken === '') isAuth = false;
    if (idToken === undefined || idToken === '') isAuth = false;
    if (refreshToken === undefined || refreshToken === '') isAuth = false;
    if (!isAuth) {
      dispatch(actions.setIsAuthenticated(false));
      return false;
    }
    return true;
  }
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isAuthenicated(),
    authenticationPath: RoutePath.login.path,
    redirectPath: redirectPath!,
  };

  React.useEffect(() => {
    const blockRightClick = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener('contextmenu', blockRightClick);
    return () => document.removeEventListener('contextmenu', blockRightClick);
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OnboardLayout />}>
          <Route path={RoutePath.login.path} element={<Login />} />
          <Route path={RoutePath.signup.path} element={<SignUp />} />
        </Route>
        <Route element={<Layout />}>
          <Route
            path={RoutePath.paymentSuccess.path}
            element={
              <ProtectedRoute
                {...{
                  ...defaultProtectedRouteProps,
                  // redirectPath: RoutePath.paymentSuccess.path,
                  redirectPath: RoutePath.paymentSuccess.path.replace(
                    ':pId',
                    '',
                  ),
                }}
                outlet={<PaymentSuccessPage />}
              />
            }
          />
        </Route>
        <Route element={<HomePageLayout />}>
          <Route
            path={RoutePath.settings.path}
            element={
              <ProtectedRoute
                {...{
                  ...defaultProtectedRouteProps,
                  redirectPath: RoutePath.settings.path,
                }}
                outlet={<Settings />}
              />
            }
          />
          <Route path={RoutePath.homepage.path} element={<HomePage />} />
          <Route
            path={RoutePath.mylistpage.path}
            element={
              <ProtectedRoute
                {...{
                  ...defaultProtectedRouteProps,
                  redirectPath: RoutePath.mylistpage.path,
                }}
                outlet={<MyListPage />}
              />
            }
          />
          <Route
            path={RoutePath.individualview.path}
            element={
              <ProtectedRoute
                {...{
                  ...defaultProtectedRouteProps,
                  redirectPath: RoutePath.individualview.path.replace(
                    ':seriesId',
                    '',
                  ),
                }}
                outlet={<IndividialView />}
              />
            }
          />
          <Route
            path={RoutePath.notifications.path}
            element={
              <ProtectedRoute
                {...{
                  ...defaultProtectedRouteProps,
                  redirectPath: RoutePath.notifications.path,
                }}
                outlet={<NotificationsPage />}
              />
            }
          />
          <Route path={RoutePath.search.path} element={<SearchPage />} />
          <Route
            path={RoutePath.listview.path}
            element={
              <ProtectedRoute
                {...{
                  ...defaultProtectedRouteProps,
                  redirectPath: RoutePath.listview.path.replace(
                    ':listName',
                    '',
                  ),
                }}
                outlet={<ListView />}
              />
            }
          />
          <Route
            path={RoutePath.playvideo.path}
            element={
              <ProtectedRoute
                {...{
                  ...defaultProtectedRouteProps,
                  redirectPath: RoutePath.playvideo.path.replace(':videoId', ''),
                }}
                outlet={<PlayVideo />}
              />
            }
          />
          <Route
            path={RoutePath.preview.path}
            element={
              <ProtectedRoute
                {...{
                  ...defaultProtectedRouteProps,
                  redirectPath: RoutePath.preview.path.replace(':titleId', ''),
                }}
                outlet={<PreviewPage />}
              />
            }
          />
        </Route>
        <Route
          path={RoutePath.individualview.path}
          element={
            <ProtectedRoute
              {...{
                ...defaultProtectedRouteProps,
                redirectPath: RoutePath.individualview.path,
              }}
              outlet={<IndividialView />}
            />
          }
        />
        <Route path={RoutePath.landingpage.path} element={<LandingPage />} />
        <Route path={RoutePath.notfoundpage.path} element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
      <ToastContainer />
    </BrowserRouter>
  );
}
