import axios from "axios";
import { useState } from "react";
import "./mails.css"
const MailDeskModal = ({ categoryData, activeCategory, setIsModal, setIsLoading, fetchData }) => {
    const [mailDesk, setMailDesk] = useState({ from: "", category: activeCategory.category })
    const colors = ["#E99497", "#F3C583", "#E8E46E", "#B3E283",]
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
                        <input type="email" className="maildesk-modal-inpt" placeholder="Enter the email-id" value={mailDesk.from} onChange={(e) => setMailDesk({ ...mailDesk, from: e.target.value })} />
                        <button type="button" className="btn-close" onClick={() => setIsModal(false)}></button>
                    </div>
                    <div className="modal-body mt-1">
                        <div className="fs-5 mb-2">Category :</div>
                        {categoryData && categoryData.map((elem, idx) => (
                            <span
                                key={idx}
                                className={mailDesk.category === elem._id ? "category-pill active-category-pill" : "category-pill"}
                                style={{ backgroundColor: colors[idx % 4] }}
                                onClick={() => setMailDesk({ ...mailDesk, category: elem._id })}>{elem._id}</span>
                        ))}
                        <div className="text-center mt-3">
                            <button className="btn btn-primary" onClick={handleAddFunction} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MailDeskModal;