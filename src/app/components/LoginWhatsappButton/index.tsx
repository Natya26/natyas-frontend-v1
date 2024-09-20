import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import Box from '@mui/material/Box';

interface LoginWhatsappProps {
  onClick: () => void; // Function to trigger when the card is clicked
  text: string;
}

export const LoginWhatsappButton: React.FC<LoginWhatsappProps> = ({ onClick, text }) => {
  return (
    <CardContainer onClick={onClick}>
      <FaWhatsapp size={24} color="#25D366" style={{ marginRight: '10px' }} />
      <LoginText>{text}</LoginText>
    </CardContainer>
  );
};


// Styled components for the card
const CardContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: #3062d4;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #244ead;
  }
`;

const LoginText = styled.span`
  font-family: Urbanist, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #fff;

  &:hover {
    color: #dadada;
  }
`;
