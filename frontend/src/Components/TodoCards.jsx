import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function TodoCards() {
  // save the notes in state
  const [Notes, setNotes] = useState([]);

  // get the token after login
  let { userToken } = useContext(UserContext);

  // get the notes
  async function getNotes() {
    await axios
      .get(`http://localhost:3000/lists`, {
        headers: { token: userToken },
      })
      .then((res) => {
        setNotes(res.data.message);
      });
  }

  // delete notes
  async function deleteNotes(id) {
    await axios
      .delete(`http://localhost:3000/lists/delete/${id}`)
      .then(() => {
        toast.success("Note deleted");
      });
  }

  useEffect(() => {
    getNotes();
  }, [Notes]);

  return (
    <section className="w-[80%] mx-auto mt-20 mb-10">
      {/* the notes */}
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-6">
        {/*start note div  */}
        {Array.isArray(Notes) && Notes.length > 0
          ? Notes?.map((ele) => {
              return (
                <div key={ele?._id} className="my-6">
                  <div className="p-5 shadow-xl rounded-xl h-56">
                    <h3 className="text-gray-400 font-semibold mb-4">
                      {ele?.title}
                    </h3>
                    <p>{ele?.body}</p>
                  </div>
                  {/* update and delete buttons */}
                  <div className="flex items-center mt-2 w-[60%] gap-x-2">
                    <Link
                      to={`/update/${ele._id}`}
                      className="bg-green-500 py-2 px-4 rounded-xl hover:bg-black text-white cursor cursor-pointer"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => {
                        deleteNotes(ele._id);
                      }}
                      className="bg-red-500 py-2 px-4 rounded-xl hover:bg-black text-white cursor cursor-pointer"
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })
          : null}
        {/*end note div  */}
      </div>
    </section>
  );
}
