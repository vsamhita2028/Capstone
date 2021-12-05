import { useState } from "react";
import "./goals.css";
import axios from "axios";
const GoalsModal = ({ setModalVisibility, fetchData, setIsLoading, today, badges }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    const [warning, setwarning] = useState(false);
    const [milestoneData, setMileStoneData] = useState({
        user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress,
        title: '',
        startDate: today,
        endDate: today,
        badgeId: "",
        color: "",
        status: "Not Started"
    })
    const colors = ["#C449C2", "#B088F9", "#B590CA", "#D19FEB"];
    // const colors = ["#E99497", "#F3C583", "#E8E46E", "#B3E283"];
    const handelSubmit = () => {
        console.log(milestoneData);
        if (milestoneData.title && milestoneData.startDate && milestoneData.endDate && milestoneData.badgeId && milestoneData.color) {
            axios.post("http://localhost:5000/goals", milestoneData)
                .then((result) => {
                    console.log(result)
                    setModalVisibility(false);
                    setIsLoading(true);
                }).then(() => {
                    fetchData();
                })
        } else {
            setwarning(true);
        }
    }
    return (
        <div>
            <div className="modal show fade" style={Modalstyle}>
                <div className="modal-dialog modal-md ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <input type="text" className="goals-header-inpt fs-3 w-75" placeholder="Title" onChange={(e) => setMileStoneData({ ...milestoneData, title: e.target.value })} value={milestoneData.title} />
                            <button type="button" className="btn-close" onClick={() => setModalVisibility(false)}></button>
                        </div>
                        <div className="modal-body add-goals-container">
                            <div className="container">
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
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <label>From</label>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <input type="date" className=" goals-modal-inpt" placeholder="Start Date" value={milestoneData.startDate} onChange={(e) => setMileStoneData({ ...milestoneData, startDate: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <label>To</label>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <input type="date" className=" goals-modal-inpt" placeholder="End Date" value={milestoneData.endDate} onChange={(e) => setMileStoneData({ ...milestoneData, endDate: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
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
                                        <label>Color</label>
                                    </div>
                                    <div className="col-12 mt-2 d-flex">
                                        {colors && colors.map((elem, idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    style={{ backgroundColor: elem }}
                                                    onClick={() => setMileStoneData({ ...milestoneData, color: elem })}
                                                    className={milestoneData.color === elem ? "rounded-circle goals-color-circle me-1 p-3 activeclass" : "rounded-circle goals-color-circle me-1 p-3"}></div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 my-3 d-flex justify-content-center ">
                                        <button className="btn goals-submit-btn rounded-pill" onClick={handelSubmit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalsModal;