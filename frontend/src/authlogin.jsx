import axios from "axios";
import React from 'react';

const AuthLogin = async({Username, Password}) => {
    try{
        const LogLink = `${import.meta.env.VITE_API_URL}/SignIn`;
        const Response = await axios.post(LogLink,{
            Username,
            Password
        });
        
        return Response.data;
    }
    catch(error){
        console.log(error);
        alert("Something went wrong");
    }
}

export default AuthLogin;