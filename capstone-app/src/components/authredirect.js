import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios"
const AuthRedirect = () => {
    let history = useHistory();
    useEffect(() => {
        console.log("hi");
        const finalPath = "http://localhost:5000/auth/getToken";
        axios.post(finalPath, {
            url: window.location.href,
        }).then((result) => {
            console.log("meow");
            localStorage.setItem('token', JSON.stringify(result));
            history.push("/dashboard");
        })
    }, [history])
    return (<div>Loading..</div>);
}

export default AuthRedirect;