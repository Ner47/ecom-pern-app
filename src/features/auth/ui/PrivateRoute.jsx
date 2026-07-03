import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import {
  selectIsAuthenticated,
  selectAuthInitialized,
  selectAuthStatus,
} from "@/features/auth";

export function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const initialized = useSelector(selectAuthInitialized);
  const status = useSelector(selectAuthStatus);
  const location = useLocation();

  if (!initialized || status === "loading") {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
