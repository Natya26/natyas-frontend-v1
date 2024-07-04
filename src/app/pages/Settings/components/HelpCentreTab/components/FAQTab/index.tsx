import React from 'react';
import styled from 'styled-components';
import FaqAccordion from 'app/components/FaqAccordion';
import { TabCardView } from 'app/components/TabCardView';
type FaqTabProps = {};

export default function FaqTab({}: FaqTabProps) {
  const dummyContent =
    'Lorem ipsum dolor sit amet. Non natus ipsam et blanditiis facere et aliquam labore quo inventore quia. Aut porro galisum ut voluptatibus fugit non pariatur quibusdam aut aperiam velit ut quod reprehenderit ut commodi odio non internos maiores. Et voluptas suscipit est culpa nihil vel asperiores voluptate et illo quis. Et nesciunt totam est mollitia delectus non facere dignissimos.';
  return (
    <Wrapper>
      <StyledTabCardView className="StyledTabCardView">
        <FaqAccordion title="What Is Fusion" content={dummyContent} />
        <FaqAccordion title="How to remove wishlist?" content={dummyContent} />
        <FaqAccordion
          title="How do I subscribe to premium?"
          content={dummyContent}
        />
        <FaqAccordion
          title="How to unsubcribe from premium"
          content={dummyContent}
        />
        <FaqAccordion
          title="How to remove from wishlist"
          content={dummyContent}
        />
        <FaqAccordion title="How to downlaod movies?" content={dummyContent} />
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
