import { useFormik } from "formik";
import * as Yup from "yup";

const useRegisterHandler = () => {
  const formik = useFormik({
    initialValues: {
      uname: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      uname: Yup.string().required("name is required"),
      email: Yup.string()
        .required("email is required")
        .email("invalid email address"),
      password: Yup.string()
        .required("password is required")
        .length(6, "password must have minimum 6 characters"),
      cpassword: Yup.string()
        .required("password is required")
        .oneOf([Yup.ref("password"), null], "password didn't match"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);
    },
  });

  return { formik };
};

export default useRegisterHandler;
