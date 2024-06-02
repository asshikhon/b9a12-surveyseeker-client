/* eslint-disable react/no-unescaped-entities */
import { FaSearch } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { RiQuestionnaireLine } from "react-icons/ri";

const Faq = () => {
  return (
<div

>
      <div className="flex container flex-col md:flex-row gap-[5%] items-center py-12 md:py-16 lg:py-20 w-[94%] md:w-full mx-auto bg-base-100 px-4 md:px-12 rounded-3xl my-12">
        <div className="w-full">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
            Frequently Asked Questions
          </h1>
          <div className="flex flex-col mt-12 gap-6">
            <div className="flex gap-6 bg-base-200 p-4 justify-center rounded-xl items-center">
              <p className="text-7xl">
                <RiQuestionnaireLine />
              </p>
              <p className="flex flex-col">
                <span className="text-xl md:text-2xl font-semibold pb-1">
                  Contact live chat
                </span>
                <span className="text-base md:text-lg">
                  24/7 available. No chat bots
                </span>
              </p>
            </div>
            <div className="flex gap-6 bg-base-200 p-4 justify-center rounded-xl items-center">
              <p className="text-5xl">
                <FaSearch />
              </p>
              <p className="flex flex-col">
                <span className="text-xl md:text-2xl font-semibold pb-1">
                  Visit Help Center
                </span>
                <span className="text-base md:text-lg">
                  Check out tutorials
                </span>
              </p>
            </div>
            <div className="flex gap-6 bg-base-200 p-4 justify-center rounded-xl items-center">
              <p className="text-5xl">
                <IoCallOutline />
              </p>
              <p className="flex flex-col">
                <span className="text-xl md:text-2xl font-semibold pb-1">
                  Call & Talk With Us
                </span>
                <span className="text-base md:text-lg">
                  1:1 talk with a specialist
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3 className="text-xl md:text-3xl font-semibold text-center py-4">
              Here are some common questions from our users.
            </h3>
          </div>
          <div className="join join-vertical w-full">
            <div className="collapse collapse-plus join-item border border-base-300">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl md:text-3xl font-medium">
                What is Survey?
              </div>
              <div className="collapse-content">
                <p className="md:text-lg">
                A survey is a research method used for collecting data from a predefined group of respondents to gain information and insights on various topics of interest. Surveys are commonly used in fields such as market research, social science, and public health to gather quantitative and qualitative data.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl md:text-3xl font-medium">
                How can SurveySeeker help me with my surveys?
              </div>
              <div className="collapse-content">
                <p className="md:text-lg">
                  SurveySeeker offers a range of features including customizable survey templates, real-time data analytics, and advanced reporting tools. Whether you're conducting market research, gathering customer feedback, or evaluating employee satisfaction, SurveySeeker provides the resources you need to get meaningful insights.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl md:text-3xl font-medium">
                Is SurveySeeker suitable for all types of surveys?
              </div>
              <div className="collapse-content">
                <p className="md:text-lg">
                  Yes, SurveySeeker is versatile and suitable for a variety of survey types including academic research, business evaluations, customer satisfaction, and more. Our platform is designed to cater to the needs of individuals and organizations across different industries.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl md:text-3xl font-medium">
                Are the features on SurveySeeker free to use?
              </div>
              <div className="collapse-content">
                <p className="md:text-lg">
                  SurveySeeker offers a free plan that includes basic survey creation and data analysis features. For more advanced capabilities and additional resources, we offer premium plans that provide greater flexibility and functionality.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl md:text-3xl font-medium">
                How can I contribute to SurveySeeker?
              </div>
              <div className="collapse-content">
                <p className="md:text-lg">
                  SurveySeeker welcomes contributions from survey experts, researchers, and enthusiasts. If you have valuable insights, templates, or resources to share, please reach out to our team. Together, we can enhance the platform and provide even better tools for our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
