import axios from "axios";
import React from 'react';

const StoryApi = async({slides}) => { 

        try{
            const createLink = `${import.meta.env.VITE_API_URL}/createApi`;
            const token = localStorage.getItem("token");  
            axios.defaults.headers.common["Authorization"] = token;
    
            const Response = await axios.post(createLink,{ 
                Category: slides.Category, 
                SlideData: slides.SlideData,
                refUserId: "_id" 
            }); 
        }
        catch(error){
            console.log(error);
           alert("Something went wrong");
        }
}

export default StoryApi;