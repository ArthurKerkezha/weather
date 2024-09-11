import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { ErrorPage } from "../pages";
import { Place } from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "place/:placeId",
        element: <Place />,
      },
    ],
  },
]);
