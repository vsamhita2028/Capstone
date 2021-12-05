import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import "./goals.css"
import { useState } from "react";
import axios from "axios"
const GoalsOffCanvas = ({ setEditGoalsView, editGoalsData, setIsLoading, fetchData, badges }) => {
    const [milestoneData, setMileStoneData] = useState(editGoalsData)
    const Modalstyle = { backgroundColor: 'rgba(0,0,0,0.8)' }
    const colors = ["#C449C2", "#B088F9", "#B590CA", "#D19FEB"];
    const [warning, setwarning] = useState(false);
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
        if (milestoneData.badgeId && milestoneData.color && milestoneData.endDate && milestoneData.startDate && milestoneData.status && milestoneData.title) {
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
        } else {
            setwarning(true);
        }

    }
    return (
        <div className="goals-offcanvas" >
            <div className="row">
                <div className="col-12 goals-offcanvas-card" style={{ margin: 0, padding: 0 }}>
                    <div className="row" style={{ height: "100%" }}>
                        <div className="col-4 offcanvas-goals-bg" >
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-between align-items-center">
                                        <div>
                                            <input type="text" className="goals-offcanvas-input goals-offcanvas-heading fs-1 w-75" placeholder="Title..." onChange={(e) => setMileStoneData({ ...milestoneData, title: e.target.value })} value={milestoneData.title} />
                                        </div>
                                        <IconContext.Provider value={{ className: "goals-offcanvas-back-btn" }}>
                                            <div className="float-end" onClick={() => setEditGoalsView(false)} ><IoIosArrowBack /></div>
                                        </IconContext.Provider>
                                    </div>
                                </div>
                                {warning &&
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="warning-bubble d-flex justify-content-between">
                                                <span>Please fill all the fields :)</span>
                                                <span><button type="button" className="btn-close" onClick={() => setwarning(false)}></button></span>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <label>From</label>
                                                <input type="date" className="goals-offcanvas-input mt-2" placeholder="Start Date" value={dateParser(milestoneData.startDate)} onChange={(e) => setMileStoneData({ ...milestoneData, startDate: e.target.value })} />
                                            </div>
                                            <div className="col-6">
                                                <label>To</label>
                                                <input type="date" className="goals-offcanvas-input mt-2" placeholder="End Date" value={dateParser(milestoneData.endDate)} onChange={(e) => setMileStoneData({ ...milestoneData, endDate: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <label>Badges</label>
                                            </div>
                                            {badges && badges.map((elem, idx) => {
                                                return (
                                                    <div className="col-6 mt-2" key={idx}>
                                                        <div
                                                            onClick={() => setMileStoneData({ ...milestoneData, badgeId: elem.id })}
                                                            className={milestoneData.badgeId === elem.id ? "badge-box activeclass mx-3" : "badge-box mx-3"}>
                                                            <img src={elem.url} alt="img" height="50" width="50" />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-12">
                                                <label>Colors</label>
                                            </div>
                                            <div className="col-12 d-flex mt-2">
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
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-12 text-center">
                                                <button className="btn goals-offcanvas-sbt-btn rounded-pill" onClick={(e) => handleUpdate(e)}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
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