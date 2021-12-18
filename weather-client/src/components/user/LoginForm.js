import React from "react";
import { Link } from "react-router-dom";
import FormContainer from "../common/formStyle";
import useLoginHandler from "../hooks/useLoginHandler";
import FormField from "./FormField";
const LoginForm = () => {
  const { formik } = useLoginHandler();
  return (
    <LoginFormContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormField
          formik={formik}
          name={"email"}
          placeholder={"Type Your email id"}
          type="email"
          label="Email id"
        />
        <FormField
          formik={formik}
          name={"password"}
          placeholder={"************"}
          type="password"
          label="Password"
        />

        <div className="form-footer">
          <input type="submit" value="Signin" className="btn btn-danger" />
        </div>
        <div className="log-account">
          <p>If you don't have any account</p>
          <Link to="/register">Sign up</Link>
        </div>
      </form>
    </LoginFormContainer>
  );
};
const LoginFormContainer = FormContainer;
export default LoginForm;
