import { NavLink } from 'react-router-dom'
import { useState ,useContext} from "react";
import { LoginContext } from "../components/ContextProvider/Context";

const Profile = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    let token = localStorage.getItem("usersdatatoken");

    function fun(){
        console.log(logindata);
        console.log("aman");
    }

  return (
    <>
     <h1>logindata</h1>
     <button onClick={fun}></button>
    
    </>
  )
}

export default Profile