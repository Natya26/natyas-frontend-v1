import React from 'react';
import styled from 'styled-components';
import FaqAccordion from 'app/components/FaqAccordion';
import { TabCardView } from 'app/components/TabCardView';
type FaqTabProps = {};

const faqs = [
  {
    title: 'What is Natya?',
    content:
      'Natya is a streaming service for Malayalam and English films and web series. That includes well-loved classics and new independent stories. You can watch on the website or with the Natya Android app.',
  },
  {
    title: 'Can I watch anything for free?',
    content:
      'Yes. Most titles have a free demo of about two minutes, so you can try a film or series before you pay. To watch every title in full, choose a plan.',
  },
  {
    title: 'How do I subscribe?',
    content:
      'Go to Settings and open Subscriptions. Pick the plan that suits you and pay by card. Your plan starts as soon as the payment goes through.',
  },
  {
    title: 'How do I cancel my plan?',
    content:
      'Go to Settings, open Subscriptions, and choose Cancel plan. You can keep watching until the end of the period you have paid for. Your plan will not renew after that.',
  },
  {
    title: 'How do I add or remove titles from My List?',
    content:
      'Open a film or series and tap the + button to add it to My List. To remove it, open My List and tap the button again on that title.',
  },
  {
    title: 'Can I download films to watch offline?',
    content:
      'Offline downloads are only available in the Natya Android app. You can get the app from the link at the bottom of the website. Downloaded titles stay available while your plan is active.',
  },
  {
    title: 'Why is my video buffering or not playing?',
    content:
      'Check that your internet connection is stable, then refresh the page. If the video still does not play, try another browser or turn off any VPN. If that does not fix it, contact us.',
  },
];

export default function FaqTab({}: FaqTabProps) {
  return (
    <Wrapper>
      <StyledTabCardView className="StyledTabCardView">
        {faqs.map(faq => (
          <FaqAccordion
            key={faq.title}
            title={faq.title}
            content={faq.content}
          />
        ))}
      </StyledTabCardView>
    </Wrapper>
  );
}
const StyledTabCardView = styled(TabCardView)``;
const Wrapper = styled.div`
  div {
    background-color: transparent;
    min-height: unset !important;
  }
`;
