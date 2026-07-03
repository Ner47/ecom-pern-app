import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routes/router";
import { useEffect } from "react";
import { getMe } from "@/features/auth";

function AuthBootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return children;
}

export function AppProviders() {
  return (
    <Provider store={store}>
      <AuthBootstrap>
        <RouterProvider router={router} />
      </AuthBootstrap>
    </Provider>
  );
}
