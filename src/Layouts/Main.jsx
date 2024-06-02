import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>


      <div className="min-h-[calc(100vh-273px)]">
        <Outlet></Outlet>
      </div>

      <Footer />
    </div>
  );
};

export default Main;
