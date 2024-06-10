import { Helmet } from "react-helmet-async";
import logoHome from "../../assets/images/home.png";
import HowItWorks from "./HowItWorks";
import Faq from "./Faq";
import Banner from "./Banner";
import FeaturedSurvey from "./FeaturedSurvey";
import LatestSurveys from "./LatestSurveys";
const Home = () => {


    return (
        <div>

<Helmet>
        <link rel="icon" type="image/svg+xml" href={logoHome} />
        <title>SurveySeeker || Home</title>
      </Helmet>
<Banner />

<FeaturedSurvey />
<LatestSurveys />

      <HowItWorks />
      <Faq />

            
        </div>
    );
};

export default Home;