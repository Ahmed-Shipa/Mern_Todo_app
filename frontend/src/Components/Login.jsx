import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  let { setuserToken } = useContext(UserContext);
  // set loading state
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  // register the form
  async function loginSubmit(values) {
    setLoading(true);
    await axios
      .post(`http://localhost:3000/users/login`, values)
      .then((res) => {
        if (res.data.error) {
          setLoading(false);
          toast.error(res.data.message);
        } else {
          toast.success("Success");
          // store token in local storage
          localStorage.setItem("token", res.data.token);
          // store token in usercontext
          setuserToken(res.data.token);
          setLoading(false);
          // navigate to home page
          navigate("/");
        }
      });
  }

  // use yup for validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(2, "min length is 2")
      .max(20, "max length is 20")
      .required("Password Required"),
  });

  // use formik to submit form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <section className="w-[80%] mx-auto mt-2">
      <div className="flex justify-between max-md:flex-col">
        {/* start side  */}
        <div className="w-1/4 pl-10 max-lg:pl-5">
          <h2 className="relative top-40 max-md:top-20 text-8xl max-lg:text-7xl font-semibold text-red-500">
            Login
          </h2>
        </div>
        {/* end side  */}
        {/* start inputs */}
        <div className="h-[600px] pr-10 max-xl:pr-5 max-lg:pr-1">
          <div className="relative top-40 max-md:top-30">
            <form onSubmit={formik.handleSubmit}>
              <div>
                {/* input of email */}
                <input
                  className="border-2 border-gray-400 rounded-sm w-[600px] max-xl:w-[500px] max-lg:w-[380px] max-sm:w-[300px] h-10 p-3 mb-6 transition duration-400 focus:outline-0 focus:border-0 focus:ring-4 focus:ring-red-500"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Your email"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg w-[600px] max-xl:w-[500px] max-lg:w-[380px] max-sm:w-[300px]">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                {/* input of password */}
                <input
                  className="border-2 border-gray-400 rounded-sm w-[600px] max-xl:w-[500px] max-lg:w-[380px] max-sm:w-[300px] h-10 p-3 mb-6 transition duration-400 focus:outline-0 focus:border-0 focus:ring-4 focus:ring-red-500"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Your password"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg w-[600px] max-xl:w-[500px] max-lg:w-[380px] max-sm:w-[300px]">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              {loading ? (
                <span className="loader"></span>
              ) : (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="bg-red-500 disabled:bg-gray-300 text-white py-2 px-6 w-[600px] max-xl:w-[500px] max-lg:w-[380px] max-sm:w-[300px] cursor-pointer hover:bg-black"
                >
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
        {/* end inputs */}
      </div>
    </section>
  );
}
