import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import GoalDeleteWarning from "./deleteGoalWarning";
import BadgeModal from "./badgeModal";


const GoalsCard = ({ dateParser, setEditGoalsView, setEditGoalsData, schedulerData, setIsLoading, fetchData, currentDate, badges }) => {
    const [pillDetails, setPillDetails] = useState(schedulerData);
    const [deleteId, setDeleteId] = useState(-1)
    const [goalWarning, setGoalWarning] = useState(false);
    const [badgeModal, setBadgeModal] = useState(false);
    const [completedId, setCompletedId] = useState({});
    const [dataforModal, setDataFormodal] = useState({})
    const handlePillStyle = (status) => {
        if (status === "Not Started") {
            return { backgroundColor: "rgb(187, 184, 184)", color: "" };
        } else if (status === "In Progress") {
            return { backgroundColor: "rgb(237, 212, 227)", color: "rgb(163, 117, 145)" };
        } else {
            return { backgroundColor: "rgb(212, 237, 215)", color: "rgb(101, 139, 105)" };
        }
    }
    const updatePillStatus = (status, idx) => {
        let data = schedulerData;
        data[idx].status = status
        setPillDetails(data);
        if (status !== "Completed") {
            axios.put("http://localhost:5000/goals", { updateData: { status: status }, _id: schedulerData[idx]._id })
                .then((result) => {
                    setIsLoading(true);
                }).then(() => {
                    fetchData();
                })
        } else {
            setCompletedId({ updateData: { status: status }, _id: schedulerData[idx]._id });
            setDataFormodal(schedulerData[idx])
            setBadgeModal(true);
        }

    }
    const handleDeleteGoal = () => {
        // e.preventDefault();
        const data = { _id: deleteId._id };
        axios.delete("http://localhost:5000/goals", { data: data })
            .then((result) => {
                setIsLoading(true);
            }).then(() => {
                fetchData();
            })
    }
    const handleCloseCompletedModal = () => {
        axios.put("http://localhost:5000/goals", completedId)
            .then((result) => {
                setIsLoading(true);
            }).then(() => {
                fetchData();
            })
    }
    return (
        <div>
            {schedulerData && schedulerData.map((elem, idx) => {
                if (new Date(elem.startDate).getMonth() === new Date(currentDate).getMonth()) {
                    return (
                        <div key={idx} className="goal-card mt-2 bg-white" style={{ borderLeft: `15px solid ${elem.color}` }}>
                            <div className="row p-2">
                                <div className="col-7">
                                    <div className="row">
                                        <div className="col-2 px-1 d-flex align-items-center mt-2">
                                            <span >
                                                <img alt="img" src={badges[elem.badgeId].url} height="50" width="50" />
                                            </span>
                                        </div>

                                        <div className="col-10 ">
                                            <div className="row">
                                                <div className="col-12 mx-2">
                                                    <div className="fw-bold fs-4 text-truncate">{elem.title}</div>
                                                    <div className="goal-card-date mt-1">{dateParser(elem.startDate)} to {dateParser(elem.endDate)} </div>
                                                </div>
                                            </div>
                                            {/* <div className="row mt-1">
                                                <div className="col-12 d-flex">
                                                    
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-end">
                                            <span className="pointer px-1" onClick={() => { setEditGoalsView(true); setEditGoalsData(elem) }} ><MdOutlineEdit /></span>
                                            <span className="pointer" onClick={() => { setGoalWarning(true); setDeleteId(elem); }} ><MdDeleteOutline /></span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 d-flex justify-content-end ">
                                            {/* disabled={pillDetails[idx].status === "Completed"} */}
                                            {<select className="form-select w-100 select-goal-status" disabled={pillDetails[idx].status === "Completed"} value={pillDetails[idx].status}
                                                onChange={(e) => updatePillStatus(e.target.value, idx)}
                                                style={handlePillStyle(pillDetails[idx].status)}
                                            >
                                                <option value="Not Started" style={{ backgroundColor: "white" }}>To-Do</option>
                                                <option value="In Progress" style={{ backgroundColor: "white", color: "rgb(163, 117, 145)" }}>In Progress</option>
                                                <option value="Completed" style={{ backgroundColor: "white", color: "rgb(101, 139, 105)" }}>Completed</option>
                                            </select>}
                                            {/* {pillDetails[idx].status === "Completed" && <div className={"rounded-pill goal-status-pill pointer"}
                                                style={handlePillStyle(pillDetails[idx].status)}>{pillDetails[idx].status}</div>} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (<div key={idx}></div>)
                }

            })}
            {badgeModal && <BadgeModal setBadgeModal={setBadgeModal} handleCloseCompletedModal={handleCloseCompletedModal} dataforModal={dataforModal} badges={badges} />}
            {goalWarning && <GoalDeleteWarning setGoalWarning={setGoalWarning} handleDeleteGoal={handleDeleteGoal} deleteId={deleteId} />}
        </div>
    );
}

export default GoalsCard;