import { Helmet } from "react-helmet-async";
import logoHome from "../../assets/images/home.png";
import HowItWorks from "./HowItWorks";
import Faq from "./Faq";
const Home = () => {


    return (
        <div>

<Helmet>
        <link rel="icon" type="image/svg+xml" href={logoHome} />
        <title>SurveySeeker || Home</title>
      </Helmet>


      <HowItWorks />
      <Faq />

            
        </div>
    );
};

export default Home;