import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../api-config/Axios";
import { useSelector } from "react-redux";
import { selectUid, selectUserToken } from "../../redux/user/UserSlice";
import TemperatureTable from "./TemperatureTable";
import useStorage from "../hooks/useStorage";
const Home = () => {
  const [cityOneData, setCityOneData] = useState([]);
  const [cityTwoData, setCityTwoData] = useState([]);
  const uid = useSelector(selectUid);
  const token = useSelector(selectUserToken);
  const { setItem, getItem } = useStorage();

  const cityOne = "London";
  const cityTwo = "Colombo";

  const modifyCitiyArr = (cityName, tempData) => {
    return tempData
      .map(({ cities, ...rest }) => {
        return {
          ...rest,
          temp: cities.find((r) => r.city === cityName)?.temp,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  useEffect(() => {
    let isLogin = false;
    if (!getItem("firstLogin")) {
      setItem("firstLogin", { login: true });
      isLogin = true;
    }

    axios
      .post(
        "/user/temperature",
        { uid, cities: [cityOne, cityTwo], isLogin },
        { headers: { WEATHER: token } }
      )
      .then((res) => {
        // console.log(res.data);
        setCityOneData(modifyCitiyArr(cityOne, res?.data));
        setCityTwoData(modifyCitiyArr(cityTwo, res?.data));
      })
      .catch((err) => {
        console.log(err?.response);
      });
  }, []);

  const resetTempArr = () => {
    const sortCityOneArr = [...cityOneData];
    const sortCityTwoArr = [...cityTwoData];

    setCityOneData(
      sortCityOneArr.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
    setCityTwoData(
      sortCityTwoArr.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  const sortTemp = () => {
    const sortCityOneArr = [...cityOneData];
    const sortCityTwoArr = [...cityTwoData];

    setCityOneData(sortCityOneArr.sort((a, b) => b.temp - a.temp));
    setCityTwoData(sortCityTwoArr.sort((a, b) => b.temp - a.temp));
  };

  return (
    <Container className="container mt-4">
      <h2 className="text-primary text-center">Temperature Records</h2>
      <div className="b-1"></div>
      <ButtonGroupContainer>
        <button className="btn btn-danger m-4" onClick={sortTemp}>
          Hottest First
        </button>
        <button className="btn btn-success m-4" onClick={resetTempArr}>
          Reset Order
        </button>
      </ButtonGroupContainer>
      <div className="temp-table">
        <TemperatureTable Tempdata={cityOneData} city={cityOne} />
        <TemperatureTable Tempdata={cityTwoData} city={cityTwo} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .b-1 {
    border-bottom: 1px solid gray;
    width: 100%;
    height: 1px;
  }
  .temp-table {
    display: flex;
  }
`;
const ButtonGroupContainer = styled.div``;
export default Home;
