import axios from "axios";
import toast from "react-hot-toast";
// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiBaseUrl = 'http://localhost:8000/api/v1';

export const getResultRequest = async (keyword)=>{
    try {
        const url = `${apiBaseUrl}/students/${keyword}`
        const {data} = await axios.get(url);
        return data;

    }catch (e) {
        toast.error('Server error occurred')
    }
}

export const createResultRequest = async (values)=>{
    try {
        const url = `${apiBaseUrl}/student`;
        await axios.post(url, values);
        toast.success('Result create successfully')
        return true
    }catch (error) {
        if (error.response.status === 400){
            toast.error(error.response.data.error)
            return false
        }else {
            toast.error('Server error occurred');
            return false
        }

    }
}