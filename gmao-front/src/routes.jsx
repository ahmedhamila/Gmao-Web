import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import BonTravail from "./pages/BonTravail/BonTravail";
import Login from "./pages/Login/Login";

const Token = localStorage.getItem("Token");
const UserType = localStorage.getItem("UserType");
const ResponsableMaintenanceChildren = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "maintenance",
    children: [
      {
        path: "bon-travail",
        element: <BonTravail editMode />,
      },
    ],
  },
  {
    path: "charge",
    children: [],
  },
];
const AgentMaintenanceChildren = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "maintenance",
    children: [
      {
        path: "bon-travail",
        element: <BonTravail editMode={false} />,
      },
    ],
  },
  {
    path: "charge",
    children: [],
  },
];
const ResponsableProductionChildren = [
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
];
const ResponsableChaineProductionChildren = [
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
];
const MagasinierChildren = [
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
];
const AdministrateurChildren = [
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
];

const getChildrenByUserType = (UserType) => {
  switch (UserType) {
    case "ResponsableMaintenance": {
      return ResponsableMaintenanceChildren;
    }
    case "AgentMaintenance": {
      console.log("heloooo Agent");
      return AgentMaintenanceChildren;
    }
    case "ResponsableProduction": {
      return ResponsableProductionChildren;
    }
    case "ResponsableChaineProduction": {
      return ResponsableChaineProductionChildren;
    }
    case "Magasinier": {
      return MagasinierChildren;
    }
    case "Administrateur": {
      return AdministrateurChildren;
    }
    default:
      return [];
  }
};

const router = createBrowserRouter(
  [
    Token
      ? {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
          children: getChildrenByUserType(UserType),
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
