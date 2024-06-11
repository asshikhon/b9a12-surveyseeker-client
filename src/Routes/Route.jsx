import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/Home/ContactUs";
import Surveys from "../Pages/Home/Surveys";
import Pricing from "../Pages/Home/Pricing";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashboardLayout from "../Layouts/DashboardLayout";
import Statistics from "../Pages/Dashboard/Common/Statistics";
import SurveyCreation from "../Pages/Dashboard/Surveyor/SurveyCreation";
import SurveyorSurveys from "../Pages/Dashboard/Surveyor/SurveyorSurveys";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import Commented from "../Pages/Dashboard/ProUser/Commented";
import Participate from "../Pages/Dashboard/CommonUser/Participate"
import PrivateRoute from "./PrivateRoute";
import Vote from "../Pages/Vote/Vote";
import Reported from "../Pages/Dashboard/CommonUser/Reported";
import Payment from "../Pages/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/survey/:id",
        element: <SurveyDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/survey/${params.id}`),
      },
      {
        path: "/votes/:id",
        element: (
          <PrivateRoute>
            <Vote />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/survey/${params.id}`),
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/payments",
        element: <Payment />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: '/signup', element: <SignUp /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
path: '/dashboard',
element: <Statistics />,

    },
      {
path: 'survey-create',
element: <SurveyCreation />,

    },
      {
path: 'all-user',
element: <AllUsers />,

    },
      {
path: 'surveyor-surveys',
element: <SurveyorSurveys />,

    },
      {
path: 'comments',
element: <Commented />,

    },
      {
path: 'participate',
element: <Participate />,

    },
      {
path: 'reported',
element: <Reported />,

    },
  
  ],
  }
]);
