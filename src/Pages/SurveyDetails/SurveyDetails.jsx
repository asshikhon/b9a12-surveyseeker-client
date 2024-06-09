import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner";

const SurveyDetails = () => {
    const {id} = useParams();
const axiosCommon = useAxiosCommon();


const {data: survey = {}, isLoading} = useQuery({
    queryKey: ['survey', id],
    queryFn: async () => {
        const {data} = await axiosCommon.get(`/survey/${id}`);
        return data;
    }
})

if (isLoading){
    return <LoadingSpinner />
}

console.log(survey);
// to={`/survey/${food._id}`}

    return (
        <div>
            
        </div>
    );
};

export default SurveyDetails;