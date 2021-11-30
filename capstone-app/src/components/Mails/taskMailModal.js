import { useState } from "react";
import axios from "axios";
import "./mails.css"
const TaskModal = ({ setVisibility }) => {
    const m = parseInt(new Date().getMonth()) + 1
    const today = new Date().getFullYear() + "-" + m + "-" + new Date().getDate();
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    const user = JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress;
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
        let StartTime = formData.startDate.split(":");
        let EndTime = formData.endDate.split(":");
        let data = JSON.parse(JSON.stringify(formData));
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
                setFormData({ task: "", status: "Not Started", description: "", user: user });
                setVisibility(false);
            });
    }
    return (
        <div className="modal show fade" style={Modalstyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="col-9">
                            <input type="text" className="task-modal-inpt" placeholder="New Task..." value={formData["title"]} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
                        </div>
                        <button type="button" className="btn-close" onClick={() => setVisibility(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <label>Date:</label>
                                    <input type="date" className="task-modal-inpt mx-3" value={formData["date"]} onChange={(event) => setFormData({ ...formData, date: event.target.value })} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <label>Start:</label>
                                    <input type="time" className="task-modal-inpt mx-3" value={formData["startDate"]} onChange={(event) => setFormData({ ...formData, startDate: event.target.value })} />
                                </div>
                                <div className="col-6">
                                    <label>End:</label>
                                    <input type="time" className="task-modal-inpt mx-3" value={formData["endDate"]} onChange={(event) => setFormData({ ...formData, endDate: event.target.value })} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <textarea type="text" className="task-modal-inpt" placeholder="Description..." value={formData["description"]} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary rounded-pill" onClick={(e) => onSubmitFunction(e)}>Submit</button>
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