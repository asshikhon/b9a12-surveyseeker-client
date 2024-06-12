import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {  useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const ResPonseDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: survey = {}, isLoading } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/vote/${id}`);
      return data;
    },
  });




  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={``} />
        <title>Response Details || Dashboard</title>
      </Helmet>
      <div className="my-4 bg-[#333333] rounded-xl mt-12 py-4 text-center text-lg text-orange-500 font-bold">
        <h2 className="mr-2">Here Is All Surveys Response</h2>
      </div>

      <div className="overflow-x-auto p-4 md:p-10">
        <table className="table table-zebra">
          <thead className="text-white bg-orange-500">
            <tr>
            <th></th>
              <th>Serial No</th>
              <th>User Email</th>
              <th>User Name</th>
              <th>Vote</th>

            </tr>
          </thead>
          <tbody>
          
              <tr>
                <th></th>
                <td>{1}</td>
                <td>{survey?.voter?.voter_email}</td>
                <td>{survey?.voter?.voter_name}</td>
                <td>
                {survey?.totalVote + 1}
                </td>

                <td></td>
              </tr>
         
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResPonseDetails;
