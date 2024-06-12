import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Update = () => {
  const survey = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [option, setOption] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  
  const categories = [
    "Customer Satisfaction",
    "Employee Feedback",
    "Market Research",
    "Product Feedback",
    "Event Planning",
  ];

  useEffect(() => {
    if (survey) {
      setTitle(survey?.title);
      setOption(survey?.option);
      setDescription(survey?.description);
      setCategory(survey?.category);
      setDeadline(survey?.deadline);
    }
  }, [survey]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedSurvey = {
      title,
      option,
      description,
      category,
      deadline,
    };

    try {
      await axiosSecure.put(`/surveys/${survey._id}`, updatedSurvey);
      Swal.fire({
        position: "top",
        icon: "success",
        title: `${survey?.title || 'Survey'} Update SuccessFully`,
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/dashboard/survey-update");

    } catch (error) {
      // Handle error (e.g., show an error message)
      Swal.fire({
        position: "top",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="max-w-[45%] border rounded-xl p-10 mx-auto mt-12 md:mt-20 lg:mt-24">

<div className="my-4 bg-[#333333] rounded-xl py-4 text-center text-lg text-orange-500 font-bold">
          <h2 className="mr-2"> You Can Update Your Data </h2>
        </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Option</label>
          <div className="flex space-x-4 mt-1">
            <label className="flex items-center">
              <input
                type="radio"
                value="yes"
                checked={option === "yes"}
                onChange={(e) => setOption(e.target.value)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="no"
                checked={option === "no"}
                onChange={(e) => setOption(e.target.value)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg border-0 hover:bg-green-600"
        >
          Update Survey
        </button>
      </form>
    </div>
  );
};

export default Update;



