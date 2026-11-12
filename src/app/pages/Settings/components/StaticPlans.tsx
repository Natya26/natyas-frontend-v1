import styled from 'styled-components';

const plans = [
  {
    name: 'Basic',
    price: '£9',
    period: 'per month',
    points: ['Full movies after you subscribe', 'Watch on this website'],
  },
  {
    name: '3 months',
    price: '£12.99',
    period: 'every 3 months',
    points: ['Everything in Basic', 'Better value for a season'],
    featured: true,
  },
  {
    name: 'Yearly',
    price: '£39.99',
    period: 'per year',
    points: ['Everything in 3 months', 'Lowest price for the year'],
  },
];

const StaticPlans = () => (
  <Wrap>
    <Intro>
      <h2>Choose a plan</h2>
      <p>Demos stay free. A plan unlocks the full movie or series.</p>
    </Intro>
    <Grid>
      {plans.map(plan => (
        <Card key={plan.name} $featured={plan.featured}>
          {plan.featured && <Badge>Popular</Badge>}
          <Name>{plan.name}</Name>
          <Price>{plan.price}</Price>
          <Period>{plan.period}</Period>
          <List>
            {plan.points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </List>
          <Action type="button">Subscribe</Action>
        </Card>
      ))}
    </Grid>
  </Wrap>
);

const Wrap = styled.div`
  color: #fff;
`;

const Intro = styled.div`
  margin-bottom: 22px;
  h2 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    color: #e0be00;
    font-size: 28px;
  }
  p {
    margin: 8px 0 0;
    color: #cfcfcf;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
`;

const Card = styled.article<{ $featured?: boolean }>`
  position: relative;
  padding: 22px 18px 18px;
  border-radius: 18px;
  background: #161616;
  border: 1px solid
    ${props => (props.$featured ? '#e0be00' : 'rgba(255,255,255,0.12)')};
`;

const Badge = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  color: #161616;
  background: #e0be00;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 700;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Price = styled.p`
  margin: 14px 0 0;
  color: #e0be00;
  font-size: 32px;
  font-weight: 700;
`;

const Period = styled.p`
  margin: 4px 0 0;
  color: #bdbdbd;
`;

const List = styled.ul`
  margin: 16px 0 0;
  padding-left: 18px;
  color: #e8e8e8;
  li {
    margin: 8px 0;
  }
`;

const Action = styled.button`
  margin-top: 18px;
  width: 100%;
  border: 0;
  border-radius: 999px;
  padding: 12px 16px;
  background: #e0be00;
  color: #161616;
  font-weight: 700;
`;

export default StaticPlans;
