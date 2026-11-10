import { useState } from 'react';
import styled from 'styled-components';

const items = [
  {
    id: 'episodes',
    title: 'New seasons and episodes',
    text: 'When a new episode of a series you watch is out.',
  },
  {
    id: 'arrivals',
    title: 'New arrivals',
    text: 'Films and series that have just landed on Natya.',
  },
  {
    id: 'soon',
    title: 'Coming soon',
    text: 'A reminder on the day an upcoming title is released.',
  },
  {
    id: 'picks',
    title: 'Watch suggestions',
    text: 'Films and series picked for you, based on what you watch.',
  },
  {
    id: 'membership',
    title: 'Membership',
    text: 'Updates about your plan, renewals, and payments.',
  },
];

const NotificationTab = () => {
  const [on, setOn] = useState<Record<string, boolean>>({
    episodes: true,
    arrivals: true,
    soon: true,
    picks: false,
    membership: true,
  });

  return (
    <Card>
      <h2>Notifications</h2>
      <p>Choose what Natya tells you about. You can change this at any time.</p>
      {items.map(item => (
        <Row key={item.id}>
          <div>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </div>
          <Toggle
            type="button"
            aria-pressed={on[item.id]}
            onClick={() =>
              setOn(current => ({ ...current, [item.id]: !current[item.id] }))
            }
          >
            <Knob $on={on[item.id]} />
          </Toggle>
        </Row>
      ))}
    </Card>
  );
};

const Card = styled.section`
  color: #fff;
  background: #161616;
  border: 1px solid rgba(224, 190, 0, 0.35);
  border-radius: 20px;
  padding: 28px 24px;
  h2 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    color: #e0be00;
    font-size: 28px;
  }
  > p {
    margin: 8px 0 0;
    color: #c8c8c8;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  strong {
    display: block;
  }
  span {
    display: block;
    margin-top: 4px;
    color: #bdbdbd;
  }
`;

const Toggle = styled.button`
  width: 52px;
  height: 30px;
  flex: 0 0 52px;
  border: 0;
  border-radius: 999px;
  padding: 3px;
  background: #3a3a3a;
  cursor: pointer;
  &[aria-pressed='true'] {
    background: #e0be00;
  }
`;

const Knob = styled.span<{ $on: boolean }>`
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #111010;
  transform: translateX(${props => (props.$on ? '22px' : '0')});
`;

export default NotificationTab;
