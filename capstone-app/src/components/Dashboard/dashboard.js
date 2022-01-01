import { useState } from "react";
import { IconContext } from "react-icons/lib";
import { useHistory } from "react-router";
import Activity from "../Activity/activity";
import Badges from "../Badges/badges";
import Goals from "../Goals/goals";
import Mails from "../Mails/mails";
import Tasks from "../Tasks/tasks";
import { FiLogOut } from "react-icons/fi";
import "./dashboard.css"

const Dashboard = () => {
  const [windowNum, setWindowNum] = useState(1);
  let history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="container-fluid dashboard-container">
      <div className="row nav" >
        <div className="col-11 d-flex justify-content-evenly p-4" style={{ padding: 0, margin: 0 }}>
          <div className="nav-item" onClick={() => setWindowNum(1)}  >
            <span className={windowNum === 1 ? "activeStyle p-3" : ""}>MAILS</span>
          </div>
          <div className="nav-item" onClick={() => setWindowNum(2)} >
            <span className={windowNum === 2 ? "activeStyle p-3" : ""}>TASKS</span>
          </div>
          <div className="nav-item" onClick={() => setWindowNum(3)}>
            <span className={windowNum === 3 ? "activeStyle p-3" : ""}>MILESTONES</span>
          </div>
          <div className="nav-item" onClick={() => setWindowNum(4)} >
            <span className={windowNum === 4 ? "activeStyle p-3" : ""}>BADGES</span>
          </div>
          <div className="nav-item" onClick={() => setWindowNum(5)} >
            <span className={windowNum === 5 ? "activeStyle p-3" : ""}>ACTIVITY</span>
          </div>
        </div>
        <div className="col-1 p-4 d-flex justify-content-end align-items-center">
          <span className={"nav-item px-2"} onClick={handleLogout}>Logout</span>
          <IconContext.Provider value={{ className: "logout-icon" }}>
            <span> <FiLogOut /></span>
          </IconContext.Provider>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {windowNum === 1 && <Mails />}
          {windowNum === 2 && <Tasks setWindowNum={setWindowNum} />}
          {windowNum === 3 && <Goals />}
          {windowNum === 4 && <Badges />}
          {windowNum === 5 && <Activity />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;