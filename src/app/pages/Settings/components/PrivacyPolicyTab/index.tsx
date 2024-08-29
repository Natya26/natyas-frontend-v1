import { TabCardView } from 'app/components/TabCardView';
import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

type Props = {};

const PrivacyPolicyTab = (props: Props) => {
  return (
    <TabCardView>
      <Wrapper>
        <HeaderWrapper>
          <Typography variant="h5" gutterBottom>
            PRIVACY POLICY
          </Typography>
        </HeaderWrapper>
        <SubWrapper>
          <SubContentWrapper>
            <StyledTypography
              variant="body2"
              sx={{ marginBottom: '10px' }}
              gutterBottom
            >
              This Privacy Policy (“Privacy Policy”) applies to FUSION App
              platforms including without limitation www.fusionflix.in and
              other related Site/s or App/s, mobile applications and other
              online features each a “Site/s or App/s”).
            </StyledTypography>
            <StyledTypography variant="body2" gutterBottom>
              This Privacy Policy should be read in conjunction with the Terms
              of Use available on the “Site/s or App/s”. Personal
              Information/Data defined below of a user/s is collected if the
              user/s registers with the Site/s or App/s, accesses the Site/s or
              App/s or takes any action on the Site/s or App/s or uses or
              accesses the Services as defined in the Terms of Use. The terms
              ‘Personal Information’ and ‘Sensitive Personal Information or
              Information’ shall have the meaning ascribed to it under the
              Indian Information Technology Act, 2000 read with the Information
              Technology.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              WHAT DO WE DO WITH YOUR INFORMATION?
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              When you subscribe to something from our packages as part of the
              buying and selling process, we collect the personal information
              you give us such as your name, address and email address.
            </StyledTypography>
            <StyledTypography variant="body2" gutterBottom>
              When you browse our packages, we also automatically receive your
              computer’s internet protocol (IP) address in order to provide us
              with information that helps us learn about your browser and
              operating system. Email marketing (if applicable): With your
              permission, we may send you emails about our store, new products
              and other updates.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              CONSENT
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              When you provide us with personal information to complete a
              transaction, verify your credit card, we imply that you consent to
              our collecting it and using it for that specific reason only.
            </StyledTypography>
            <StyledTypography variant="body2" gutterBottom>
              If we ask for your personal information for a secondary reason,
              like marketing, we will either ask you directly for your expressed
              consent, or provide you with an opportunity to say no. By
              registering/opting in/signing up you agree to give us your consent
              to contact you.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              HOW DO I WITHDRAW MY CONSENT?
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              If after you opt-in, you change your mind, you may withdraw your
              consent for us to contact you, for the continued collection, use
              or disclosure of your information, at any time, by emailing us at
              contact@indhriya.com or contacting us at the address provided on the
              website.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              DISCLOSURE
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              We may disclose your personal information if we are required by
              law to do so or if you violate our Terms of Service.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              PAYMENT
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              We use Stripe for processing payments. We/Stripe do not store your
              card data on their servers. The data is encrypted through the
              Payment Card Industry Data Security Standard (PCI-DSS) when
              processing payment. Your purchase transaction data is only used as
              long as is necessary to complete your purchase transaction.
            </StyledTypography>
            <StyledTypography variant="body2" gutterBottom>
              After that is complete, your purchase transaction information is
              not saved. Our payment gateway adheres to the standards set by
              PCI-DSS as managed by the PCI Security Standards Council, which is
              a joint effort of brands like Visa, MasterCard, American Express
              and Discover. PCI-DSS requirements help ensure the secure handling
              of credit card information by our store and its service providers.
              For more insight, you may also want to read terms and conditions
              of Razor Pay on{' '}
              <a
                href="https://stripe.com/en-in"
                target={'_blank'}
                rel="noreferrer"
              >
                https://stripe.com/en-in
              </a>
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              THIRD-PARTY SERVICES
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              In general, the third-party providers used by us will only
              collect, use and disclose your information to the extent necessary
              to allow them to perform the services they provide to us.
            </StyledTypography>
            <StyledTypography variant="body2" gutterBottom>
              However, certain third-party service providers, such as payment
              gateways and other payment transaction processors, have their own
              privacy policies in respect to the information we are required to
              provide to them for your purchase-related transactions.
            </StyledTypography>
            <StyledTypography variant="body2" gutterBottom>
              For these providers, we recommend that you read their privacy
              policies so you can understand the manner in which your personal
              information will be handled by these providers.
            </StyledTypography>
            <StyledTypography variant="body2" gutterBottom>
              In particular, remember that certain providers may be located in
              or have facilities that are located in different jurisdictions
              than either you or us. So if you elect to proceed with a
              transaction that involves the services of a third- party service
              provider, then your information may become subject to the laws of
              the jurisdiction(s) in which that service provider or its
              facilities are located.
            </StyledTypography>
            <StyledTypography variant="body2" gutterBottom>
              Once you leave our store’s website or are redirected to a
              third-party website or application, you are no longer governed by
              this Privacy Policy or our website’s Terms of Service.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              LINKS
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              When you click on links on our website for subscription, they may
              direct you away from our site. We are not responsible for the
              privacy practices of other sites and encourage you to read their
              privacy statements.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              SECURITY
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              To protect your personal information, we take reasonable
              precautions and follow industry best practices to make sure it is
              not inappropriately lost, misused, accessed, disclosed, altered or
              destroyed.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              COOKIES
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              We use cookies to maintain sessions of user/s. It is not used to
              personally identify you on other websites.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              AGE OF CONSENT
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              By using this site, you represent that you are at least the age of
              majority in your state or province of residence, or that you are
              the age of majority in your state or province of residence and you
              have given us your consent to allow any of your minor dependents
              to use this site.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              CHANGES TO THIS PRIVACY POLICY
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              We reserve the right to modify this privacy policy at any time, so
              please review it frequently. Changes and clarifications will take
              effect immediately upon their posting on the website. If we make
              material changes to this policy, we will notify you here that it
              has been updated, so that you are aware of what information we
              collect, how we use it, and under what circumstances, if any, we
              use and/or disclose it. If our APP is acquired or merged with
              another company, your information may be transferred to the new
              owners so that we may continue to provide services to you.
            </StyledTypography>
          </SubContentWrapper>
          <SubHeaderWrapper>
            <Typography variant="subtitle1" gutterBottom>
              QUESTIONS AND CONTACT INFORMATION
            </Typography>
          </SubHeaderWrapper>
          <SubContentWrapper>
            <StyledTypography variant="body2" gutterBottom>
              If you would like to: access, correct, amend or delete any
              personal information we have, register a complaint, or simply want
              more information, mail our Privacy Compliance Officer at
              contact@indhriya.com Or by contacting at the company contact which
              is hereby incorporated by this reference into the Terms of
              Service.
            </StyledTypography>
          </SubContentWrapper>
        </SubWrapper>
      </Wrapper>
    </TabCardView>
  );
};
const Wrapper = styled.div`
  padding: 20px;
`;
const SubWrapper = styled.div`
  overflow: auto;
  height: 100%;
  min-height: 434px;
  max-height: 434px;
  padding: 10px 0 0 0;

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
`;
const HeaderWrapper = styled.div`
  text-align: center;
  padding: 0 20px 10px 20px;
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 10px !important;
    text-align: left;
  }
  h5 {
    font-size: 18px;
    margin: 0;
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 15px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 14px;
    }
  }
`;
const SubHeaderWrapper = styled.div`
  text-align: start;
  padding-top: 20px;
  h6 {
    font-size: 14px;
    letter-spacing: 0.8px;
    font-family: 'Urbanist' !important;
    color: #e0be00 !important;
    @media (min-width: 576px) and (max-width: 767px) {
      font-size: 13px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 12px;
    }
  }
`;
const SubContentWrapper = styled.div`
  text-align: start;
  padding-bottom: 10px;
  p {
    font-size: 13px;
    letter-spacing: 0.8px;
    line-height: 2;
    font-family: 'Urbanist' !important;
    @media (min-width: 320px) and (max-width: 575px) {
      font-size: 10px !important;
      letter-spacing: 0.2px;
    }
  }
  a {
    color: #e0be00 !important;
  }
`;

const StyledTypography = styled(Typography)`
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 11px !important;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    font-size: 10px !important;
  }
`;
export default PrivacyPolicyTab;
