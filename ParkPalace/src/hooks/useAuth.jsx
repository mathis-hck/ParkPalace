import {useContext} from "react";
import AuthContext from "../context/authContext.jsx";

export default function useAuth(){
    return useContext(AuthContext);
}