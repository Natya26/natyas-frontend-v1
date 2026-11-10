import styled from 'styled-components';
import logo from './natya-logo.png';

type Props = {
  onClick?: () => void;
  className?: string;
};

export const NatyaWordmark = ({ onClick, className }: Props) => (
  <Mark className={className} onClick={onClick} src={logo} alt="Natya" />
);

const Mark = styled.img`
  display: block;
  height: 72px;
  width: auto;
  object-fit: contain;
  cursor: pointer;
`;
