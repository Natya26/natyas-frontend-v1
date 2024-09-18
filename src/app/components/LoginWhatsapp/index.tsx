import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import Box from '@mui/material/Box';

interface LoginWhatsappProps {
  onClick: () => void; // Function to trigger when the card is clicked
}

export const LoginWhatsapp: React.FC<LoginWhatsappProps> = ({ onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <FaWhatsapp size={24} color="#25D366" style={{ marginRight: '10px' }} />
      <LoginText>Login with WhatsApp</LoginText>
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
  background-color: #e0ffe0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d0ffd0;
  }
`;

const LoginText = styled.span`
  font-family: Urbanist, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
