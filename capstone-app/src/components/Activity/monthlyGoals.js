import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from '@ant-design/charts';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
// import { DualAxes } from '@ant-design/charts';
// const MonthlyGoals = () => {
//     const [data, setData] = useState([])
//     useEffect(() => {
//         axios.get("http://localhost:5000/activity/getMonthlyGoals", {
//             params: {
//                 user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
//             }
//         }).then((result) => {
//             const data = result.data.result;
//             console.log(data);
//             data.sort((a, b) => parseFloat(a.idx) - parseFloat(b.idx));
//             setData(data);
//         })
//     }, [])
//     const config = {
//         data: [data, data],
//         xField: 'month',
//         yField: ['Total Milestones', 'Completed'],
//         geometryOptions: [
//             {
//                 geometry: 'line',
//                 smooth: true,
//                 color: '#5B8FF9',
//                 lineStyle: {
//                     lineWidth: 3,
//                 },
//             },
//             {
//                 geometry: 'line',
//                 smooth: true,
//                 color: '#5AD8A6',
//                 lineStyle: {
//                     lineWidth: 4,
//                     opacity: 0.5,
//                 },
//                 point: {
//                     shape: 'circle',
//                     size: 4,
//                     style: {
//                         opacity: 0.5,
//                         stroke: '#5AD8A6',
//                         fill: '#fff',
//                     },
//                 },
//             },
//         ],
//     };
//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-12">
//                     <div className="monthly-goals-cotainer">
//                         <DualAxes {...config} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
const MonthlyGoals = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    // const [value, setValue] = useState(new Date());
    useEffect(() => {
        axios.get("http://localhost:5000/activity/getMonthlyGoals", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            const data = result.data.result;
            console.log(data);
            data.sort((a, b) => parseFloat(a.idx) - parseFloat(b.idx));
            setData(data);
            setIsLoading(false)
        })
    }, [])
    const config = {
        data,
        xField: 'month',
        yField: 'value',
        seriesField: 'status',
        yAxis: {
            label: {
                formatter: (v) => `${v}`,
            },
        },
        xAxis: {
            nice: true,
            // tickCount: 8,
            // 文本标签
            label: {
                // autoRotate: false,
                rotate: -Math.PI / 2,
                offset: 30,
                style: {
                    fill: '#aaa',
                    fontSize: 12,
                },
            }
        },
        legend: {
            position: 'top',
        },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };
    if (isLoading) {
        return (<div className="d-flex justify-content-center align-items-center" style={{ padding: 0, margin: 0, height: "inherit" }}>
            <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_yktu4ozm.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></lottie-player>
        </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="fs-1 fw-bold">Goals</div>
                        <div>
                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year']}
                                    label="Year only"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                />
                            </LocalizationProvider> */}
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <div className="monthly-goals-cotainer">
                            <Line {...config} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default MonthlyGoals;