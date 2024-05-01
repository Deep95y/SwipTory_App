import axios from "axios";


const GetAlldata = async() => {
    try{
        const GetLink = `${import.meta.env.VITE_API_URL}/getData`;
        const Response = await axios.get(GetLink);
    }
    catch(error){
        console.log(error);
        alert("Something went wrong");
    }
}

export default GetAlldata;
