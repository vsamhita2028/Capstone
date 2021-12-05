import axios from "axios";
import { useEffect, useState } from "react";
import { Liquid } from '@ant-design/charts';

const GoalsGraph = () => {
    const [config, setConfig] = useState({})
    //const [percent, setData] = useState(0)
    const [missed, setMissed] = useState(0);
    const [progress, setProgress] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:5000/activity/goalsProductivity", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            const data = result.data.result;
            console.log(data);
            let total = 1, completed = 0, prog = 0;
            if (data["data"]) {
                total = 0;
                data["data"].forEach(element => {
                    total += element.count;
                    if (element._id === "Completed") {
                        completed = element.count;
                    }
                    if (element._id === "In Progress") {
                        prog = element.count;
                    }
                });
            }
            if (total === 0) total = 1;
            let percentage = completed / total;
            let val = parseInt((prog / total) * 100);
            setProgress(val);
            //setData(percentage);
            setConfig({
                percent: percentage,
                shape: (x, y, width, height) => {
                    const path = [];
                    const w = Math.min(width, height);

                    for (let i = 0; i < 5; i++) {
                        path.push([
                            i === 0 ? 'M' : 'L',
                            (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
                            (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
                        ]);
                        path.push([
                            'L',
                            (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
                            (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
                        ]);
                    }

                    path.push(['Z']);
                    return path;

                },
                outline: {
                    border: 5,
                    distance: 1,
                    style: {
                        stroke: '#FFC100',
                        strokeOpacity: 0.65,
                    },
                },
                wave: {
                    length: 128,
                },
                theme: {
                    styleSheet: {
                        brandColor: '#FAAD14',
                    },
                },

            })
            setMissed(data["missed"]);
            setIsLoading(false);
        })
    }, [])
    if (isLoading) {
        return (<div className="d-flex justify-content-center align-items-center" style={{ padding: 0, margin: 0, height: "inherit" }}>
            <lottie-player src="https://assets7.lottiefiles.com/private_files/lf30_v3Lu1q.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
        </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 goals-container p-1">
                        <Liquid {...config} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 fw-bold lh-1" style={{ padding: 0, margin: 0 }} >
                        <div className="row" >
                            <div className="col-3 d-flex align-items-center" style={{ padding: 0, margin: 0 }}>
                                <span className="fs-4 text-success ps-2 ">{progress}%</span>
                            </div>
                            <div className="col-9" >
                                <span style={{ fontSize: "10px" }}>You can earn more badges faster by completing the milestones you have started.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 fw-bold lh-1" style={{ padding: 0, margin: 0 }} >
                        <div className="row" >
                            <div className="col-3 d-flex justify-content-center align-items-center " style={{ padding: 0, margin: 0 }}>
                                <span className="fs-4 text-danger  ps-2 ">{missed}</span>
                            </div>
                            <div className="col-9" >
                                <span style={{ fontSize: "10px" }}>Retry the milestones you have missed.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default GoalsGraph;