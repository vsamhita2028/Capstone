import { useState } from "react";
import Activity from "../Activity/activity";
import Badges from "../Badges/badges";
import Goals from "../Goals/goals";
import Mails from "../Mails/mails";
import Tasks from "../Tasks/tasks";
import "./dashboard.css"

const Dashboard = () => {
  const [windowNum, setWindowNum] = useState(1);
  return (
    <div className="container-fluid dashboard-container">
      <div className="row" >
        <div className="col-12" style={{ padding: 0, margin: 0 }}>
          <ul className="nav nav-pills nav-fill p-4">
            <li className="nav-item" onClick={() => setWindowNum(1)}  >
              <span className={windowNum === 1 ? "activeStyle p-3" : ""}>MAILS</span>
            </li>
            <li className="nav-item" onClick={() => setWindowNum(2)} >
              <span className={windowNum === 2 ? "activeStyle p-3" : ""}>TASKS</span>
            </li>
            <li className="nav-item" onClick={() => setWindowNum(3)}>
              <span className={windowNum === 3 ? "activeStyle p-3" : ""}>GOALS</span>
            </li>
            <li className="nav-item" onClick={() => setWindowNum(4)} >
              <span className={windowNum === 4 ? "activeStyle p-3" : ""}>BADGES</span>
            </li>
            <li className="nav-item" onClick={() => setWindowNum(5)} >
              <span className={windowNum === 5 ? "activeStyle p-3" : ""}>ACTIVITY</span>
            </li>
          </ul>
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