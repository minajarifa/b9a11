import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useAuth = () => {
    const All = useContext(AuthContext)
    return All
};

export default useAuth;