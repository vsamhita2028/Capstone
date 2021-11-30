import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";
import { useState } from "react";
import axios from "axios";
const ViewTaskCard = ({ setOffCanvas, viewCardData, setIsLoading, fetchData, setDataCategory }) => {
    const [formData, setFormData] = useState(viewCardData);
    // console.log(viewCardData);
    const handleSubmit = (e) => {
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
                <div className="col-4 bg-white task-offcanvas-card">
                    <IconContext.Provider value={{ className: "task-offcanvas-back-btn" }}>
                        <div className="float-end" onClick={() => setOffCanvas(false)} ><IoIosArrowForward /></div>
                    </IconContext.Provider>
                    <div className={"mt-4"}>
                        <input type="text" className="task-offcanvas-input task-offcanvas-heading" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        {/* <span>{viewCardData.task}</span> */}
                    </div>
                    <div className="mt-2">
                        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                    </div>
                    <div className="mt-2">
                        <input type="time" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                    </div>
                    <div className="mt-2">
                        <input type="time" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                    </div>
                    <div className="pt-4">
                        <textarea type="text" className="task-offcanvas-input task-offcanvas-description w-100" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        {/* {viewCardData.description} */}
                        {/* <div contenteditable onChange={(e) => setFormData({ ...formData, description: e.target.value })}>
                            {formData.description}
                        </div> */}

                    </div>
                    <div className="d-flex justify-content-evenly mt-5">
                        <button type="buttton" className={"btn btn-primary"} onClick={(e) => handleSubmit(e)}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTaskCard;