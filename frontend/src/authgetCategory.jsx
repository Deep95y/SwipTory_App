import axios from "axios";
import React from 'react';

const GetByCategory = async({Category}) => {
    try{
        const GetCategory = `${import.meta.env.VITE_API_URL}/getByCategory?Category=${Category}`;

        const token = localStorage.getItem("token");

        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(GetCategory);
    }
    catch(error){
        console.log(error);
        alert("Something went wrong");
    }
}

export default GetByCategory;