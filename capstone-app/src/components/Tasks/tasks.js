import { useEffect, useState } from "react";
// import TaskCard from "./taskCard";
import TaskModal from "./taskModal";
import axios from "axios";
import "./tasks.css";
import DragNDrop from "./dragNdrop";
const Tasks = () => {
    const [modal, setVisibility] = useState(false);
    const [taskData, setTaskData] = useState([{ _id: 'Not Started', tasks: [] }, { _id: 'In progress', tasks: [] }, { _id: 'Completed', tasks: [] }]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataCategory, setDataCategory] = useState("today");
    const [currentMonth, setCurrentMonth] = useState("");
    const formatData = (data) => {
        let newData = [{ _id: 'Not Started', tasks: [] }, { _id: 'In progress', tasks: [] }, { _id: 'Completed', tasks: [] }]
        if (data.length === 1) {
            if (data[0]._id === "Not Started")
                newData[0] = data[0];
            else if (data[0]._id === "In progress")
                newData[1] = data[0];
            else
                newData[2] = data[0];
        } else if (data.length === 2) {
            if (data[0]._id === "Not Started" && data[1]._id === "In progress") {
                newData[0] = data[0];
                newData[1] = data[1];
            } else if (data[0]._id === "In progress" && data[1]._id === "Completed") {
                newData[1] = data[0];
                newData[2] = data[1];
            } else {
                newData[0] = data[0];
                newData[2] = data[1];
            }
        } else if (data.length === 3) {
            newData = data;
        }
        return newData;
    }
    const fetchData = () => {
        let start = new Date();
        start.setHours(0, 0, 0, 0);
        let end = new Date();
        end.setHours(23, 59, 59, 999);
        axios.get('http://localhost:5000/tasks/getTask', {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress,
                start: start,
                end: end
            }
        }).then(result => {
            const data = result.data.result;
            const newData = formatData(data);
            console.log(data);
            setIsLoading(true);
            setTaskData([...newData]);
        }).then(() => {
            setIsLoading(false);
        })
    }
    const handleChangeCategory = (e) => {
        setCurrentMonth("");
        console.log(e.target.value);
        setDataCategory(e.target.value);
        if ("week" === e.target.value) {
            let now = new Date();
            let start = new Date(new Date(now).setDate(now.getDate() - 6));
            start.setHours(0, 0, 0, 0);
            let end = new Date();
            end.setHours(23, 59, 59, 999);
            axios.get('http://localhost:5000/tasks/getTask', {
                params: {
                    user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress,
                    start: start,
                    end: end
                }
            }).then(result => {
                const data = result.data.result;
                const newData = formatData(data);
                console.log(data);
                setIsLoading(true);
                setTaskData(newData);
            }).then(() => {
                setIsLoading(false);
            })
        } else if ("today" === e.target.value) {
            fetchData();
        }

    }
    const handleMonthlyData = (e) => {
        console.log(e.target.value);
        setCurrentMonth(e.target.value);
        let start = new Date(e.target.value);
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        let end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        console.log(start, end)
        axios.get('http://localhost:5000/tasks/getTask', {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress,
                start: start,
                end: end
            }
        }).then(result => {
            const data = result.data.result;
            const newData = formatData(data);
            console.log(data);
            setIsLoading(true);
            setTaskData(newData);
        }).then(() => {
            setIsLoading(false);
        })
    }
    useEffect(fetchData, [])
    if (isLoading) {
        return (<div>Loading...</div>);
    } else {
        return (
            <div className="container-fluid my-4">
                <div className="row">
                    <div className="col-6 d-flex">
                        <select className="form-select w-25" value={dataCategory} onChange={(e) => handleChangeCategory(e)} >
                            <option value="today">Today</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select >
                        {dataCategory === "month" && <input type="month" className="form-control w-25 mx-5" value={currentMonth} onChange={(e) => handleMonthlyData(e)} />}
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <button className="btn add-task-btn rounded-pill" onClick={() => { setVisibility(true) }}>Add Task</button>
                    </div>
                </div>
                <div className="row mt-4 ">
                    {taskData && <DragNDrop mainData={taskData} setIsLoading={setIsLoading} fetchData={fetchData} dataCategory={dataCategory} setDataCategory={setDataCategory} />}
                </div>
                {modal === true ? <TaskModal setVisibility={setVisibility} setIsLoading={setIsLoading} fetchData={fetchData} /> : " "}
            </div>
        );
    }
}

export default Tasks;