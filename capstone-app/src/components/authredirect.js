import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"
const AuthRedirect = () => {
    let history = useHistory();
    useEffect(() => {
        const finalPath = "http://localhost:5000/auth/getToken";
        localStorage.getItem("token") && axios.post(finalPath, {
            url: window.location.href,
        }).then((result) => {
            localStorage.setItem('token', JSON.stringify(result));
            history.push("/dashboard");
        })
    }, [history])
    return (<div>Loading..</div>);
}

export default AuthRedirect;