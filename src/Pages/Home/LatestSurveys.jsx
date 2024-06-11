/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const LatestSurveys = () => {
  const { loading } = useAuth();
  const axiosCommon = useAxiosCommon();

  const [sort, setSort] = useState("timestamp_DESC"); // Default sorting

  const fetchSurveys = async ({ queryKey }) => {
    const [, sort] = queryKey;
    const { data } = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/surveys?sort=${sort}`);
    return data;
  };

  const { data: latest = [], isLoading, isError, error } = useQuery({
    queryKey: ["latestSurveys", sort],
    queryFn: fetchSurveys,
    keepPreviousData: true,
  });

  if (isLoading || loading) {
    return <LoadingSpinner className="text-center h-screen mx-auto block" />;
  }

  if (isError) {
    return <div>Error fetching surveys: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-12 md:mt-16 lg:mt-24">
      <div className="text-center mb-12 ">
        <h2 className="text-5xl font-bold mb-4">Latest Surveys</h2>
        <p className="text-lg font-semibold w-[70%] text-center block mx-auto">
          Stay up-to-date with the freshest surveys just added to our platform. Be the first to voice your opinion on the latest topics and trends. Don't miss out on the newest insights – participate now!
        </p>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latest.map((survey, index) => (
            <div
              key={index}
              className="card h-auto min-h-[270px] text-black bg-[#f0faf4]"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{survey.title}</h2>
                <p>{survey.description}</p>
                <h3 className="text-[#5C4033] text-lg ">
                  Total Vote Count: ({survey?.voteCount || 0})
                </h3>
              </div>
              <Link to={`/survey/${survey?._id}`}>
                <button className="btn bg-orange-500 text-white border-0 text-center block rounded-xl text-base mb-6 mx-auto">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link
          to="/surveys"
          className="btn h-auto w-[20%] bg-orange-500 border-0 text-center text-white text-lg flex justify-center items-center"
        >
          See All Surveys
        </Link>
      </div>
    </div>
  );
};

export default LatestSurveys;
