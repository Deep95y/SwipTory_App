import axios from "axios";
import React from 'react';

const AuthRegister = async({Username, Password}) => {
    try{
        const Reglink = `${import.meta.env.VITE_API_URL}/signUp`;
        const Response = await axios.post(Reglink,{
            Username,
            Password
        });
    }
    catch(error){
        console.log(error);
        alert("Somethimg went wrong");
    }

}

export default AuthRegister;