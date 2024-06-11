import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import vote from "../../assets/images/vote.png";
import useProUser from "../../hooks/useProUser";

const Vote = () => {
  const survey = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [voteOption, setVoteOption] = useState("");
  const axiosSecure = useAxiosSecure();
  const [isProUser] = useProUser();

  const { mutateAsync } = useMutation({
    mutationFn: async (voteSurveyData) => {
      const { data } = await axiosSecure.post(`/votes`, voteSurveyData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top",
        icon: "success",
        title: `${user?.displayName} Send Your Vote Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/surveys");
    },
  });

  const {
    _id,
    title,
    description,
    option,
    category,
    deadline,
    status,
    surveyor,
    timestamp,
  } = survey || {};

  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment ? form.comment.value : "";
    const voter_email = user?.email;
    const voter_name = user?.displayName;
    const voter_image = user?.photoURL;
    const totalVote = parseInt(survey?.voteCount);
    const voteCount = parseInt(0);
    const voter = {
      voter_email,
      voter_name,
      voter_image,
    };

    try {
      const voteSurveyData = {
        voteId: _id,
        voter,
        voteOption,
        comment,
        voteCount,
        title,
        description,
        option,
        category,
        deadline,
        status,
        surveyor,
        timestamp,
        totalVote,
      };

      console.log("Survey Data:", voteSurveyData);

      // Post data in backend
      await mutateAsync(voteSurveyData);

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-full mt-12 md:20 lg:mt-24">
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={vote} />
        <title>SurveySeeker || Vote</title>
      </Helmet>

      <div className="">
        <div className="container text-black bg-[#faeee0] max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-2xl">
          <div className="mt-3">
            <h2 className="text-2xl font-bold hover:underline">{category}</h2>
          </div>

          <h3 className="text-xl font-semibold my-3">
            Are you positive about the above?
          </h3>

          <div className="mt-16">
            <form onSubmit={handleVoteSubmit}>
              <div className="flex gap-12">
                <div className="flex items-center gap-1">
                  <label className="text-lg font-semibold" htmlFor="yes">
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="yes"
                    name="option"
                    value="yes"
                    checked={voteOption === "yes"}
                    onChange={(e) => setVoteOption(e.target.value)}
                    className="mt-[2px] "
                  />
                </div>
                <br />
                <div className="flex items-center gap-1">
                  <label className="text-lg font-semibold" htmlFor="no">
                    No
                  </label>
                  <input
                    type="radio"
                    id="no"
                    name="option"
                    value="no"
                    checked={voteOption === "no"}
                    onChange={(e) => setVoteOption(e.target.value)}
                    className="mt-[2px] "
                  />
                </div>
              </div>
              {isProUser ? (
                <div className="mt-8">
                  <label className="text-lg font-semibold" htmlFor="comment">
                    Add Your Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    placeholder="Bio"
                    className="textarea text-blue-500 textarea-bordered row-span-2 w-full"
                  ></textarea>
                </div>
              ) : (
                <div className="mt-8 text-lg font-semibold">
                  Only Pro User Can Comment Here...
                </div>
              )}

              <br />
              <input
                type="submit"
                value="Submit"
                className="btn bg-green-500 text-white text-lg border-0 rounded-xl "
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
