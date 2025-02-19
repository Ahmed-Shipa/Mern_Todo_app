import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // register the form
  async function registerSubmit(values) {
    setLoading(true);
    await axios
      .post(`http://localhost:3000/users/signUp`, values)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message);
          setLoading(false);
        } else {
          toast.success("Success");
          setLoading(false);
          navigate("/login");
        }
      });
  }

  // use yup for validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    userName: Yup.string()
      .min(2, "min length is 2")
      .max(20, "max length is 20")
      .required("Name Required"),
    password: Yup.string()
      .min(2, "min length is 2")
      .max(20, "max length is 20")
      .required("Password Required"),
  });

  // use formik to submit form
  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <section className="w-[80%] mx-auto mt-2">
      <div className="flex justify-between max-md:flex-col-reverse">
        {/* start inputs */}
        <div className="border-r-2 max-md:border-0 w-2/3 h-[600px]">
          <div className="relative top-40 max-md:top-30">
            <form onSubmit={formik.handleSubmit}>
              <div>
                {/* input of email */}
                <input
                  className="border-2 border-gray-400 rounded-sm w-[600px] max-xl:w-[450px] max-lg:w-[350px] max-sm:w-[300px] h-10 p-3 mb-6 transition duration-400 focus:outline-0 focus:border-0 focus:ring-4 focus:ring-red-500"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Your email"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg w-[600px] max-xl:w-[450px] max-lg:w-[350px] max-sm:w-[300px] ">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                {/* input of userName */}
                <input
                  className="border-2 border-gray-400 rounded-sm w-[600px] max-xl:w-[450px] max-lg:w-[350px] max-sm:w-[300px]  h-10 p-3 mb-6 transition duration-400 focus:outline-0 focus:border-0 focus:ring-4 focus:ring-red-500"
                  type="text"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Your name"
                />
                {formik.errors.userName && formik.touched.userName ? (
                  <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg w-[600px] max-xl:w-[450px] max-lg:w-[350px] max-sm:w-[300px] ">
                    {formik.errors.userName}
                  </div>
                ) : null}
              </div>
              <div>
                {/* input of password */}
                <input
                  className="border-2 border-gray-400 rounded-sm w-[600px] max-xl:w-[450px] max-lg:w-[350px] max-sm:w-[300px] h-10 p-3 mb-6 transition duration-400 focus:outline-0 focus:border-0 focus:ring-4 focus:ring-red-500"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Your password"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg w-[600px] max-xl:w-[450px] max-lg:w-[350px] max-sm:w-[300px] ">
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
                  className="bg-red-500 disabled:bg-gray-300 text-white py-2 px-6 w-[600px] max-xl:w-[450px] max-lg:w-[350px] max-sm:w-[300px] cursor-pointer hover:bg-black"
                >
                  SignUp
                </button>
              )}
            </form>
          </div>
        </div>
        {/* end inputs */}
        {/* start side  */}
        <div className="w-1/4 max-sm:w-1/2">
          <h2 className="relative top-40 max-md:top-20 text-8xl max-md:text-4xl font-semibold text-red-500">
            Sign Up
          </h2>
        </div>
        {/* end side  */}
      </div>
    </section>
  );
}
