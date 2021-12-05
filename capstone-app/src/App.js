
import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './components/Dashboard/dashboard';
import Login from './components/Login/login';
import AuthRedirect from './components/authredirect';
import ProtectedRoute from './protectedRoute';
function App() {
  const [url, setUrl] = useState("");

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><Login url={url} setUrl={setUrl} /></Route>
          <Route exact path="/authRedirect"><AuthRedirect /></Route>
          <Route exact path="/dashboard">
            <ProtectedRoute Component={Dashboard} />
          </Route>
          {/* <Route exact path="/dashboard"><Dashboard /></Route> */}
          <Redirect exact to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
