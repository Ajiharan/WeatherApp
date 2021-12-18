import React from "react";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";
const Register = () => {
  return (
    <RegisterContainer>
      <RegisterSubContainer>
        <h6 className="text-lead text-dark text-center mt-4">
          REGISTER ACCOUNT
        </h6>
        <div className="regform__outer"></div>
        <RegisterForm />
      </RegisterSubContainer>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: grid;
  place-items: center;
`;
const RegisterSubContainer = styled.div`
  width: 50%;
  height: 34rem;
  margin-top: 3rem;
  background-color: powderblue;
  border-radius: 15px;

  .regform__outer {
    border: 1px solid white;
  }
`;
export default Register;
