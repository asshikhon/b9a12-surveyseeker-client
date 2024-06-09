/* eslint-disable react/no-unescaped-entities */
const HowItWorks = () => {
  return (
    <section className="mt-12 md:mt-20">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">
          How It Works
        </h2>
        <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
          <div>
            <h3 className="font-semibold">Step 1: Create Your Survey</h3>
            <p className="mt-1 text-gray-400 dark:text-gray-600">
              Start by signing up and creating an account. Once you're logged
              in, you can easily create a new survey using our intuitive survey
              builder. Customize your questions, add various types of question
              formats, and set up the logic that suits your needs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Step 2: Distribute Your Survey</h3>
            <p className="mt-1 text-gray-400 dark:text-gray-600">
              Share your survey with your target audience. SurveySeeker offers
              multiple distribution options including email invitations, social
              media sharing, and direct links. Reach your respondents wherever
              they are.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Step 3: Collect Responses</h3>
            <p className="mt-1 text-gray-400 dark:text-gray-600">
              As responses come in, you can monitor the progress in real-time.
              Our platform ensures secure and anonymous data collection, giving
              you confidence in the integrity of the results.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Step 4: Categorize Responses</h3>
            <p className="mt-1 text-gray-400 dark:text-gray-600">
              Organize the responses based on predefined criteria or tags.
              Categorization helps in better understanding and analyzing the
              data by grouping similar responses together.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Step 5: Enable Voting</h3>
            <p className="mt-1 text-gray-400 dark:text-gray-600">
              Set up voting mechanisms where respondents can vote on different
              survey questions or options. This interactive feature can provide
              additional insights and engagement.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Step 6: Analyze Results</h3>
            <p className="mt-1 text-gray-400 dark:text-gray-600">
              Use our powerful analytics tools to gain insights from your data.
              Visualize the results with charts and graphs, filter responses,
              and generate reports. Make data-driven decisions with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
