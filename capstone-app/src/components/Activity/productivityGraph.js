import axios from "axios";
import { useEffect, useState } from "react";
import { RingProgress } from '@ant-design/charts';
import { RiStarSmileFill } from "react-icons/ri";
const Productivity = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [percentage, setpercentage] = useState({});
    const [data, setData] = useState(0);
    const [yesProductivity, setYesProductivity] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:5000/activity/productivity", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            let data = result.data.result;
            console.log(data, "hi");
            let Todaytotal = 0, Todaycompleted = 0, Todayprog = 0;
            let yestotal = 0, yescompleted = 0;
            if (data["today"]) {
                data["today"].forEach(element => {
                    Todaytotal += element.count;
                    if (element._id === "Completed") {
                        Todaycompleted = element.count;
                    }
                    else if (element._id === "In progress") {
                        Todayprog = element.count;
                    }
                });
            }
            if (data["yesterday"]) {
                yestotal = 0;
                data["yesterday"].forEach(element => {
                    yestotal += element.count;
                    if (element._id === "Completed") {
                        yescompleted = element.count;
                    }
                });
            }
            if (Todaytotal === 0) Todaytotal = 1;
            if (yestotal === 0) yestotal = 1;
            const val = parseInt((Todayprog / Todaytotal) * 100);
            const perc = Todaycompleted / Todaytotal;
            const val2 = parseInt(((perc) - (yescompleted / yestotal)) * 100);
            console.log("val", perc);
            console.log(val2)
            setData(val);
            setYesProductivity(val2);
            setpercentage(perc)
            setIsLoading(false);

        })
    }, [])

    let config = {
        autoFit: true,
        percent: percentage,
        color: ['#F4664A', '#E8EDF3'],
        innerRadius: 0.85,
        radius: 0.98,
        statistic: {
            title: {
                style: {
                    color: '#363636',
                    fontSize: '12px',
                    lineHeight: '14px',
                },
                formatter: () => 'Productivity',
            },
        },
    }
    if (isLoading) {
        config = {
            autoFit: true,
            percent: percentage,
            color: ['#F4664A', '#E8EDF3'],
            innerRadius: 0.85,
            radius: 0.98,
            statistic: {
                title: {
                    style: {
                        color: '#363636',
                        fontSize: '12px',
                        lineHeight: '14px',
                    },
                    formatter: () => 'Productivity',
                },
            },
        }
        return (<div className="d-flex justify-content-center align-items-center" style={{ padding: 0, margin: 0, height: "inherit" }}>
            <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_yktu4ozm.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
        </div>)
    } else {
        return (
            <div className="container-fluid">
                <div className="row" style={{ padding: 0, margin: 0 }}>
                    <div className="col-12 progress-container" style={{ padding: 0, margin: 0 }}>
                        <RingProgress {...config} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 fw-bold lh-1" style={{ padding: 0, margin: 0 }} >
                        <div className="row" >
                            <div className="col-3 d-flex align-items-center justify-content-center" style={{ padding: 0, margin: 0 }}>
                                <span className="fs-4 text-success ps-2 ">{data}%</span>
                            </div>
                            <div className="col-9" >
                                <span style={{ fontSize: "10px" }}>Complete the tasks you have started and boost your productivity.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 fw-bold lh-1" style={{ padding: 0, margin: 0 }} >
                        <div className="row" >
                            <div className="col-3 d-flex align-items-center justify-content-center" style={{ padding: 0, margin: 0 }}>
                                {yesProductivity > 0 && <span className="fs-4 text-success">{yesProductivity}%</span>}
                                {yesProductivity < 0 && <span className="fs-4 text-danger">{-1 * yesProductivity}%</span>}
                                {yesProductivity === 0 && <span className="fs-2 text-warning ">
                                    <RiStarSmileFill />
                                </span>}
                            </div>
                            <div className="col-9" >
                                {yesProductivity > 0 && <span style={{ fontSize: "10px" }}>Your Productivity is higher today.</span>}
                                {yesProductivity < 0 && <span style={{ fontSize: "10px" }}>You have a lower productivity today.</span>}
                                {yesProductivity === 0 && <span style={{ fontSize: "10px" }}>Your productivity rate is constistent.</span>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Productivity;