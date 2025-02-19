import { Navigate } from "react-router-dom";

export default function ProtectedRoutes(props) {
  // protect all routes with token
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
