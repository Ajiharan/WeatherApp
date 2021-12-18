import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Header = () => {
  return (
    <HeaderComponent>
      <h5>Weather App</h5>
      <div className="pages">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </HeaderComponent>
  );
};

const HeaderComponent = styled.div`
  height: 4rem;
  padding: 0.5rem;
  background-color: black;
  opacity: 0.85;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  .pages {
    display: flex;
    a {
      text-decoration: none;
      color: inherit;
      margin-right: 1rem;
    }
  }
`;

export default Header;
