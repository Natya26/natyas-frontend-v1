import React from 'react';
import styled from 'styled-components';

interface Props {
  text?: string;
  icon?: string | undefined;
  link?: string;
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  margin-bottom: 12px;
  background-color: #181616 !important;
  border-radius: 10px;
  font-family: 'Urbanist';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  cursor: pointer;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const LinkButton: React.FC<Props> = ({ text, icon, link }) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };

  return (
    <StyledContainer onClick={handleClick}>
      <span>{text}</span>
      <StyledIcon src={icon} alt="Icon" />
    </StyledContainer>
  );
};

export default LinkButton;
