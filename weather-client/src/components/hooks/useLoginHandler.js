import { useFormik } from "formik";
import * as Yup from "yup";
const useLoginHandler = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("email is required")
        .email("invalid email address"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);
    },
  });

  return { formik };
};

export default useLoginHandler;
