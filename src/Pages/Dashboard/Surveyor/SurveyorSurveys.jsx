import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const SurveyorSurveys = () => {

    const {user} = useAuth();
const axiosSecure = useAxiosSecure();

const {data: surveys = [], isLoading} = useQuery({
queryKey: ['surveys', user?.email],
queryFn: async () =>{
const {data} = await axiosSecure.get(`/surveys/${user?.email}`)
return data;
}

})

console.log(surveys);

if(isLoading){
    return <LoadingSpinner />
}


    return (
        <div>
            <p>{surveys.length}</p>
        </div>
    );
};

export default SurveyorSurveys;