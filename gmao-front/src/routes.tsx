import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import BonTravail from "./pages/BonTravail/BonTravail";
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
              element: <Dashboard />,
            },
            {
              path: "maintenance",
              children: [
                {
                  path: "bon-travail",
                  element: <BonTravail />,
                },
              ],
            },
            {
              path: "charge",
              children: [],
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
