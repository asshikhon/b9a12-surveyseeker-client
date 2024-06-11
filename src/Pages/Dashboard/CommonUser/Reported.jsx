import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Reported = () => {
    const {user} = useAuth();
const axiosSecure = useAxiosSecure();

const {data: surveys = [], isLoading} = useQuery({
queryKey: ['surveys', user?.email],
queryFn: async () =>{
const {data} = await axiosSecure.get(`/reported/${user?.email}`)
return data;
}

})
console.log(surveys);
if(isLoading){
    return <LoadingSpinner />
}

    return (
        <div>
            
        </div>
    );
};

export default Reported;