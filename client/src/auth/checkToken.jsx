import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const checkToken = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = document.cookie.replace('token=', '');
        axios.post('http://localhost:3000/login/revisar-token' , {token})
        .then((response) => {
            if(!response.data.valid) {
                navigate('/');
            }
        }).catch ((error) => {
            console.error(error)
            navigate('/')
        });
    }, [])
}

export default checkToken