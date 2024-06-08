import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logoHome from "../../assets/images/main.jpeg"
import { IoIosCreate } from "react-icons/io";
import { FaHome, FaThList } from "react-icons/fa";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogOut = () => {
    logOut();
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Logout Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/');
  }


  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
          <Link to="/" className="flex items-center">
          <img
            className="h-8 md:h-[80px] w-8 md:w-[70px] rounded-full"
            src={logoHome}
            alt=""
          />
          <p
            className="btn btn-ghost text-base md:text-3xl lg:text-4xl"
            style={{
              background: "linear-gradient(to right, tomato, black, orange)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SurveySeeker
          </p>
        </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-orange-400 mx-auto">
            <Link to="/" className="flex items-center">
          <img
            className="h-8 md:h-[40px] w-8 md:w-[38px] rounded-full"
            src={logoHome}
            alt=""
          />
          <p
            className="btn btn-ghost text-base md:text-xl"
            style={{
              background: "linear-gradient(to right, tomato, black, orange)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SurveySeeker
          </p>
        </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "text-base flex items-center px-4 py-2 my-5 font-semibold border border-orange-500 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white"
              : "text-base flex items-center px-4 py-2 my-5 z-[1] hover:bg-[#23BE0A] hover:text-white"
          }
        >
                <BsGraphUp className="w-5 h-5" />

                <span className="mx-4 font-medium">Statistics</span>
              </NavLink>

              {/* Add Room */}
              <NavLink
          to="survey-create"
          className={({ isActive }) =>
            isActive
              ? "text-base flex items-center px-4 py-2 my-5 font-semibold border border-orange-500 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white"
              : "text-base flex items-center px-4 py-2 my-5 z-[1] hover:bg-[#23BE0A] hover:text-white"
          }
        >
                <IoIosCreate  className="w-5 h-5" />

                <span className="mx-4 font-medium">Create Survey</span>
              </NavLink>
              {/* My Listing */}
              <NavLink
                to="surveyor-surveys"
                className={({ isActive }) =>
                    isActive
                      ? "text-base flex items-center px-4 py-2 my-5 font-semibold border border-orange-500 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white"
                      : "text-base flex items-center px-4 py-2 my-5 z-[1] hover:bg-[#23BE0A] hover:text-white"
                  }
                >
              
                <FaThList className="w-5 h-5" />

                <span className="mx-4 font-medium">My Surveys</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                      ? "text-base flex items-center px-4 py-2 my-5 font-semibold border border-orange-500 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white"
                      : "text-base flex items-center px-4 py-2 my-5 z-[1] hover:bg-[#23BE0A] hover:text-white"
                  }
                >
            <FaHome className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-base z-[1] hover:bg-[#23BE0A] hover:text-white"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
