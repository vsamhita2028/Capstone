import { useState } from "react";
import axios from "axios";
const TaskModal = ({ setVisibility, setIsLoading, fetchData }) => {
    const m = new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
    const dd = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
    const today = new Date().getFullYear() + "-" + m + "-" + dd;
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    const user = JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress;
    const [warning, setWarning] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        status: "Not Started",
        description: "",
        user: user,
        startDate: "",
        endDate: "",
        date: today,
        hours: 0
    })
    const onSubmitFunction = (e) => {
        e.preventDefault();
        let data = JSON.parse(JSON.stringify(formData));
        if (data.title && data.status && data.description && data.startDate && data.endDate && data.date) {
            let StartTime = formData.startDate.split(":");
            let EndTime = formData.endDate.split(":");
            let date = new Date(data.date);
            date.setHours(StartTime[0], StartTime[1]);
            data["startDate"] = date.setHours(StartTime[0], StartTime[1]);
            data["endDate"] = date.setHours(EndTime[0], EndTime[1]);
            let timeDiff = Math.abs(data["startDate"] - data["endDate"]) / 36e5;
            data["hours"] = timeDiff;
            setFormData(data);
            console.log(data);

            axios.post("http://localhost:5000/tasks/addTask", data)
                .then(result => {

                    setVisibility(false);
                    setIsLoading(true);
                })
                .then(() => {
                    fetchData();
                })
        } else {
            setWarning(true);
        }
    }
    return (
        <div className="modal show fade" style={Modalstyle}>
            <div className=" modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="col-9">
                            <input type="text" className="task-modal-inpt p-2 fs-4" placeholder="New Task" value={formData["title"]} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
                        </div>
                        <button type="button" className="btn-close" onClick={() => setVisibility(false)}></button>
                    </div>
                    <div className="modal-body modal-body-bg">
                        {warning &&
                            <div className="row">
                                <div className="col-12">
                                    <div className="warning-bubble d-flex justify-content-between">
                                        <span>Please fill all the fields :)</span>
                                        <span><button type="button" className="btn-close" onClick={() => setWarning(false)}></button></span>
                                    </div>
                                </div>
                            </div>
                        }
                        <form>
                            <div className="container">
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <label>Date</label>
                                    </div>
                                    <div className="col-12 mt-2">
                                        <input type="date" className="task-modal-inpt w-100" value={formData["date"]} onChange={(event) => setFormData({ ...formData, date: event.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <label>From</label>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <input type="time" className="task-modal-inpt w-100" value={formData["startDate"]} onChange={(event) => setFormData({ ...formData, startDate: event.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <label>To</label>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <input type="time" className="task-modal-inpt w-100" value={formData["endDate"]} onChange={(event) => setFormData({ ...formData, endDate: event.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-5">
                                        <label>Description</label>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <textarea type="text" className="task-modal-inpt w-100" rows={5} placeholder="Type here" value={formData["description"]} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-12 text-center pb-3">
                                        <button className="btn rounded-pill task-modal-sub-btn" onClick={(e) => onSubmitFunction(e)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskModal;