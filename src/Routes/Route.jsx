import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/Home/ContactUs";
import Surveys from "../Pages/Home/Surveys";
import Pricing from "../Pages/Home/Pricing";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage />,
      children: [
        {
path: "/",
element: <Home />

        },
        {
path: "/surveys",
element: <Surveys />

        },
        {
path: "/pricing",
element: <Pricing />

        },
        {
path: "/contact",
element: <ContactUs />

        },
      ]
    },
  ]);