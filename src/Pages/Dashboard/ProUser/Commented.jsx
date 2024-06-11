import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Commented = () => {
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
        <div>
            <h2 className="text-4xl">coming soon......</h2>
        </div>
    );
};

export default Commented;