import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import useAuth from "../hooks/useAuth";
import useProUser from "../hooks/useProUser";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner";
const ProUserRoute = ({children}) => {
    const [isProUser, isProUserLoading] = useProUser();
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading || isProUserLoading){
        return <LoadingSpinner />;
    }
    
    if(user && isProUser){
        return children;
    }
    
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
};


ProUserRoute.propTypes = {
    children: PropTypes.element,
  }

export default ProUserRoute;

