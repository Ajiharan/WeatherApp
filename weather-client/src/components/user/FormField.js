import React from "react";
import styled from "styled-components";
const FormField = ({ formik, name, placeholder, type, label }) => {
  return (
    <Container>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        className="form-control input-control"
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <p className="p-error">{formik.errors[name]}</p>
      ) : (
        <p style={{ opacity: 0 }}>{"null"}</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-weight: 500;
  }
  .form-control:focus {
    box-shadow: none;
    outline: none;
  }
  .p-error {
    color: red;
  }
`;

export default FormField;
