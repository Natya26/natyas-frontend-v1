import styled from 'styled-components';

const StaticProfile = () => (
  <Card>
    <Top>
      <Mark>N</Mark>
      <div>
        <h2>Natya member</h2>
        <p>Your profile on this site</p>
      </div>
    </Top>
    <Rows>
      <Row>
        <span>Name</span>
        <strong>Test</strong>
      </Row>
      <Row>
        <span>Phone</span>
        <strong>+91 3434343434</strong>
      </Row>
      <Row>
        <span>Email</span>
        <strong>test3434@natya.co.uk</strong>
      </Row>
      <Row>
        <span>Plan</span>
        <strong>No active plan</strong>
      </Row>
    </Rows>
  </Card>
);

const Card = styled.section`
  color: #fff;
  background: #161616;
  border: 1px solid rgba(224, 190, 0, 0.35);
  border-radius: 20px;
  padding: 28px 24px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  h2 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    color: #e0be00;
    font-size: 28px;
  }
  p {
    margin: 4px 0 0;
    color: #c8c8c8;
  }
`;

const Mark = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #e0be00;
  color: #161616;
  font-size: 28px;
  font-weight: 700;
`;

const Rows = styled.div`
  margin-top: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  span {
    color: #bdbdbd;
  }
  strong {
    text-align: right;
  }
`;

export default StaticProfile;
