import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import b1 from "../../assets/images/b1.jpg";
import { Link } from "react-router-dom";
import b2 from "../../assets/images/b2.jpg";
import b3 from "../../assets/images/b3.jpg";
import b4 from "../../assets/images/b4.jpg";
import b5 from "../../assets/images/b5.jpg";

const Banner = () => {
  return (
    <Carousel infiniteLoop>
      {/* b1 */}
      <div
        className="hero h-[400px] w-auto md:h-[550px] lg:h-[800px]"
        style={{
          backgroundImage: `url(${b1})`,
          backgroundSize: "cover",
          width: "full",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-neutral-content">
          <div>
            <h1 className="mb-5 text-3xl md:text-4xl lg:text-6xl font-bold md:leading-[40px]  lg:leading-[76px]">
            SurveySeeker Guides Your Journey to Informed Decision-Making.
            </h1>
            <p className="mb-5 md:px-12 font-medium ">
            Unlock the power of data with SurveySeeker. Make informed decisions by seamlessly navigating and analyzing your survey results.
            </p>
            <Link className="btn bg-orange-500 px-7 border-0 btn-primary text-white font-bold text-lg">
              Explore
            </Link>
          </div>
        </div>
      </div>
      {/* b2 */}
      <div
        className="hero h-[400px] w-auto md:h-[550px] lg:h-[800px]"
        style={{
          backgroundImage: `url(${b2})`,
          backgroundSize: "cover",
          width: "full",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-neutral-content">
          <div>
            <h1 className="mb-5 text-3xl md:text-4xl lg:text-6xl font-bold md:leading-[40px]  lg:leading-[76px]">
            SurveySeeker Fuels Informed Decision-Making and Growth.
            </h1>
            <p className="mb-5 md:px-12 font-medium ">
            Empower your growth with SurveySeeker. Make informed decisions effortlessly by leveraging insightful survey data and analytics tools.
            </p>
            <Link className="btn bg-orange-500 px-7 border-0 btn-primary text-white font-bold text-lg">
              Explore
            </Link>
          </div>
        </div>
      </div>
      {/* b3 */}
      <div
        className="hero h-[400px] w-auto md:h-[550px] lg:h-[800px]"
        style={{
          backgroundImage: `url(${b3})`,
          backgroundSize: "cover",
          width: "full",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-neutral-content">
          <div>
            <h1 className="mb-5 text-3xl md:text-4xl lg:text-6xl font-bold md:leading-[40px]  lg:leading-[76px]">
            Navigate, Analyze, and Implement Survey Data to Drive Meaningful Change.
            </h1>
            <p className="mb-5 md:px-12 font-medium ">
            SurveySeeker helps you navigate, analyze, and implement survey data effectively, driving meaningful change and informed decisions.
            </p>
            <Link className="btn bg-orange-500 px-7 border-0 btn-primary text-white font-bold text-lg">
              Explore
            </Link>
          </div>
        </div>
      </div>
      {/* b4 */}
      <div
        className="hero h-[400px] w-auto md:h-[550px] lg:h-[800px]"
        style={{
          backgroundImage: `url(${b4})`,
          backgroundSize: "cover",
          width: "full",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-neutral-content">
          <div>
            <h1 className="mb-5 text-3xl md:text-4xl lg:text-6xl font-bold md:leading-[40px]  lg:leading-[76px]">
            Your Gateway to Understanding, Analyzing, and Leveraging Survey Responses.
            </h1>
            <p className="mb-5 md:px-12 font-medium ">
            SurveySeeker is your gateway to understanding, analyzing, and leveraging survey responses for more informed and impactful decisions.
            </p>
            <Link className="btn bg-orange-500 px-7 border-0 btn-primary text-white font-bold text-lg">
              Explore
            </Link>
          </div>
        </div>
      </div>
      {/* b5 */}
      <div
        className="hero h-[400px] w-auto md:h-[550px] lg:h-[800px]"
        style={{
          backgroundImage: `url(${b5})`,
          backgroundSize: "cover",
          width: "full",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-neutral-content">
          <div>
            <h1 className="mb-5 text-3xl md:text-4xl lg:text-6xl font-bold md:leading-[40px]  lg:leading-[76px]">
            SurveySeeker Simplifies Survey Management and Analysis Efforts.
            </h1>
            <p className="mb-5 md:px-12 font-medium ">
            SurveySeeker simplifies survey management and analysis, making it easier to gather insights and drive effective decision-making.
            </p>
            <Link className="btn bg-orange-500 px-7 border-0 btn-primary text-white font-bold text-lg">
              Explore
            </Link>
          </div>
        </div>
      </div>


    </Carousel>
  );
};

export default Banner;
