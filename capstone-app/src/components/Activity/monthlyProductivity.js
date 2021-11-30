import axios from "axios";
import { useEffect, useState } from "react";
import { Column } from '@ant-design/charts';
const Monthly = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/activity/getMonthly", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            const data = result.data.result;
            console.log(data);
            setData(data);
        })
    }, [])
    const config = {
        data,
        isStack: true,
        xField: 'month',
        yField: 'value',
        seriesField: 'status',
        label: {
            position: 'middle',
            layout: [
                {
                    type: 'interval-adjust-position',
                },
                {
                    type: 'interval-hide-overlap',
                },
                {
                    type: 'adjust-color',
                },
            ],
        },
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1 fs-1 fw-bold">
                    <div className="monthly-progress-header">
                        Tasks
                    </div>
                </div>
                <div className="col-11 ">
                    <div className="mothly-progress-cotainer">
                        <Column {...config} />
                    </div>
                </div>
            </div>
        </div>);
}

export default Monthly;