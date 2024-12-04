
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";


const PrivetRouters = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);
  if (loading) {
    return (
      <>
       <div className="flex justify-center items-center my-52">
       <span className="loading loading-spinner loading-lg"></span>
       </div>
      </>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
};

export default PrivetRouters;
