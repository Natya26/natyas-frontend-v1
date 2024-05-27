import React from 'react';
import styled from 'styled-components';

type FormProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children?: React.ReactNode; //To make Component able to recieve children
  className?: string;
};

const Form = ({ onSubmit, children, className }: FormProps) => {
  return (
    <FormWrapper className={`form-wrapper ${' ' + className}`}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormWrapper>
  );
};
const FormWrapper = styled.div`
  padding: 30px 20px 0px 20px !important;
  width: 100%;
  /* box-shadow: 0px 0px 2px 0px #c3baba; */
`;
export default Form;
