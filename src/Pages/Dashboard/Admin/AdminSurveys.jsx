import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { FaExchangeAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AdminSurveys = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [feedback, setFeedback] = useState("");
  const [currentSurvey, setCurrentSurvey] = useState(null);

  const fetchAllSurveys = async () => {
    try {
      const { data } = await axiosSecure.get("/surveys");
      return data;
    } catch (error) {
      console.error("Error fetching surveys:", error);
      return [];
    }
  };

  const { data: surveys = [], isLoading } = useQuery({
    queryKey: ["surveys"],
    queryFn: fetchAllSurveys,
  });

  const mutation = useMutation({
    mutationFn: ({ id, newStatus, feedback }) =>
      axiosSecure.put(`/surveys/${id}/status`, { status: newStatus, feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries(["surveys"]);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Survey status updated successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      setFeedback("");
    },
    onError: (error) => {
      console.error("Failed to update survey status", error);
      toast.error("Failed to update survey status.");
    },
  });

  const handleStatusToggle = (survey) => {
    if (!feedback.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Feedback Required',
        text: 'Please provide feedback before submitting.',
      });
      return;
    }

    const newStatus = survey.status === "publish" ? "unPublish" : "publish";
    mutation.mutate({ id: survey._id, newStatus, feedback });
    setFeedback("");
    setCurrentSurvey(null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-12 md:mt-20 lg:mt-24 max-w-7xl mx-auto">
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={``} />
        <title>All Surveys || Dashboard</title>
      </Helmet>

      <div className="my-4 mb-16 bg-[#333333] rounded-xl py-4 text-center text-lg text-orange-500 font-bold">
        <h2 className="mr-2">Here Is All Surveys List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Change Status and Send Feedback</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{survey?.title}</td>
                <td className="py-2 px-4">{survey?.category}</td>
                <td className="py-2 px-4">
                  <span
                    className={`font-semibold ${
                      survey?.status === "publish"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {survey?.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="btn flex justify-center ml-16 items-center bg-[#F4FAF4] p-2 rounded"
                    onClick={() => setCurrentSurvey(survey)}
                  >
                    <FaExchangeAlt className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentSurvey && (
        <dialog open className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box w-full max-w-md p-6 bg-[#F4FAF4] rounded-lg shadow-lg">
            <h3 className="font-bold text-2xl mb-4">Send Your Feedback Here</h3>
            <textarea
              className="w-full border rounded p-2 mb-4 h-32"
              placeholder="Feedback"
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleStatusToggle(currentSurvey)}
                className={`py-2 px-4 rounded text-white ${
                  currentSurvey.status === "publish"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {currentSurvey.status === "publish" ? "UnPublish" : "Publish"}
              </button>
              <button
                className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => setCurrentSurvey(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AdminSurveys;
