import axios from "axios";
import { useEffect, useState } from "react";
import "./badge.css"
const Badges = () => {
    const [badgesData, setBadgesData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/badges/", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            const data = result.data.result;
            console.log(data);
            setBadgesData(data);
        })
    }, [])
    return (
        <div className="conatiner">
            <div className="row">
                {
                    badgesData && badgesData.map((elem, idx) => {
                        return (
                            <div className="col-3 mt-3" key={idx}>
                                <div className="badge-card">
                                    {elem.badgeId}
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