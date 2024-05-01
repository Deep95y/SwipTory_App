import React, {useState} from "react";
import AuthLogin from './authlogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({handleCloseLogin}) => {

  const[formvalue, setFormvalue] = useState({
        Username:"",
        Password:""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, seterrorMessage] = useState("");

    const submitLogin = async () => {
      if(!formvalue.Username|| !formvalue.Password){
            alert("Enter the credentials");
        }
      else{
        const Username = formvalue.Username;
        const Password = formvalue.Password;
        const Response = await AuthLogin({ Username, Password });

        if (Response.status == "Login successful"){
          seterrorMessage("");
          localStorage.setItem("token", Response.jwToken);
          localStorage.setItem("username", Response.username);

          window.location.reload();
      } else {
        seterrorMessage(Response.status);
        }
      }
    }

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const closeLogin = () => {
        handleCloseLogin();
    }
    return(
        <>
        <div style={{height:'20rem',width:'27rem',borderRadius:'1rem',background:'white',display:'flex',flexDirection:'column',margin:'auto',marginTop:'5%'}}>
        <img src ="cross.webp" style={{heiht:'2rem',width:'2rem',marginLeft:'90%',marginTop:'1rem'}} onClick={() => closeLogin()}/>
        <div style={{marginLeft:'3.5rem',height:'1rem'}}><h2>Login to SwipTory</h2></div><br/><br/>
        <div style={{display:'flex',flexDirection:'row',marginLeft:'3rem',marginTop:'0.938'}}>
        <label htmlFor="Username" style={{fontWeight:'bold',marginTop:'1.5rem'}}>Username</label>
        <input type="text" placeholder="Enter Username" style={{width:'12rem',height:'1.2rem',marginLeft:'1.8rem',marginTop:'1.5rem'}}
        onInput={(e) =>
            setFormvalue({
              ...formvalue,
              Username: e.target.value,
            })
          }
          value={formvalue.Username}/></div><br/>
<div style={{ display: 'flex', flexDirection: 'row', marginLeft: '3rem' }}>
      <label htmlFor="Password" style={{ fontWeight: 'bold' }}>Password</label>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter Password"
        style={{ width:'12rem',height:'1.2rem',marginLeft:'2rem'}}
        onInput={(e) =>
          setFormvalue({
            ...formvalue,
            Password: e.target.value,
          })
        }
        value={formvalue.Password}
      />
      <button onClick={toggleShowPassword} style={{position:'absolute',marginLeft:'65%',height:'1.563rem'}}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    {errorMessage ? (<div style={{color:'red',margin:'auto',height:'0.938rem'}}>{errorMessage}</div>) : ("") }
        <div><button type = "button" style={{background: '#73ABFF',color:'black',height:'2rem',width:'5rem',marginLeft:'35%',borderRadius:'1rem',marginTop:'2rem',borderStyle:'none',marginBottom:'0.625'}} onClick={submitLogin}>Login</button></div>
        
        </div>
        </>
    );

}

export default Login;