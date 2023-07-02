import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import BonTravail from "./pages/BonTravail/BonTravail";
import Login from "./pages/Login/Login";

import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import DemandeIntervention from "./pages/DemandeIntervention/DemandeIntervention";
import Equipement from "./pages/Equipement/Equipement";
import PieceRechange from "./pages/PieceRechange/PieceRechange";
import BonApprovisionnement from "./pages/BonApprovisionnement/BonApprovisionnement";
import RedirectBonTravail from "./pages/BonTravail/RedirectBonTravail";
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
      {
        path: "demande-intervention",
        element: <DemandeIntervention editMode={false} />,
      },
      {
        path: "redirect-bon",
        element: <RedirectBonTravail />,
      },
    ],
  },
  {
    path: "equipement",
    children: [
      {
        path: "",
        element: <Equipement editMode={false} />,
      },
      {
        path: "bon-approvisionnement",
        element: <BonApprovisionnement editMode />,
      },
      {
        path: "piece-rechange",
        element: <PieceRechange editMode={false} />,
      },
    ],
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
        element: <BonTravail editMode={false} />,
      },
      {
        path: "demande-intervention",
        element: <DemandeIntervention editMode={false} />,
      },
    ],
  },
  {
    path: "equipement",
    children: [
      {
        path: "",
        element: <Equipement editMode={false} />,
      },
      {
        path: "bon-approvisionnement",
        element: <BonApprovisionnement editMode={false} />,
      },
      {
        path: "piece-rechange",
        element: <PieceRechange editMode={false} />,
      },
    ],
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
        path: "demande-intervention",
        element: <DemandeIntervention editMode />,
      },
      {
        path: "bon-travail",
        element: <BonTravail editMode={false} />,
      },
    ],
  },
  {
    path: "equipement",
    children: [
      {
        path: "",
        element: <Equipement editMode />,
      },
      {
        path: "bon-approvisionnement",
        element: <BonApprovisionnement editMode={false} />,
      },
      {
        path: "piece-rechange",
        element: <PieceRechange editMode={false} />,
      },
    ],
  },
];
const MagasinierChildren = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "equipement",
    children: [
      {
        path: "",
        element: <Equipement editMode />,
      },
      {
        path: "bon-approvisionnement",
        element: <BonApprovisionnement editMode={false} />,
      },
      {
        path: "piece-rechange",
        element: <PieceRechange editMode />,
      },
    ],
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
        element: <BonTravail editMode={false} />,
      },
      {
        path: "demande-intervention",
        element: <DemandeIntervention editMode={false} />,
      },
    ],
  },
  {
    path: "equipement",
    children: [
      {
        path: "",
        element: <Equipement editMode={false} />,
      },
      {
        path: "bon-approvisionnement",
        element: <BonApprovisionnement editMode={false} />,
      },
      {
        path: "piece-rechange",
        element: <PieceRechange editMode={false} />,
      },
    ],
  },
  {
    path: "users",
    children: [
      {
        path: "",
        element: <Equipement editMode={false} />,
      },
    ],
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

const Router = () => {
  const Token = localStorage.getItem("Token");
  const UserType = localStorage.getItem("UserType");
  return (
    <RouterProvider
      router={createBrowserRouter(
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
      )}
    />
  );
};

export default Router;
