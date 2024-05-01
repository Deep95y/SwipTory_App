import React, {useState} from "react";
import  AuthRegister from './authreg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = ({handleClose, setShowRegister}) => {

const [showPassword, setShowPassword] = useState(false);
const[formvalue, setFormvalue] = useState({
        Username:"",
        Password:""
    });

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleRegister = () => {
        if(!formvalue.Username|| !formvalue.Password){
            alert("Enter the credentials");
        }
        else{
          AuthRegister(formvalue);
          setShowRegister(false);
        }
    }

    const handleReg = () => {
        handleClose();
    }


    return(
        <>
         <div style={{height:'20rem',width:'27rem',borderRadius:'1rem',background:'white',display:'flex',flexDirection:'column',margin:'auto',marginTop:'5%'}}>
        <img src ="cross.webp" style={{heiht:'2rem',width:'2rem',marginLeft:'90%',marginTop:'1rem'}}  onClick={handleReg}/>
        <div  style={{marginLeft:'3.5rem',height:'1rem'}}><h2>Register to SwipTory</h2></div><br/><br/>
        <div style={{display:'flex',flexDirection:'row',marginLeft:'3rem',marginTop:'0.938rem'}}>
        <label htmlFor="Username" style={{fontWeight:'bold',marginTop:'1.563rem'}} >Username</label>
        <input type="text" placeholder="Enter Username" style={{width:'12rem',height:'1.2rem',marginLeft:'1.8rem',marginTop:'1.5rem'}}
                onInput={(e) =>
                setFormvalue({
                  ...formvalue,
                  Username: e.target.value,
                })
              }
              value={formvalue.Username}
/></div><br/>
        <div style={{display:'flex',flexDirection:'row',marginLeft:'3rem'}}>
        <label htmlFor="Password" style={{fontWeight:'bold'}}>Password</label>
        <input  type={showPassword ? 'text' : 'password'}
        placeholder="Enter Password" style={{width:'12rem',height:'1.2rem',marginLeft:'2rem'}}
         onInput={(e) =>
            setFormvalue({
              ...formvalue,
              Password: e.target.value,
            })
          }
          value={formvalue.Password}/>
          <button onClick={toggleShowPassword} style={{position:'absolute',marginLeft:'65%',height:'1.563rem'}}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
           </button>
          </div><br/>
        <div><button type = "button" style={{background: '#73ABFF',color:'black',height:'2rem',width:'5rem',marginLeft:'37%',borderRadius:'1rem',marginTop:'1.5rem',borderStyle:'none'}} onClick={handleRegister}>Register</button></div>
        
        </div>
        </>
    );

}

export default Register;