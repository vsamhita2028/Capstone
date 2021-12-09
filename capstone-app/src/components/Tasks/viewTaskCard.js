import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";
import { useState } from "react";
import axios from "axios";
const ViewTaskCard = ({ setOffCanvas, viewCardData, setIsLoading, fetchData, setDataCategory }) => {
    const [formData, setFormData] = useState(viewCardData);
    const [warning, setwarning] = useState(false);
    // console.log(viewCardData);
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = JSON.parse(JSON.stringify(formData));
        if (data.startDate >= data.endDate) {
            setwarning(2);
        }
        else if (data.title && data.status && data.description && data.startDate && data.endDate && data.date) {
            let StartTime = formData.startDate.split(":");
            let EndTime = formData.endDate.split(":");
            let date = new Date(data.date);
            date.setHours(StartTime[0], StartTime[1]);
            data["startDate"] = date.setHours(StartTime[0], StartTime[1]);
            data["endDate"] = date.setHours(EndTime[0], EndTime[1]);
            let timeDiff = Math.abs(data["startDate"] - data["endDate"]) / 36e5;
            data["hours"] = timeDiff;
            delete data["_id"];
            console.log(data);
            const finaldata = {
                _id: formData._id,
                updateData: data
            }
            axios.put("http://localhost:5000/tasks/updateTaskDetails", finaldata)
                .then(result => {
                    setOffCanvas(false);
                    setIsLoading(true);
                    setDataCategory("today");
                })
                .then(() => {
                    fetchData();
                })
        } else {
            setwarning(1);
        }
    }
    // const parseDate = (dateString) => {
    //     let newDate = new Date(dateString);
    //     return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    // }
    // const parseTime = (timeString, index) => {
    //     let newDate = new Date(timeString);
    //     return newDate.getHours() + ":" + newDate.getMinutes();
    // }
    return (
        <div className="task-offcanvas">
            <div className="row">
                <div className="col-4 task-offcanvas-card">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <div >
                                <input type="text" className="task-offcanvas-input task-offcanvas-heading fs-1 w-75" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <IconContext.Provider value={{ className: "task-offcanvas-back-btn" }}>
                                <div onClick={() => setOffCanvas(false)} ><IoIosArrowForward /></div>
                            </IconContext.Provider>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {warning === 1 &&
                                <div className="row">
                                    <div className="col-12">
                                        <div className="warning-bubble d-flex justify-content-between">
                                            <span>Please fill all the fields :)</span>
                                            <span><button type="button" className="btn-close" onClick={() => setwarning(0)}></button></span>
                                        </div>
                                    </div>
                                </div>
                            }
                            {warning === 2 &&
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <div className="warning-bubble d-flex justify-content-between">
                                            <span>Start time is grater than or equal to end time</span>
                                            <span><button type="button" className="btn-close" onClick={() => setwarning(0)}></button></span>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="row mt-4">
                                <div className="col-6">
                                    <label>Date</label>
                                    <input className="task-offcanvas-input mt-2" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-6">
                                            <label>From</label>
                                            <input className="task-offcanvas-input mt-2" type="time" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                                        </div>
                                        <div className="col-6">
                                            <label>To</label>
                                            <input className="task-offcanvas-input mt-2" type="time" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-12"></div>
                            </div> */}
                            <div className="row mt-3">
                                <div className="col-12">
                                    <label>Description</label>
                                    <textarea type="text" className="task-offcanvas-input task-offcanvas-description w-100 mt-2" rows={10} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 text-center">
                                    <button type="buttton" className={"btn task-offcanvas-sbt-btn rounded-pill"} onClick={(e) => handleSubmit(e)}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTaskCard;