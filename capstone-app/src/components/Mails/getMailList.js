import { useEffect, useState } from "react";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import "./mails.css"
import TaskModal from "./taskMailModal";
// import parse from 'html-react-parser';
var parseMessage = require('gmail-api-parse-message');


const MailList = ({ from, setGetMailList }) => {
    const mailCardStyle = "mail-subject-card d-flex justify-content-between align-items-center";
    const [mailData, setMailData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nullCase, setNullCase] = useState(false);
    const [selectedMail, setSelectedMail] = useState()
    const [taskModalVisibility, setModalVisibility] = useState(false)
    useEffect(() => {
        console.log(from);
        axios.get("http://localhost:5000/mails/getMails", {
            params: {
                token: JSON.parse(localStorage.getItem("token")).data.token,
                from: from
            }
        }).then((result) => {
            console.log("hi")
            console.log(result);
            let data = []
            if (result.data.msg.length !== 0) {
                result.data.msg.forEach(element => {
                    var val = parseMessage(element.data);
                    data.push(val)
                });
                setMailData(data)
                setSelectedMail(data[0])
            } else {
                setNullCase(true);
            }
            setIsLoading(false);
        })
    }, [from])
    const dateParser = (dateVal) => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = months[new Date(dateVal).getMonth()]
        let today = new Date(dateVal);
        let d = String(today.getDate());
        return d + " " + month
    }
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5" style={{ padding: 0, margin: 0, height: "inherit" }}>
                <lottie-player src="https://assets3.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json" background="transparent" speed="1" style={{ width: "550px", height: "550px" }} loop autoplay></lottie-player>
            </div>
        )
    }
    else if (nullCase) {
        return (
            <div className="row mt-5" style={{ height: "100%" }}>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between">
                                <span onClick={() => setGetMailList(null)} className="pointer fs-1 ms-5"><BiArrowBack /></span>
                                <span className="fs-1"></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                                <div>
                                    <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_QKRDTQ.json" background="transparent" speed="1" style={{ width: "550px", height: "550px" }} loop autoplay></lottie-player>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="row mt-1 hideScrollBar">
            <div className="col-3" style={{ margin: 0, padding: 0 }}>
                <div className="row mt-3 mx-2">
                    <div className="col-6">
                        <div className="d-flex align-items-center fs-5 fw-bold" >
                            <span onClick={() => setGetMailList(null)} className="pointer"><BiArrowBack /></span>
                            <span className="mx-3 inbox-headers">Inbox</span>
                        </div>
                    </div>
                    <div className="col-6">
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 card-header-divider">
                        {mailData.map((elem, idx) => (
                            <div key={idx}
                                className={selectedMail && elem.id === selectedMail.id ? mailCardStyle + " bg-white" : mailCardStyle}
                                onClick={() => setSelectedMail(elem)} >
                                <span class="text-truncate fw-bold" style={{ maxWidth: "200px" }}>{elem.headers.subject}</span>
                                <div>
                                    {dateParser(elem.headers.date)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-9 mail-view" style={{ padding: 0, margin: 0 }}>
                <div className="data_scrl">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col-10 subject-line pb-4">
                                    <div className="fs-2 fw-bold">{selectedMail && selectedMail.headers.subject}</div>
                                </div>
                                <div className="col-2">
                                    <button className="btn addTask-btn rounded-pill float-end px-4 py-3 fw-bold" onClick={() => setModalVisibility(true)}>Add Task</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 mt-4">

                            {selectedMail && <div dangerouslySetInnerHTML={{ __html: selectedMail.textHtml }} />}
                        </div>
                    </div>
                </div>
            </div>
            {taskModalVisibility && <TaskModal setVisibility={setModalVisibility} />}
        </div>
    );
}

export default MailList;
/* {htmlToReact()} */
/* {mailData.map((elem, idx) => (
                        <div key={idx} className="mb-3">
                            <div dangerouslySetInnerHTML={{ __html: elem.textHtml }} />
                        </div>
                    ))} */