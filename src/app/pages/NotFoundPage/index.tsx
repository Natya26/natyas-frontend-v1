import * as React from 'react';
import styled from 'styled-components/macro';
import { P } from './P';
// import { Link } from 'app/components/Link';
// import { NavBar } from 'app/components/NavBar';
import Bg from './assets/img/bg/404.png';
import { Helmet } from 'react-helmet-async';
// import { StyleConstants } from 'styles/StyleConstants';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper></Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-color: #000000;
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  width: 100%;
`;