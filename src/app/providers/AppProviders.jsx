import { Provider } from "react-redux";
import { store } from "../store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/router";

export function AppProviders() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
