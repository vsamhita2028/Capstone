import axios from "axios";
import { useEffect, useState } from "react";
import "./badge.css"
import badge1 from "../../images/medal1.png"
import badge2 from "../../images/medal2.png"
import badge3 from "../../images/medal3.png"
import badge4 from "../../images/medal4.png"
import badge5 from "../../images/medal5.png"
const Badges = () => {
    let badges = [badge1, badge2, badge3, badge4, badge5]
    const [badgesData, setBadgesData] = useState([]);
    const [filteredBadges, setFilteredBadges] = useState([]);
    const [dateFilter, setDateFilter] = useState("");
    const filterData = (date) => {
        setDateFilter(date);
        if (date) {
            console.log(date);
            const data = badgesData;
            const filterData = []
            data.forEach((elem, idx) => {
                const filterMonth = new Date(date).getMonth();
                const currMonth = new Date(elem.startDate).getMonth();
                const filterYear = new Date(date).getFullYear();
                const currYear = new Date(elem.startDate).getFullYear();
                //console.log(filterMonth, currMonth)
                if (filterMonth === currMonth && filterYear === currYear) {
                    filterData.push(elem);
                }
            });
            setFilteredBadges(filterData);
        } else {
            setFilteredBadges(badgesData);
        }
    }
    useEffect(() => {
        axios.get("http://localhost:5000/badges/", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            const data = result.data.result;
            console.log(data);
            setBadgesData(data);
            setFilteredBadges(data);
        })
    }, [])
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="fs-1 badges-header">Badges Earned</div>
                    <div><input type="month" className="date-filter" value={dateFilter} onChange={(e) => filterData(e.target.value)} /> </div>
                </div>
            </div>
            <div className="row">
                {
                    filteredBadges && filteredBadges.map((elem, idx) => {
                        return (
                            <div className="col-3 mt-3" key={idx}>
                                <div className="badge-card m-3 p-3">
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-center align-items-center">
                                            <div className="">
                                                <img src={badges[elem.badgeId]} alt="img" height="100" width="100" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12 d-flex justify-content-center fs-4 fw-bold">
                                            {elem.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default Badges;