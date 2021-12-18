import React from "react";
import { Link } from "react-router-dom";

import useRegisterHandler from "../hooks/useRegisterHandler";
import FormField from "./FormField";
import FormContainer from "../common/formStyle";
const RegisterForm = () => {
  const { formik } = useRegisterHandler();
  return (
    <RegisterFormContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormField
          formik={formik}
          name={"uname"}
          placeholder={"Type Your name"}
          type={"text"}
          label={"Name"}
        />
        <FormField
          formik={formik}
          name={"email"}
          placeholder={"Type Your email id"}
          type={"email"}
          label={"Email id"}
        />
        <FormField
          formik={formik}
          name={"password"}
          placeholder={"************"}
          type={"password"}
          label={"Password"}
        />
        <FormField
          formik={formik}
          name={"cpassword"}
          placeholder={"************"}
          type={"password"}
          label={"Confirm Password"}
        />
        <div className="form-footer">
          <input
            type="submit"
            value="Create an account"
            className="btn btn-danger"
          />
        </div>
        <div className="log-account">
          <p>If you have already an account</p>
          <Link to="/">Sign In</Link>
        </div>
      </form>
    </RegisterFormContainer>
  );
};

const RegisterFormContainer = FormContainer;

export default RegisterForm;
