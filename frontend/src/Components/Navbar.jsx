import { useContext, useState } from "react";
import { FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();

  let { userToken, setuserToken } = useContext(UserContext);

  // logout function
  function logOut() {
    setuserToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="w-[80%] mx-auto mt-2">
      {/* start main div */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-7">
        {/* start brand */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link
            className="hover:text-black text-red-600 text-3xl font-bold"
            to="/"
          >
            {" "}
            <FaBook size={45} className="mr-2 inline-block" /> Todo
          </Link>
          {/* start menu button */}
          <button
            className="md:hidden focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {/* end menu button */}
        </div>
        {/* end brand */}

        {/* start side */}
        <div
          className={`w-full md:w-auto md:flex items-center transition duration-1000 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex gap-x-1 items-center mt-8 mb-8 max-md:w-[60%]">
            {userToken !== null ? (
              <>
                {" "}
                <li>
                  <Link
                    className="hover:underline underline-offset-2 px-3"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:underline underline-offset-2 px-3"
                    to="about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:underline underline-offset-2 px-3"
                    to="todo"
                  >
                    Todo
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    onClick={() => {
                      logOut();
                    }}
                    className="bg-red-600 px-3 py-2 text-white rounded-2xl font-bold hover:bg-black"
                    to=""
                  >
                    LogOut
                  </Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link
                    className="hover:underline underline-offset-2 px-3"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:underline underline-offset-2 px-3"
                    to="about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-red-600 px-3 py-2 text-white rounded-2xl font-bold hover:bg-black"
                    to="signup"
                  >
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-red-600 px-3 py-2 text-white rounded-2xl font-bold hover:bg-black"
                    to="login"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* end side */}
      </div>
      {/* end main div */}
    </nav>
  );
};

export default Navbar;