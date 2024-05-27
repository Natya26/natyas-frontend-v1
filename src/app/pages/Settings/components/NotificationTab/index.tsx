import React from 'react';
import { TabCardView } from 'app/components/TabCardView';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import NotificationSwitch from 'app/components/NotificationSwitch';

type Props = {};

const NotificationTab = (props: Props) => {
  return (
    <TabCardView>
      <Wrapper>
        <SubWrapper>
          <InnerWrapper>
            <SubHeaderWrapper>
              <Typography variant="subtitle1" gutterBottom>
                General Notification
              </Typography>
            </SubHeaderWrapper>
            <SubContentWrapper>
              <SubTextWrapper>
                <Typography variant="body2" gutterBottom>
                  Lorem ipsum dolor sit amet. Et sint maxime sed rerum molestias
                  ab libero obcaecati vel accusantium fugiat. Et voluptatum
                  corporis At eaque omnis et dolor eius id ipsa minus ut
                  perferendis eius et ipsum quia. Id tenetur earum ab enim ullam
                  aut totam cupiditate.
                </Typography>
              </SubTextWrapper>
              <SubSwitchWrapper>
                <NotificationSwitch checked={false} />
              </SubSwitchWrapper>
            </SubContentWrapper>
          </InnerWrapper>
          <InnerWrapper>
            <SubHeaderWrapper>
              <Typography variant="subtitle1" gutterBottom>
                New Arrival
              </Typography>
            </SubHeaderWrapper>
            <SubContentWrapper>
              <SubTextWrapper>
                <Typography variant="body2" gutterBottom>
                  Lorem ipsum dolor sit amet. Et sint maxime sed rerum molestias
                  ab libero obcaecati vel accusantium fugiat. Et voluptatum
                  corporis At eaque omnis et dolor eius id ipsa minus ut
                  perferendis eius et ipsum quia. Id tenetur earum ab enim ullam
                  aut totam cupiditate.
                </Typography>
              </SubTextWrapper>
              <SubSwitchWrapper>
                <NotificationSwitch />
              </SubSwitchWrapper>
            </SubContentWrapper>
          </InnerWrapper>
          <InnerWrapper>
            <SubHeaderWrapper>
              <Typography variant="subtitle1" gutterBottom>
                New Releases
              </Typography>
            </SubHeaderWrapper>
            <SubContentWrapper>
              <SubTextWrapper>
                <Typography variant="body2" gutterBottom>
                  Lorem ipsum dolor sit amet. Et sint maxime sed rerum molestias
                  ab libero obcaecati vel accusantium fugiat. Et voluptatum
                  corporis At eaque omnis et dolor eius id ipsa minus ut
                  perferendis eius et ipsum quia. Id tenetur earum ab enim ullam
                  aut totam cupiditate.
                </Typography>
              </SubTextWrapper>
              <SubSwitchWrapper>
                <NotificationSwitch />
              </SubSwitchWrapper>
            </SubContentWrapper>
          </InnerWrapper>
          <InnerWrapper>
            <SubHeaderWrapper>
              <Typography variant="subtitle1" gutterBottom>
                App Updates
              </Typography>
            </SubHeaderWrapper>
            <SubContentWrapper>
              <SubTextWrapper>
                <Typography variant="body2" gutterBottom>
                  Lorem ipsum dolor sit amet. Et sint maxime sed rerum molestias
                  ab libero obcaecati vel accusantium fugiat. Et voluptatum
                  corporis At eaque omnis et dolor eius id ipsa minus ut
                  perferendis eius et ipsum quia. Id tenetur earum ab enim ullam
                  aut totam cupiditate.
                </Typography>
              </SubTextWrapper>
              <SubSwitchWrapper>
                <NotificationSwitch />
              </SubSwitchWrapper>
            </SubContentWrapper>
          </InnerWrapper>
        </SubWrapper>
      </Wrapper>
    </TabCardView>
  );
};
const Wrapper = styled.div`
  padding: 20px;
`;
const InnerWrapper = styled.div`
  margin: 15px 0px;
`;
const SubWrapper = styled.div`
  padding: 3% 5%;
`;
const SubHeaderWrapper = styled.div`
  text-align: start;
  h6 {
    font-size: 12px !important;
    font-family: 'Urbanist' !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    letter-spacing: 1.1px !important;
  }
`;
const SubContentWrapper = styled.div`
  text-align: start;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 12px !important;
    letter-spacing: 0.5px;
    font-family: 'Urbanist' !important;
    color: #8a8a8a !important;
  }
  a {
    color: #f4793b !important;
  }
`;
const SubTextWrapper = styled.div`
  text-align: start;
  h5 {
    font-size: 18px;
  }
`;
const SubSwitchWrapper = styled.div`
  padding: 8px 10px;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: end;
`;
export default NotificationTab;
