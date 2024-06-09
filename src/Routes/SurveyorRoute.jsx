
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import useAuth from "../hooks/useAuth";
import useSurveyor from "../hooks/useSurveyor";
const SurveyorRoute = ({children}) => {
    const [isSurveyor, isSurveyorLoading] = useSurveyor()
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading || isSurveyorLoading){
        return <progress className="progress w-56"></progress>
    }
    
    if(user && isSurveyor){
        return children;
    }
    
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

SurveyorRoute.propTypes = {
    children: PropTypes.element,
  }

export default SurveyorRoute;

