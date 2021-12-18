import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axios from "../../api-config/Axios";
import useStorage from "./useStorage";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLoginDetails } from "../../redux/user/UserSlice";
const useLoginHandler = () => {
  const dispatch = useDispatch();
  const { setItem } = useStorage();
  const history = useHistory();
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
      axios
        .post("/user/login", values)
        .then((res) => {
          setItem("userToken", res.data);
          toast.success(" sucessfully login");
          dispatch(setUserLoginDetails(res.data));
          setTimeout(() => {
            history.replace("/");
          }, 0);
        })
        .catch((err) => {
          toast.error(err?.response?.data);
          resetForm();
        });
    },
  });

  return { formik };
};

export default useLoginHandler;
