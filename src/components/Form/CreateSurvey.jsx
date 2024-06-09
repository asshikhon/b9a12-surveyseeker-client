import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Pages/Shared/LoadingSpinner";
import logo from "../../assets/images/add.png";
import { Helmet } from "react-helmet-async";

const CreateSurvey = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("no"); 
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const categories = [
    "Customer Satisfaction",
    "Employee Feedback",
    "Market Research",
    "Product Feedback",
    "Event Planning",
  ];

  const surveyor = user ? {
    name: user.displayName,
    image: user.photoURL,
    email: user.email,
  } : {};

  const { mutateAsync } = useMutation({
    mutationFn: async surveyData => {
      const { data } = await axiosSecure.post(`/surveys`, surveyData);
      return data;
    },
    onSuccess: () => {
      console.log('Survey Created Successfully');
      toast.success("Survey Created Successfully");
      setTitle("");
      setDescription("");
      setOption("no"); 
      setCategory("");
      setDeadline("");
      navigate('/dashboard/surveyor-surveys');
    }
   
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const surveyData = {
        title,
        description,
        option: option === "yes" ? true : false,
        category,
        deadline,
        status: "publish", // default status
        timestamp: new Date().toISOString(),
        surveyor,
      };

      console.log("Survey Data:", surveyData);

      // post data in backend
      await mutateAsync(surveyData);

    } catch (error) {
      toast.error(error.message);
    }
  };

  if (authLoading) {
    return <LoadingSpinner />; 
  }

  if (!user) {
    return <div>Please log in to create a survey.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 block ">
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={logo} />
        <title>Create Survey || Dashboard</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Create Survey</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled
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
          Create Survey
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;
