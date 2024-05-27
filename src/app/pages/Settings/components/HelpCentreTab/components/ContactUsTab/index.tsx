import React from 'react';
import styled from 'styled-components';
import LinkButton from 'app/components/LinkButton';
import { TabCardView } from 'app/components/TabCardView';
import customerService from './assets/img/icons/customerService.svg';
import whatsApp from './assets/img/icons/whatsApp.svg';
import facebook from './assets/img/icons/facebook.svg';
import instagram from './assets/img/icons/instagram.svg';
import email from './assets/img/icons/email.svg';

type ContactUsTabProps = {};

export default function ContactUsTab({}: ContactUsTabProps) {
  return (
    <Wrapper>
      <TabCardView>
        <LinkButton text="Customer service" icon={customerService} link="tel:866.790.7774"/>
        <LinkButton
          text="WhatsApp"
          link="https://www.whatsapp.com/"
          icon={whatsApp}
        />
        <LinkButton
          text="Facebook"
          link="https://www.facebook.com/"
          icon={facebook}
        />
        <LinkButton
          text="Instagram"
          link="https://www.instagram.com/"
          icon={instagram}
        />
        <LinkButton text="Email" link="https://mail.google.com/" icon={email} />
      </TabCardView>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  div {
    background-color: transparent;
    min-height: unset !important;
  }
`;
