import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectUid, setSignOut } from "../../redux/user/UserSlice";

const Header = () => {
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  const logoutuser = () => {
    dispatch(setSignOut());
  };
  const getLinks = () => {
    if (!uid) {
      return (
        <React.Fragment>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <button className="btn btn-link btn-logout" onClick={logoutuser}>
          Logout
        </button>
      </React.Fragment>
    );
  };
  return (
    <HeaderComponent>
      <h5>Weather App</h5>
      <div className="pages">{getLinks()}</div>
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
  .btn-logout {
    text-decoration: none;
    color: inherit;
  }
`;

export default Header;
