import axios from "axios";
import { useState } from "react";
import "./mails.css"
const MailDeskModal = ({ categoryData, activeCategory, setIsModal, setIsLoading, fetchData }) => {
    const [mailDesk, setMailDesk] = useState({ from: "", category: activeCategory.category })
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    const handleAddFunction = () => {
        axios.post("http://localhost:5000/mails/addCategory", {
            user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress,
            from: mailDesk.from,
            category: mailDesk.category
        }).then((result) => {
            setIsModal(false);
            setIsLoading(true);
        }).then(() => {
            fetchData();
        })
    }
    return (
        <div className="modal show fade" style={Modalstyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <input type="email" className="maildesk-modal-inpt fs-4 p-1" placeholder="Enter the email-id" value={mailDesk.from} onChange={(e) => setMailDesk({ ...mailDesk, from: e.target.value })} />
                        <button type="button" className="btn-close" onClick={() => setIsModal(false)}></button>
                    </div>
                    <div className="modal-body mt-1">
                        <div className="fs-5 mb-2">Categories :</div>
                        <div className="row">
                            <div className="col-12 text-break">
                                {categoryData && categoryData.map((elem, idx) => (
                                    <span
                                        key={idx}
                                        className={mailDesk.category === elem._id ? "category-pill active-category-pill" : "category-pill "}
                                        onClick={() => setMailDesk({ ...mailDesk, category: elem._id })}>{elem._id}</span>
                                ))}
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <button className="btn add-maildsk-submit-btn rounded-pill" onClick={handleAddFunction} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MailDeskModal;