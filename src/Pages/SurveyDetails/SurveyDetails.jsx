import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { format } from "date-fns"; // Importing format from date-fns
import details from "../../assets/images/details.png"
import { Helmet } from "react-helmet-async";

import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useState } from 'react'
  import { useNavigate } from "react-router-dom";
  import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useSurveyor from "../../hooks/useSurveyor";


const SurveyDetails = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin] = useAdmin();
  const [isSurveyor] = useSurveyor();


  const { data: survey = {}, isLoading } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/survey/${id}`);
      return data;
    },
  });

  const {
    _id,
    title,
    description,
    option,
    category,
    deadline,
    status,
    surveyor,
    timestamp,
  } = survey || {};



  
const handleOpen = () => {
    if(!user){
      navigate("/login");
      return toast.error("Please login to add gallery");
    }
  open()
  }
  
  
    function open() {
      setIsOpen(true);
    }
  
    function close() {
      setIsOpen(false);
    }
  

    const handleAddReport = async (e) => {
        e.preventDefault();
        const form = e.target;
        const userName = user ? user.displayName : "";
        const userEmail = user ? user.email : "";
        const feedback = form.description.value;
        const totalVote = parseInt(survey?.voteCount);
        const newData = {
          userName,
          userEmail,
          feedBack: feedback,
          surveyId: _id,
          title,
          option,
          category,
          deadline,
          status,
          surveyor,
          timestamp,
          totalVote,
          description,
        };
    
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          });
          const data = await response.json();
          if (data.insertedId) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: `${user?.displayName} Send Your Report SuccessFully`,
                showConfirmButton: false,
                timer: 1500
              });
 
        }
          navigate("/surveys");
        //   navigate("/dashboard");
          setIsOpen(false);
        } catch (error) {
          console.error("Error adding gallery:", error);
        }
      };


  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Convert the timestamp to a local string format
  const formattedTimestamp = timestamp
    ? format(new Date(timestamp), "PPp")
    : "";

  return (
    <div className="w-full h-full mt-12 md:20 lg:mt-24 ">

<Helmet>
          <link rel="icon" type="image/svg+xml" href={details} />
          <title>Details-{_id}</title>
        </Helmet>

      <div className=" ">
        <div className="container text-black bg-[#f4faf4] max-w-6xl px-10 py-6 mx-auto rounded-lg shadow-xl ">
          <div className="flex items-center justify-between">
            <span className="text-sm ">{formattedTimestamp}</span>
            <p
              rel="noopener noreferrer"
              href="#"
              className=" bg-orange-500 p-2 px-4 text-white  font-bold rounded-xl "
            >
              Status : {status}
            </p>
          </div>
          <div className="mt-3">
            <h2
              rel="noopener noreferrer"
              href="#"
              className="text-2xl font-bold hover:underline"
            >
              {title}
            </h2>
            <p className="mt-2">{description}</p>
          </div>

          <h3 className="text-xl font-semibold my-3">Category : {category}</h3>
          <h3 className="text-xl text-red-500 font-semibold my-3">
            DeadLine : {deadline}
          </h3>
          <h3 className="text-xl text-green-700 font-semibold my-3">
            Total Vote Count : {survey?.voteCount || 0}
          </h3>
          <div className="flex items-center justify-between mt-4">
{  isAdmin || isSurveyor ? <Link 

            to={`/votes/${_id}`}
            className="btn bg-green-500 text-white text-lg border-0 rounded-xl" disabled>
              Vote Now
            </Link> :             <Link 
            to={`/votes/${_id}`}
            className="btn bg-green-500 text-white text-lg border-0 rounded-xl">
              Vote Now
            </Link>}
            <div>
{/* modal */}
<div className="{`w-full h-full mt-12 md:20 lg:mt-24 ${isOpen ? 'backdrop-blur' : ''}, `}">
        <>
         { isAdmin || isSurveyor ? <Button
            onClick={handleOpen}
            className="rounded-md btn bg-red-500 py-2 border-0 px-4 font-semibold text-lg text-white focus:outline-none  hover:bg-black/30 focus:outline-white"
            disabled
          >
            Report 
          </Button> : <Button
            onClick={handleOpen}
            className="rounded-md btn bg-red-500 py-2 border-0 px-4 font-semibold text-lg text-white focus:outline-none  hover:bg-black/30 focus:outline-white"
          >
            Report 
          </Button>}

          <Transition appear show={isOpen}>
            <Dialog
              as="div"
              className="relative z-10 focus:outline-none"
              onClose={close}
              __demoMode
            >
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                      <DialogTitle
                        as="h3"
                        className="text-2xl font-bold text-center text-red-500"
                      >
                        Report Now
                      </DialogTitle>
                      <form onSubmit={handleAddReport} className="">
                        <div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-base  font-semibold">
                                User Name
                              </span>
                            </label>
                            <input
                              value={user ? user.displayName : ""}
                              readOnly
                              type="text"
                              name="name"
                              placeholder="User Name"
                              className="input input-bordered"
                              required
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-base font-semibold">
                                Feedback
                              </span>
                            </label>
                            <textarea
                              placeholder="Feedback"
                              name="description"
                              className="textarea textarea-bordered row-span-2 w-full"
                              required
                            ></textarea>
                          </div>
                          <input
                            type="submit"
                            value="Send Report"
                            className="btn w-full mt-5 bg-red-600 text-base text-white border-0 rounded-md border-[#331A15]"
                          />
                        </div>
                      </form>
                      <div className="mt-4">
                        <Button
                          className="btn text-white bg-blue-600 border-0 text-lg px-8 btn-sm block mx-auto"
                          onClick={close}
                        >
                          Close
                        </Button>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
