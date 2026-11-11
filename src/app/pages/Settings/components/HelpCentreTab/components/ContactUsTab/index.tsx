import React from 'react';
import styled from 'styled-components';
import LinkButton from 'app/components/LinkButton';
import { TabCardView } from 'app/components/TabCardView';
import email from './assets/img/icons/email.svg';

type ContactUsTabProps = {};

export default function ContactUsTab({}: ContactUsTabProps) {
  return (
    <Wrapper>
      <TabCardView>
        <Intro>
          <h3>We are here to help</h3>
          <p>
            Questions about your plan, a payment, or a video that will not
            play? Send us an email. We usually reply within one working day.
          </p>
        </Intro>
        <LinkButton
          text="Email us at info@natyas.com"
          link="mailto:info@natyas.com"
          icon={email}
        />
        <Block>
          <strong>Support hours</strong>
          <span>Monday to Saturday, 9:30 am to 6:30 pm IST</span>
        </Block>
        <Block>
          <strong>Our office</strong>
          <span>
            Natya, 32/211/21 Serene Krishna Nagar, Peroorkada,
            Thiruvananthapuram, Kerala 695005
          </span>
        </Block>
        <Block>
          <strong>To help us reply faster</strong>
          <span>
            Please include the email or phone number on your account, the title
            you were watching, and a screenshot if something went wrong.
          </span>
        </Block>
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

const Intro = styled.div`
  margin-bottom: 16px;
  h3 {
    margin: 0;
    color: #e0be00;
    font-size: 18px;
    font-weight: 600;
  }
  p {
    margin: 6px 0 0;
    color: #c8c8c8;
    font-size: 13px;
    line-height: 1.5;
  }
`;

const Block = styled.div`
  margin-top: 14px;
  font-size: 13px;
  line-height: 1.5;
  strong {
    display: block;
    color: #fff;
    font-weight: 600;
  }
  span {
    display: block;
    margin-top: 2px;
    color: #bdbdbd;
  }
`;
