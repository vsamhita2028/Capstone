import { useEffect } from 'react';
import axios from "axios"
import "./login.css"
const Login = ({ setUrl, url }) => {
    useEffect(() => {
        const headers = { 'Content-Type': 'application/json' };
        const finalPath = "http://localhost:5000/auth/getUrl";

        axios.get(finalPath, {
            headers: headers
        }).then((result) => {
            let data = result.data;
            console.log(data)
            setUrl(data.url);
        })
    }, [setUrl])
    if (!url) {
        return (
            <div>
                Loading...
            </div>
        )

    } else {
        return (
            <div className={"container-fluid"} style={{ height: "100vh" }}>
                <div className="row" style={{ height: "100%" }}>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <div className="px-5">
                            <h1>Planner APP</h1>
                            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <div className="text-center mt-5"><a className={"btn btn-dark rounded-pill"} href={url}>Continue with Google</a></div>
                        </div>
                    </div>
                    <div className="col-6 lottie-graphic ">
                        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_mftsposa.json" background="transparent" speed="1" style={{ width: 500, height: 500 }}></lottie-player>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;