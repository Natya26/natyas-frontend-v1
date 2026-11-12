import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/RoutePath';
import { Footer } from 'app/components/Footer';

const notes = [
  {
    when: 'Today',
    kind: 'New episode',
    text: 'Bro Code, Episode 4 "Last Round" is out now. The group finally has to choose.',
  },
  {
    when: 'Today',
    kind: 'Free demo',
    text: 'Watch a free two-minute demo of Aara before you start the full film.',
  },
  {
    when: 'Yesterday',
    kind: 'New series',
    text: 'Gangs of Gregory is now streaming. All episodes are ready to watch.',
  },
  {
    when: 'This week',
    kind: 'Coming soon',
    text: 'Metro and Team 17 are coming to Natya soon. We will let you know the day they open.',
  },
  {
    when: 'This week',
    kind: 'Because you watched',
    text: 'You watched Thoovanathumbikal. Try Oru CBI Diary Kurippu next, another Malayalam classic.',
  },
  {
    when: 'Earlier',
    kind: 'Membership',
    text: 'Demos are always free. Choose a plan in Settings to watch every film and series in full.',
  },
];

export const NotificationsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Main>
        <Panel>
          <Head>
            <div>
              <Title>Notifications</Title>
              <Lead>
                New episodes, new arrivals, and reminders about what is coming
                next on Natya.
              </Lead>
            </div>
            <Back
              type="button"
              onClick={() => navigate(RoutePath.homepage.path)}
            >
              Back to home
            </Back>
          </Head>
          <List>
            {notes.map(note => (
              <Item key={note.text}>
                <When>{note.when}</When>
                <Kind>{note.kind}</Kind>
                <p>{note.text}</p>
              </Item>
            ))}
          </List>
        </Panel>
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #111010;
  color: #fff;
  padding: 110px 24px 48px;
`;

const Panel = styled.section`
  max-width: 760px;
  margin: 0 auto;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 18px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  color: #e0be00;
  font-size: 34px;
`;

const Lead = styled.p`
  margin: 8px 0 0;
  color: #c8c8c8;
`;

const Back = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  background: #e0be00;
  color: #161616;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.article`
  background: #161616;
  border: 1px solid rgba(224, 190, 0, 0.28);
  border-radius: 16px;
  padding: 16px 18px;
  p {
    margin: 8px 0 0;
    color: #eee;
    line-height: 1.45;
  }
`;

const When = styled.span`
  color: #9a9a9a;
  font-size: 12px;
  letter-spacing: 0.4px;
`;

const Kind = styled.h2`
  margin: 6px 0 0;
  font-size: 16px;
  color: #e0be00;
`;
