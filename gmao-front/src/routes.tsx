import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Test from "./pages/Test/Test";
import Login from "./pages/Login/Login";

const Token = localStorage.getItem("Token");
const router = createBrowserRouter(
  [
    Token
      ? {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "surveillance",
              children: [
                {
                  path: "calendrier",
                  element: <Test />,
                },
              ],
            },
            {
              path: "charge",
              children: [
                {
                  path: "gestion-diplomes",
                  element: <Test />,
                },
              ],
            },
          ],
        }
      : {
          path: "/",
          element: <Login />,
          //errorElement: <ErrorPage />,
          children: [],
        },
  ],
  {
    // Todo: remove this when ready to deploy to production
    basename: "/gmao-front",
  }
);

export default router;
