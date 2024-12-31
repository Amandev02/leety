import {useState} from 'react'
import "./mix.css"
import {NavLink,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


const Login = ()=>{
    const [passShow,setpassShow] = useState(false);
   
    const [inpval,setinpval] = useState({
        email: "",
        password: ""
    });
    const history = useNavigate();
    const setVal = (e)=>{
        const {name,value} = e.target;
        setinpval(()=>{
            return {
                ...inpval,
                [name]:value
            }
        })
    };

    const checkvalidation = async(e)=>{
        e.preventDefault()
        const {profile,password} = inpval;
        if(profile==""){
            toast.error("profile is required!", {
                position: "top-center"
            });
        }
        else if(password==""){
            toast.error("password is required!", {
                position: "top-center"
            });
        }
        else if(password.length<6){
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        }
        else{  
            // console.log("User registration successfully done");
            try {
               
                const res = await axios.post("https://leety-server.vercel.app/auth/signin", inpval); // Adjust API endpoint
                 localStorage.setItem("usersdatatoken",res.data.result.token);
                 localStorage.setItem("usersprofile",res.data.result.userValid.profile);
                // console.log(res.data.result.userValid.profile);
                  
                toast.success("Welcome Back 😃!", {
                  position: "top-center"
              });
              history("/profile"); 
                setinpval({...inpval,profile:"",password:""});
             
              } catch (error) {
                toast.error("Please fill correct details", {
                  position: "top-center"
              });
                console.error("Error in login :", error);
              }
           
        
        }
    }

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Welcome back</h1>
                        <p>Please Login</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='profile'>Leetcode Profile</label>
                            <input type="text" onChange={setVal} value={inpval.profile} name="profile" id="profile" placeholder="Enter your Leetcode here"/>
                        </div>
                        <div className='form_input'>
                            <label htmlFor="password">Password</label>
                            <div className='two'>
                                <input type={!passShow ? "password":"text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter your password here'/>
                                <div className='showpass' onClick={()=>setpassShow(!passShow)}>
                                    {!passShow ? "Show":"Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={checkvalidation}>Log In</button>
                        <p>Don't have an account? <NavLink to="/register">SignUp</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Login;