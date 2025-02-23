import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";

export default function UpdateNote() {
  // backend url
  let backendUrl = import.meta.env.VITE_BACKEND_URL;

  // get the id from the url
  let { id } = useParams();

  // update notes
  async function updateNotes(values) {
    await axios.put(`${backendUrl}/lists/update/${id}`, values).then(() => {
      toast.success("Note updated");
    });
  }

  let formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: updateNotes,
  });

  return (
    <section className="mt-4 bg-[#ffeccc] h-[500px] max-sm:h-[550px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-[80%] mx-auto pt-14">
          <h3 className="text-4xl text-black font-semibold mb-10">
            Update Your Task
          </h3>
          <input
            type="text"
            className="w-[80%] max-sm:w-[100%] h-12 rounded outline-none shadow-sm bg-white pl-5"
            placeholder="TITLE"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <textarea
            type="text"
            className="w-[80%] max-sm:w-[100%] h-52 rounded outline-none shadow-sm bg-white mt-5 pl-5 pt-4"
            placeholder="BODY"
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="flex items-center mt-2 w-[60%] gap-x-2">
            <button
              type="submit"
              disabled={!formik.dirty}
              className="bg-green-500 py-2 px-4  disabled:bg-gray-300 rounded-xl hover:bg-black text-white cursor cursor-pointer"
            >
              Update
            </button>
            <Link
              to={"/todo"}
              className="bg-red-500 py-2 px-4 rounded-xl hover:bg-black text-white cursor cursor-pointer"
            >
              Close
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
