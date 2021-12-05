import { Redirect, Route } from "react-router-dom";
const ProtectedRoute = ({ Component }) => {

    const isAuthenticated = localStorage.getItem("token");
    return (
        <Route
            render={() =>
                isAuthenticated ? <Component /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute;