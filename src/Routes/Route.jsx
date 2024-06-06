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
        path: "/pricing",
        element: <Pricing />,
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
path: 'surveyor-surveys',
element: <SurveyorSurveys />,

    },
  
  ],
  }
]);
