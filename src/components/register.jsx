import {useState} from 'react'
import "./mix.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {NavLink,useNavigate} from 'react-router-dom'

const Register = (()=>{
    const [passShow,setpassShow] = useState(false);
    const [cpassShow,setcpassShow] = useState(false);

    const [inpval,setinpval] = useState({
        name: "",
        profile: "",
        password: ""
    });
    // console.log(inpval);
    const history = useNavigate();
    const setVal = (e)=>{
        // console.log(e.target.value);
        const {name,value} = e.target;
        setinpval(()=>{
            return {
                ...inpval,
                [name]:value
            }
        })
    };

    const checkvaidation = async(e)=>{
        e.preventDefault()
        const {name,profile,password} = inpval;
        if(name==""){
            toast.warning("Please enter your name", {
                position: "top-center"
            });
        }
        else if(profile==""){
            toast.error("Please enter your leetcode profile", {
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
                console.log(inpval);
                await axios.post("https://assignment-lucid2.vercel.app/auth/signup", inpval); // Adjust API endpoint
                toast.success("Registration Successfully done 😃!", {
                  position: "top-center"
              });
              setinpval({...inpval,name:"",profile:"",password:""});
              } catch (error) {
                toast.error("Error please fill details correctly", {
                  position: "top-center"
              });
                console.error("Error in registration:", error);
              }

            
        }
    } 
 
    return(
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                       
                        <p>I'm glad you are gonna use it</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={setVal} value={inpval.name} id="name" name="name" placeholder="Enter your name here" />
                        </div>
                        <div className='form_input'>
                            <label htmlFor='leetcode_profile'>Leetcode Profile</label>
                            <input type="text" onChange={setVal} value={inpval.profile} name="profile" id="leetcode" placeholder="Enter your leetcode profile here"/>
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
                        {/* <div className='form_input'>
                            <label htmlFor="password">Confirm Password</label>
                            <div className='two'>
                                <input type={!cpassShow ? "password":"text"} onChange={setVal} value={inpval.cpassword} name="cpassword" id="cpassword" placeholder='Confirm password'/>
                                <div className='showpass' onClick={()=>setcpassShow(!cpassShow)}>
                                    {!cpassShow ? "Show":"Hide"}
                                </div>
                            </div>
                        </div> */}
                        <button className='btn' onClick={checkvaidation}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/login">LogIn</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
})

export default Register;