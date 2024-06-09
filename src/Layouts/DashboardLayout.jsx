import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import logo from "../assets/images/dasboard.png"
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {



    return (
        <div className="relative min-h-screen md:flex">

<Helmet>
        <link rel="icon" type="image/svg+xml" href={logo} />
        <title>SurveySeeker || Dashboard</title>
      </Helmet>

            {/* sidebar */}
            <Sidebar />
            {/* outlet -> dynamic content */}
            <div className="flex-1 md:ml-64">
           <div className="p-5">
           <Outlet />
           </div>
            </div>

        </div>
    );
};

export default DashboardLayout;