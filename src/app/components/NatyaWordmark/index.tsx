import styled from 'styled-components';

type Props = {
  onClick?: () => void;
  className?: string;
};

export const NatyaWordmark = ({ onClick, className }: Props) => (
  <Mark className={className} onClick={onClick}>
    Natya
  </Mark>
);

const Mark = styled.span`
  display: inline-block;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  color: #e0be00;
  border-bottom: 3px solid #e0be00;
  line-height: 0.95;
  letter-spacing: 0.5px;
  font-size: 42px;
  cursor: pointer;
`;
