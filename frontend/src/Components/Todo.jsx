import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import TodoCards from "./TodoCards";
import { UserContext } from "../Context/UserContext";

export default function Todo() {
  // backend url
  let backendUrl = import.meta.env.VITE_BACKEND_URL;

  // get the token after login
  let { userToken } = useContext(UserContext);

  // control text area
  const [showTextArea, setShowTextArea] = useState(false);

  // register the form
  async function noteSubmit(values) {
    await axios
      .post(`${backendUrl}/lists/addList`, values, {
        headers: { token: userToken },
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message);
        } else {
          toast.success("Note added");
        }
      });
  }

  // use yup for validation
  const validationSchema = Yup.object({
    title: Yup.string().required("TITLE Required"),
  });

  // use formik to submit form
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema,
    onSubmit: noteSubmit,
  });

  return (
    <>
      <section className="w-[80%] mx-auto mt-8">
        <div className="w-[50%] max-xl:w-[60%] max-lg:w-[70%] max-md:w-[90%] max-sm:w-[100%] mx-auto rounded-xl shadow-2xl pl-3 pt-3">
          <form onSubmit={formik.handleSubmit} className="relative">
            {/* start title input */}
            <div>
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="w-[100%] border-0 outline-0 pb-5"
                onClick={() => {
                  setShowTextArea(true);
                }}
                placeholder="TITLE"
              />
              {formik.errors.title && formik.touched.title ? (
                <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg w-[90%]">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>
            {/* end title input */}
            {/* start body textarea */}
            {showTextArea ? (
              <div>
                <textarea
                  name="body"
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="BODY"
                  className="w-[100%] border-0 outline-0 h-28"
                ></textarea>
              </div>
            ) : null}
            {/* end body textarea */}
            <button
              type="submit"
              disabled={!(formik.isValid || formik.dirty)}
              className={
                showTextArea
                  ? "py-1 px-3 disabled:bg-gray-400 cursor-pointer hover:bg-black bg-red-500 text-white absolute top-45 right-0 font-semibold rounded-xl"
                  : "py-1 px-3 disabled:bg-gray-400 cursor-pointer hover:bg-black bg-red-500 text-white absolute top-18 right-0 font-semibold rounded-xl"
              }
            >
              Add
            </button>
          </form>
        </div>
      </section>
      <TodoCards />
    </>
  );
}
