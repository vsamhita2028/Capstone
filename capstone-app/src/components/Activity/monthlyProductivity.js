import axios from "axios";
import { useEffect, useState } from "react";
import { Column } from '@ant-design/charts';
const Monthly = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:5000/activity/getMonthly", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            const data = result.data.result;
            console.log(data);
            setData(data);
            setIsLoading(false);
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
    if (isLoading) {
        return (<div className="d-flex justify-content-center align-items-center" style={{ padding: 0, margin: 0, height: "inherit" }}>
            <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_yktu4ozm.json" background="transparent" speed="1" style={{ width: "800px", height: "800px" }} loop autoplay></lottie-player>
        </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 fs-1 fw-bold">
                        <div className="">
                            Tasks
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 ">
                        <div className="mothly-progress-cotainer">
                            <Column {...config} />
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Monthly;