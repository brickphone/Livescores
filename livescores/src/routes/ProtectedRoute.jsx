import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // check if user is authenticated
  if (!token) {
    // if not authenticated redirect to home page

    return <Navigate to={"/"} />;
  }

  // if authenticated render the child routes
  return <Outlet />
};