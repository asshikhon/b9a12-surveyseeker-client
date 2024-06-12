import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import "./Feedback.css"; // Import the CSS file

const Feedback = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [expandedFeedback, setExpandedFeedback] = useState(null);

  const {
    data: surveys = [],
    isLoading,
    
  } = useQuery({
    queryKey: ["surveys", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/${user?.email}`);
      return data;
    },
  });

  const toggleExpand = (index) => {
    setExpandedFeedback(expandedFeedback === index ? null : index);
  };

  const truncateText = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Filter the surveys to only include those with status 'unPublish'
  const unpublishedSurveys = surveys.filter(survey => survey.status === 'unPublish');

  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={``} />
        <title>Update || Dashboard</title>
      </Helmet>
      <div className="my-4 bg-[#333333] rounded-xl mt-12 py-4 text-center text-lg text-orange-500 font-bold">
        <h2 className="mr-2">Here Is Your UnPublish And Feedback All Surveys</h2>
      </div>
      <div className="overflow-x-auto p-4 md:p-10">
        <table className="table table-zebra">
          <thead className="text-white bg-orange-500">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Deadline</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {unpublishedSurveys.map((survey, index) => (
              <tr key={survey._id}>
                <th>{index + 1}</th>
                <td>{survey?.title}</td>
                <td>{survey?.category}</td>
                <td>{survey?.deadline}</td>
                <td
                  className={`cursor-pointer feedback-text ${expandedFeedback === index ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(index)}
                  onMouseEnter={() => setExpandedFeedback(index)}
                  onMouseLeave={() => setExpandedFeedback(null)}
                >
                  {expandedFeedback === index
                    ? survey?.feedback
                    : truncateText(survey?.feedback || '', 40)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
