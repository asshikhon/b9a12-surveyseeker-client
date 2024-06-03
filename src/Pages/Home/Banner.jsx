import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import b1 from "../../assets/images/b1.jpg";
import b2 from "../../assets/images/b2.jpg";
import b3 from "../../assets/images/b3.jpg";
import b4 from "../../assets/images/b4.jpg";
import b5 from "../../assets/images/b5.jpg";

const Banner = () => {
  const images = [b1, b2, b3, b4, b5];
  const texts = [
    {
      title: "SurveySeeker Guides Your Journey to Informed Decision-Making.",
      description: "Unlock the power of data with SurveySeeker. Make informed decisions by seamlessly navigating and analyzing your survey results."
    },
    {
      title: "SurveySeeker Fuels Informed Decision-Making and Growth.",
      description: "Empower your growth with SurveySeeker. Make informed decisions effortlessly by leveraging insightful survey data and analytics tools."
    },
    {
      title: "Navigate, Analyze, and Implement Survey Data to Drive Meaningful Change.",
      description: "SurveySeeker helps you navigate, analyze, and implement survey data effectively, driving meaningful change and informed decisions."
    },
    {
      title: "Your Gateway to Understanding, Analyzing, and Leveraging Survey Responses.",
      description: "SurveySeeker is your gateway to understanding, analyzing, and leveraging survey responses for more informed and impactful decisions."
    },
    {
      title: "SurveySeeker Simplifies Survey Management and Analysis Efforts.",
      description: "SurveySeeker simplifies survey management and analysis, making it easier to gather insights and drive effective decision-making."
    }
  ];

  return (
    <Carousel infiniteLoop showThumbs={false}>
      {images.map((image, index) => (
        <div
          key={index}
          className="hero h-[400px] w-auto md:h-[550px] lg:h-[800px]"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            width: "100%"
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-center text-neutral-content">
            <div>
              <h1 className="mb-5 text-3xl md:text-4xl lg:text-6xl font-bold md:leading-[40px] lg:leading-[76px]">
                {texts[index].title}
              </h1>
              <p className="mb-5 md:px-12 font-medium">
                {texts[index].description}
              </p>
              <Link className="btn bg-orange-500 px-7 border-0 btn-primary text-white font-bold text-lg" to="/explore">
                Explore
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
