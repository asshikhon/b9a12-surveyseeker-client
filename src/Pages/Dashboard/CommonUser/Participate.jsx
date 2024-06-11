import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Participate = () => {
    const {user} = useAuth();
const axiosSecure = useAxiosSecure();

const {data: surveys = [], isLoading} = useQuery({
queryKey: ['surveys', user?.email],
queryFn: async () =>{
const {data} = await axiosSecure.get(`/comments/${user?.email}`)
return data;
}

})
console.log(surveys);
if(isLoading){
    return <LoadingSpinner />
}
    return (
        <div className="mt-12 md:mt-20 lg:mt-24">


        <div className="my-4 bg-[#333333] rounded-xl py-4 text-center text-lg text-orange-500 font-bold">
          <h2 className="mr-2">Here Is Participate Surveys Lists Of {user?.displayName} </h2>
        </div>
  
        {/* card show */}
  
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {surveys.map((survey, index) => (
              <div
                key={index}
                className="card h-auto min-h-[270px] text-black bg-[#f0faf4]"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{survey.title}</h2>
                  <p>{survey?.description}</p>
                  <p className="text-lg font-semibold text-[#228B22]"> DeadLine : {survey?.deadline}</p>
                  
                  <h3 className="text-[#5C4033] text-lg ">
                    Total Vote Count: ({survey?.totalVote + 1 || 0})
                  </h3>
                </div>
                {/* <Link to={`/survey/${surveys?._id}`}>
                  <button className="btn bg-orange-500 text-white border-0 text-center block rounded-xl text-base mb-6 mx-auto">
                    View Details
                  </button>
                </Link> */}
              </div>
            ))}
          </div>
  
  
      </div>
    );
};

export default Participate;