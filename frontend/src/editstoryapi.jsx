import axios from "axios";
import React from 'react';

const EditStoryApi = async({slides}) => { 

        try{
            const createLink = `${import.meta.env.VITE_API_URL}/updateStoryById`;
            const token = localStorage.getItem("token");

            axios.defaults.headers.common["Authorization"] = token;
            const Response = await axios.patch(createLink,{ 
                storyId: slides.id,
                Category: slides.Category,
                Slides: slides.SlideData
                
            }); 
        }
        catch(error){
            console.log(error);
           alert("Something went wrong");
        }
}

export default EditStoryApi;