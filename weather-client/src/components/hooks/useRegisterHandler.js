import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axios from "../../api-config/Axios";
import { useHistory } from "react-router-dom";
const useRegisterHandler = () => {
  const history = useHistory();
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
      const { cpassword, uname, ...rest } = values;
      axios
        .post("/user/signup", { name: uname, ...rest })
        .then((res) => {
          resetForm();
          toast.success("registered sucessfully");
          history.replace("/");
        })
        .catch((err) => {
          toast.error(err?.response?.data);
          resetForm();
        });
    },
  });

  return { formik };
};

export default useRegisterHandler;
