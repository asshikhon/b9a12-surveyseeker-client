import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns'; // Import format function
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { Helmet } from "react-helmet-async";

const SurveyorSurveys = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: surveys = [], isLoading } = useQuery({
        queryKey: ['surveys', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/votes/${user?.email}`);
            return data;
        }
    });

    console.log(surveys);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href={``} />
                <title>Survey Response || Dashboard</title>
            </Helmet>
            <div className="my-4 bg-[#333333] rounded-xl mt-12 py-4 text-center text-lg text-orange-500 font-bold">
                <h2 className="mr-2">Here Is All Surveys Response</h2>
            </div>

            <div className="overflow-x-auto p-4 md:p-10">
                <table className="table table-zebra">
                    <thead className="text-white bg-orange-500">
                        <tr>
                            <th>#</th>
                            <th>_ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Creation Time</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey, index) => (
                            <tr key={survey._id}>
                                <th>{index + 1}</th>
                                <td>_Id = {survey?._id}</td>
                                <td>{survey?.title}</td>
                                <td>{survey?.category}</td>
                                <td>{survey?.timestamp ? format(new Date(survey.timestamp), 'PPpp') : 'N/A'}</td>
                                <td>
                                    <Link to={`/dashboard/response/${survey?._id}`} className="">
                                        <button className="btn">
                                            <TbListDetails className="text-blue-500 text-xl font-bold" />
                                        </button>
                                    </Link>
                                </td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyorSurveys;
