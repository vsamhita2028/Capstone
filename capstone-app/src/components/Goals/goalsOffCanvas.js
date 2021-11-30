import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";
import "./goals.css"
import { useState } from "react";
import axios from "axios"
const GoalsOffCanvas = ({ setEditGoalsView, editGoalsData, setIsLoading, fetchData }) => {
    const [milestoneData, setMileStoneData] = useState(editGoalsData)
    const Modalstyle = { backgroundColor: 'rgba(0,0,0,0.8)' }
    const badges = [{ url: "badge1", id: "0" }, { url: "badge2", id: "1" }, { url: "badge3", id: "2" }, { url: "badge4", id: "3" }, { url: "badge5", id: "4" }];
    const colors = ["#E99497", "#F3C583", "#E8E46E", "#B3E283"];
    const dateParser = (dateVal) => {
        let today = new Date(dateVal);
        let dd = String(today.getDate());
        let mm = String(today.getMonth() + 1); //January is 0!
        let yyyy = today.getFullYear();
        if (mm < 10) mm = "0" + mm;
        if (dd < 10) dd = "0" + dd;
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            _id: milestoneData._id,
            updateData: {
                badgeId: milestoneData.badgeId,
                color: milestoneData.color,
                endDate: milestoneData.endDate,
                startDate: milestoneData.startDate,
                status: milestoneData.status,
                title: milestoneData.title,
                user: milestoneData.user,
            }
        }
        console.log(milestoneData)
        axios.put("http://localhost:5000/goals", data)
            .then(result => {
                setEditGoalsView(false);
                setIsLoading(true);
            })
            .then(() => {
                fetchData();
            })
    }
    return (
        <div className="goals-offcanvas" >
            <div className="row">
                <div className="col-12 goals-offcanvas-card" style={{ margin: 0, padding: 0 }}>
                    <div className="row" style={{ height: "100%" }}>
                        <div className="col-4 bg-white " >
                            <div className="row">
                                <div className="col-12">
                                    <IconContext.Provider value={{ className: "goals-offcanvas-back-btn mt-3" }}>
                                        <div className="float-end" onClick={() => setEditGoalsView(false)} ><IoIosArrowForward /></div>
                                    </IconContext.Provider>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input type="text" className="goals-modal-inpt w-75" placeholder="Title..." onChange={(e) => setMileStoneData({ ...milestoneData, title: e.target.value })} value={milestoneData.title} />
                                    <input type="date" placeholder="Start Date" value={dateParser(milestoneData.startDate)} onChange={(e) => setMileStoneData({ ...milestoneData, startDate: e.target.value })} />
                                    <input type="date" placeholder="End Date" value={dateParser(milestoneData.endDate)} onChange={(e) => setMileStoneData({ ...milestoneData, endDate: e.target.value })} />
                                    {badges && badges.map((elem, idx) => {
                                        return (
                                            <div className="col-2" key={idx}>
                                                <div
                                                    onClick={() => setMileStoneData({ ...milestoneData, badgeId: elem.id })}
                                                    className={milestoneData.badgeId === elem.id ? "badge-box activeclass" : "badge-box"}>{elem.url}</div>
                                            </div>
                                        )
                                    })}
                                    <div className=" d-flex">
                                        {colors && colors.map((elem, idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    style={{ backgroundColor: elem }}
                                                    onClick={() => setMileStoneData({ ...milestoneData, color: elem })}
                                                    className={milestoneData.color === elem ? "rounded-circle goals-color-circle mx-1 p-3 activeclass" : "rounded-circle goals-color-circle mx-1 p-3"}></div>
                                            )
                                        })}
                                    </div>
                                    <button className="btn btn-primary" onClick={(e) => handleUpdate(e)}>Submit</button>

                                </div>
                            </div>

                        </div>
                        <div className="col-8" style={Modalstyle}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalsOffCanvas;