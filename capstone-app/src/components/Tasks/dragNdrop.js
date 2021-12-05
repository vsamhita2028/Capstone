import axios from "axios";
import { useRef, useState } from "react";
import { RiSubtractFill } from "react-icons/ri";
import { IconContext } from "react-icons";
// import { GrSubtractCircle } from "react-icons/gr"
import "./tasks.css"
import ViewTaskCard from "./viewTaskCard";
const DragNDrop = ({ mainData, setIsLoading, fetchData, dataCategory, setDataCategory }) => {
    const [taskData, setTaskData] = useState(mainData)
    const [offCanvas, setOffCanvas] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();
    const updateStatusItem = useRef();
    const [viewCardData, setViewCardData] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartFunction = (e, params) => {
        dragItem.current = params
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', dragEndFunction);
        setTimeout(() => {
            setIsDragging(true);
        }, 0)
    }

    const dragEnterFunction = (e, params) => {
        if (dragNode.current !== e.target) {
            const current = dragItem.current
            updateStatusItem.current = { _id: taskData[current.grpIdx].tasks[current.taskIdx]._id, status: params.grpIdx }
            setTaskData(oldData => {
                let newData = JSON.parse(JSON.stringify(oldData));
                newData[params.grpIdx].tasks.splice(params.taskIdx, 0, newData[current.grpIdx].tasks.splice(current.taskIdx, 1)[0])
                dragItem.current = params
                return newData;
            })
        }
    }
    const dragEndFunction = () => {
        const current = updateStatusItem.current;
        const id = current._id;
        let status = "";
        if (current.status === 0) status = "Not Started"
        else if (current.status === 1) status = "In progress"
        else status = "Completed"
        axios.put("http://localhost:5000/tasks/updateTaskStatus", { _id: id, status: status })
            .then((result) => {
                setIsDragging(false);
                dragNode.current.removeEventListener('dragend', dragEndFunction);
                dragItem.current = null
                dragItem.current = null
            })
    }
    const updateStyle = (params) => {
        if (dragItem.current.grpIdx === params.grpIdx && dragItem.current.taskIdx === params.taskIdx) {
            return "task-card p-3 mb-4 draggedItem"
        }
        return "task-card p-3 mb-4"
    }
    const handleOffCanvas = (e, params) => {
        let data = JSON.parse(JSON.stringify(taskData[params.grpIdx].tasks[params.taskIdx]));
        let startDate = new Date(data["startDate"]);
        let datetext = startDate.toTimeString();
        data["startDate"] = datetext.split(' ')[0];
        let endDate = new Date(data["endDate"]);
        datetext = endDate.toTimeString();
        data["endDate"] = datetext.split(' ')[0];
        let newDate = new Date(data["date"]);
        let mm = (newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)
        let dd = (newDate.getDate()) < 10 ? "0" + (newDate.getDate()) : (newDate.getDate())
        data["date"] = newDate.getFullYear() + "-" + mm + "-" + dd;
        setViewCardData(data);
        setOffCanvas(true);
    }
    const handleDeleteTask = (e, params) => {
        axios.delete("http://localhost:5000/tasks/deleteTask", {
            data: {
                _id: taskData[params.grpIdx].tasks[params.taskIdx]._id
            }
        }).then((result) => {
            setIsLoading(true);
        }).then(() => {
            fetchData();
        })
    }
    const timeParser = (time) => {
        let date = new Date(time);
        let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return hh + ":" + mm;
    }
    const dateParser = (dateString) => {
        let date = new Date(dateString);
        let dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let mm = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        return dd + "-" + mm + "-" + date.getFullYear();
    }
    return (
        <div className="row">
            {taskData && taskData.map((grpElem, grpIdx) => (
                <div key={grpIdx} className="col-4">
                    <div
                        className="status-col-util"
                        onDragEnter={isDragging && !grpElem.tasks.length ? (e) => dragEnterFunction(e, { grpIdx, taskIdx: 0 }) : null}
                    >
                        <div className="p-2 mb-3">
                            <div className="main-heading p-3">{grpElem._id}</div>
                            {grpElem.tasks.length === 0 &&
                                <div>
                                    <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_eJkC1J.json" background="transparent" speed="1" style={{ width: 300, height: 300 }}></lottie-player>
                                </div>
                            }
                        </div>
                        {grpElem.tasks && grpElem.tasks.map((taskElem, taskIdx) => (
                            <div
                                className={isDragging ? updateStyle({ grpIdx, taskIdx }) : "task-card p-3 mb-4 mx-2"}
                                draggable
                                key={taskIdx}
                                onDragStart={(e) => dragStartFunction(e, { grpIdx, taskIdx })}
                                onDragEnter={(e) => dragEnterFunction(e, { grpIdx, taskIdx })}
                            >
                                <div className="task-header d-flex justify-content-between">
                                    <span onClick={(e) => handleOffCanvas(e, { grpIdx, taskIdx })}>{taskElem.title}</span>
                                    <div onClick={(e) => handleDeleteTask(e, { grpIdx, taskIdx })}>
                                        <IconContext.Provider value={{ className: "task-delete-btn", size: "25px", color: "white" }}>
                                            <RiSubtractFill />
                                        </IconContext.Provider>
                                    </div>
                                </div>
                                <div className="task-description mt-3" onClick={(e) => handleOffCanvas(e, { grpIdx, taskIdx })}>
                                    <div className="text-truncate" style={{ maxWidth: "inherit" }}>{taskElem.description}</div>
                                </div>
                                <div className="d-flex justify-content-between mt-3" onClick={(e) => handleOffCanvas(e, { grpIdx, taskIdx })}>
                                    {dataCategory !== "today" && <div onClick={(e) => handleOffCanvas(e, { grpIdx, taskIdx })}>
                                        {dateParser(taskElem.date)}
                                    </div>}
                                    <div>
                                        {timeParser(taskElem.startDate)} to {timeParser(taskElem.endDate)}
                                    </div>
                                </div>

                            </div>
                        ))
                        }
                    </div>
                </div>
            ))}
            {offCanvas && viewCardData && <ViewTaskCard setOffCanvas={setOffCanvas} viewCardData={viewCardData} setViewCardData={setViewCardData} setIsLoading={setIsLoading} fetchData={fetchData} setDataCategory={setDataCategory} />}
        </div>
    );
}

export default DragNDrop;