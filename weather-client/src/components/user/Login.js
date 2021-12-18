import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <LoginContainer>
      <LoginSubContainer>
        <h6 className="text-lead text-dark text-center mt-4">LOGIN ACCOUNT</h6>
        <div className="regform__outer"></div>
        <LoginForm />
      </LoginSubContainer>
    </LoginContainer>
  );
};
const LoginContainer = styled.div`
  display: grid;
  place-items: center;
`;
const LoginSubContainer = styled.div`
  width: 50%;
  height: 24rem;
  margin-top: 3rem;
  background-color: powderblue;
  border-radius: 15px;

  .regform__outer {
    border: 1px solid white;
  }
`;
export default Login;
