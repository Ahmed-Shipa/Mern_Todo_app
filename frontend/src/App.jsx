import About from "./Components/About";
import Home from "./Components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Mlayout from "./Components/Mlayout";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Todo from "./Components/Todo";
import { Toaster } from "react-hot-toast";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import { useContext, useEffect } from "react";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import UpdateNote from "./Components/UpdateNote";

export default function App() {
  let { setuserToken } = useContext(UserContext);

  // confirm token is present in context after loading
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setuserToken(localStorage.getItem("token"));
    }
  }, []);

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Mlayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              {" "}
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoutes>
              {" "}
              <About />
            </ProtectedRoutes>
          ),
        },
        {
          path: "todo",
          element: (
            <ProtectedRoutes>
              {" "}
              <Todo />
            </ProtectedRoutes>
          ),
        },
        { path: "signup", element: <SignUp /> },
        { path: "login", element: <Login /> },
        { path: "update/:id", element: <UpdateNote /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 90,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            padding: "20px",
          },
        }}
      />
    </>
  );
}
