import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

const SurveyUpdate = () => {
    const {user} = useAuth();
const axiosSecure = useAxiosSecure();

const {data: surveys = [], isLoading, refetch} = useQuery({
queryKey: ['surveys', user?.email],
queryFn: async () =>{
const {data} = await axiosSecure.get(`/surveys/${user?.email}`)
return data;
}

})


const handleDeleteItem = (survey) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/survey/${survey._id}`);
        if (res.data.deletedCount > 0) {
          // refetch to update the ui
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${survey?.title || 'Survey' } has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };


console.log(surveys);
if(isLoading){
    return <LoadingSpinner />
}

    return (
        <div>
        <Helmet>
          <link rel="icon" type="image/svg+xml" href={``} />
          <title>Update || Dashboard</title>
        </Helmet>
        <div className="my-4 bg-[#333333] rounded-xl mt-12 py-4 text-center text-lg text-orange-500 font-bold">
            <h2 className="mr-2">Here Is Your Created All Surveys</h2>
          </div>
  
        <div className="overflow-x-auto p-4 md:p-10">
          <table className="table table-zebra">
            <thead className="text-white bg-orange-500">
              <tr>
                <th>#</th>
                <th>_ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((survey, index) => (
                <tr key={survey._id}>
                  <th>{index + 1}</th>
                  <td>_Id = {survey?._id}</td>
                  <td>{survey?.title}</td>
                  <td>{survey?.category}</td>
                  <td>{survey.deadline}</td>
                  <td>
                    <Link className="">
                    <button className="btn">
                    <GrUpdate className="text-green-500 text-xl font-bold" />
                    </button>
                    </Link>
                    </td>
                  <td>
                   
                    <button
                     onClick={() => handleDeleteItem(survey)}
                    className="btn">
                    <RiDeleteBin6Fill className="text-red-500 text-xl font-bold" />
                    </button>
                  
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default SurveyUpdate;