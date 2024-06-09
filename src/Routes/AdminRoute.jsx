import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner";

const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <LoadingSpinner />;
    }
    
    if(user && isAdmin){
        return children;
    }
    
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.element,
  }

export default AdminRoute;