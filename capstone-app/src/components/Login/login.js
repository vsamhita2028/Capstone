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
                            <div className="fs-1 fw-bold">Planner APP</div>
                            <p className="mt-4 lh-lg">
                                Having trouble keeping up with all the work? <br />
                                This app is the one-stop solution to complete the tasks that you have either must have either missed or are still pending. It has all the features you need from organizing your inbox to keeping track of your progess, this application has everything covered up for you.
                                So, what are you waiting for?<br />
                                Hurry Up and Sign Up!
                            </p>
                            {/*
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                              */}
                            <div className="text-center mt-5"><a className={"btn btn-dark rounded-pill px-5 py-3"} href={url}>Continue with Google</a></div>
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