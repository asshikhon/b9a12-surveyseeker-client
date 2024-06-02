import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>


      <div className="min-h-[calc(100vh-373px)]">
        <Outlet></Outlet>
      </div>

      
    </div>
  );
};

export default Main;
