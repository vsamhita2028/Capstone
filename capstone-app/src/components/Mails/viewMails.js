import { MdAdd } from "react-icons/md";
import { IconContext } from "react-icons";
import { useState } from "react";
import MailDeskModal from "./addMailDeskModal";
import { RiSubtractFill } from "react-icons/ri";
import MailDeskDeleteWarning from "./mailDeskDeleteWarning";
import "./mails.css"
import axios from "axios"
const ViewMails = ({ categoryData, activeCategory, setIsLoading, fetchData, setGetMailList }) => {
    const [modal, setIsModal] = useState(false);
    const [maildeskWarning, seMaildeskWarning] = useState(false);
    const [deleteMailDeskId, setDeleteMailDeskId] = useState("");
    const handleDeleteMail = () => {
        console.log(deleteMailDeskId)
        axios.delete("http://localhost:5000/mails/delete", {
            data: {
                from: deleteMailDeskId,
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            seMaildeskWarning(false);
            setIsLoading(true);
        }).then(() => {
            fetchData();
        })
    }
    return (
        <div className="row">
            {
                activeCategory.index >= 0 ? categoryData[activeCategory.index].from.map((elem, idx) => {
                    if (elem === "add") {
                        return (
                            <div key={idx} className="col-3">
                                <div className="mail-desk-cards center-elem" onClick={() => setIsModal(true)} >
                                    <div>
                                        <IconContext.Provider value={{ size: "50px", color: "#a8abc1" }}>
                                            <MdAdd />
                                        </IconContext.Provider>
                                    </div>
                                    <div className="mt-2 fw-bold">Add Mail Desk</div>
                                </div>
                            </div>
                        )

                    } else {
                        return (
                            <div key={idx} className="col-3" >
                                <div className="mail-desk-cards p-3" >
                                    <div className=" d-flex justify-content-end rounded-circle" onClick={() => { setDeleteMailDeskId(elem); seMaildeskWarning(true); }}>
                                        <div className="maildesk-delete-btn rounded-circle">
                                            <IconContext.Provider value={{ size: "25px", color: "white" }}>
                                                <RiSubtractFill />
                                            </IconContext.Provider>
                                        </div>

                                    </div>
                                    <div className="d-flex justify-content-center mt-4 mb-4" onClick={() => setGetMailList(elem)}>
                                        <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_vpzw63hs.json" background="transparent" speed="1" style={{ width: 200, height: 100 }}></lottie-player>
                                    </div>
                                    <div className="pt-2 text-center text-truncate" style={{ color: "#a8abc1" }} onClick={() => setGetMailList(elem)}>
                                        {elem}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
                    :
                    categoryData.map((elem, idx) => (
                        elem.from.map((taskElem, InnerIdx) => {
                            if (taskElem === "add" && idx === 0) {
                                return (
                                    <div key={InnerIdx} className="col-3">
                                        <div className="mail-desk-cards center-elem" onClick={() => setIsModal(true)} >
                                            <div>
                                                <IconContext.Provider value={{ size: "50px", color: "#a8abc1" }}>
                                                    <MdAdd />
                                                </IconContext.Provider>
                                            </div>
                                            <div className="mt-2 fw-bold">Add Mail Desk</div>
                                        </div>
                                    </div>
                                )
                            } else if (taskElem !== "add") {
                                return (
                                    <div key={InnerIdx} className="col-3">
                                        <div className="mail-desk-cards " >
                                            <div className="d-flex justify-content-between">
                                                <div className="fs-4 fw-bold">{elem._id}</div>
                                                <div onClick={() => { setDeleteMailDeskId(taskElem); seMaildeskWarning(true); }} >
                                                    <div className="rounded-circle maildesk-delete-btn">
                                                        <IconContext.Provider value={{ size: "25px", color: "white" }}>
                                                            <RiSubtractFill />
                                                        </IconContext.Provider>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mt-4 mb-4" onClick={() => setGetMailList(taskElem)} >
                                                <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_vpzw63hs.json" background="transparent" speed="1" style={{ width: 200, height: 100 }}></lottie-player>
                                            </div>
                                            <div className="text-center text-truncate" style={{ color: "#a8abc1" }} onClick={() => setGetMailList(taskElem)} >{taskElem}</div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return "";
                            }
                        })
                    ))
            }
            {modal && <MailDeskModal categoryData={categoryData} activeCategory={activeCategory} setIsModal={setIsModal} setIsLoading={setIsLoading} fetchData={fetchData} />}
            {maildeskWarning && <MailDeskDeleteWarning handleDeleteMail={handleDeleteMail} seMaildeskWarning={seMaildeskWarning} />}
        </div>
    );
}

export default ViewMails;