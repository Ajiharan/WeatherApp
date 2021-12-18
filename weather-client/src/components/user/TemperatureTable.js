import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
const TemperatureTable = ({ Tempdata, city }) => {
  //convert kelvin to celcius
  const setTempCel = (temp) => {
    return temp - 273.15;
  };
  //convert kelvin to fahrenheit
  const setTempFah = (temp) => {
    return (setTempCel(temp) * 9) / 5 + 32;
  };

  //format date structure
  const modifyDateStructure = (date) => {
    return moment(new Date(date)).format("llll");
  };

  return (
    <Table className="m-1">
      <thead>
        <tr>
          <th>{city}</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {Tempdata.map(({ date, _id, temp }) => (
          <tr key={_id}>
            <td>{modifyDateStructure(date)}</td>
            <td>{`${parseInt(setTempCel(temp))} C`}</td>
            <td>{`${parseInt(setTempFah(temp))} F`}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TemperatureTable;
