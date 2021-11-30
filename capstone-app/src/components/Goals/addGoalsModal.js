import { useState } from "react";
import "./goals.css"
import axios from "axios";
const GoalsModal = ({ setModalVisibility, fetchData, setIsLoading, today }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    const [milestoneData, setMileStoneData] = useState({
        user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress,
        title: '',
        startDate: today,
        endDate: today,
        badgeId: "",
        color: "",
        status: "Not Started"
    })
    const badges = [{ url: "https://assets2.lottiefiles.com/private_files/lf30_jfhmdmk5.json", id: 0 }, { url: "https://assets8.lottiefiles.com/packages/lf20_i4zw2ddg.json", id: 1 }, { url: "https://assets3.lottiefiles.com/packages/lf20_iYAdl2.json", id: 2 }, { url: "https://assets3.lottiefiles.com/packages/lf20_JV7NOY.json", id: 3 }, { url: "https://assets3.lottiefiles.com/private_files/lf30_p9cis9ii.json", id: 4 }];
    const colors = ["#E99497", "#F3C583", "#E8E46E", "#B3E283"];
    const handelSubmit = () => {
        console.log(milestoneData);
        axios.post("http://localhost:5000/goals", milestoneData)
            .then((result) => {
                console.log(result)
                setModalVisibility(false);
                setIsLoading(true);
            }).then(() => {
                fetchData();
            })
    }
    return (
        <div>
            <div className="modal show fade" style={Modalstyle}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <input type="text" className="goals-modal-inpt w-75" placeholder="Title..." onChange={(e) => setMileStoneData({ ...milestoneData, title: e.target.value })} value={milestoneData.title} />
                            <button type="button" className="btn-close" onClick={() => setModalVisibility(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <input type="date" className="goals-date-picker" placeholder="Start Date" value={milestoneData.startDate} onChange={(e) => setMileStoneData({ ...milestoneData, startDate: e.target.value })} />
                                </div>
                                <div className="col-6">
                                    <input type="date" className="goals-date-picker" placeholder="End Date" value={milestoneData.endDate} onChange={(e) => setMileStoneData({ ...milestoneData, endDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                {badges && badges.map((elem, idx) => {
                                    return (
                                        <div className="col-2" key={idx}>
                                            <div
                                                onClick={() => setMileStoneData({ ...milestoneData, badgeId: elem.id })}
                                                className={milestoneData.badgeId === elem.id ? "badge-box activeclass" : "badge-box"}>
                                                {elem.id}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 d-flex">
                                    {colors && colors.map((elem, idx) => {
                                        return (
                                            <div
                                                key={idx}
                                                style={{ backgroundColor: elem }}
                                                onClick={() => setMileStoneData({ ...milestoneData, color: elem })}
                                                className={milestoneData.color === elem ? "rounded-circle goals-color-circle mx-1 p-3 activeclass" : "rounded-circle goals-color-circle mx-1 p-3"}></div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mt-3 d-flex justify-content-center">
                                    <button className="btn btn-primary" onClick={handelSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalsModal;