import axios from "axios";
import { useEffect, useState } from "react";
import { Line, G2 } from '@ant-design/charts';
const { registerTheme } = G2;
registerTheme('custom-theme', {
    colors10: [
        '#B590CA',
        '#D19FEB',
        '#B088F9',
    ],
    colors20: [
        '#B590CA',
        '#D19FEB',
        '#B088F9',
    ],
});
const MonthlyGoals = () => {
    const [data, setData] = useState([]);
    // const [config, setConfig] = useState()
    const [filterData, setFilterData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentYear, setCurrYear] = useState(new Date().getFullYear())
    const handleFilterData = (year) => {
        setCurrYear(year);
        let filtered = [];
        data.forEach((elem, idx) => {
            if (elem.year === parseInt(year)) {
                filtered.push(elem);
            }
        });
        setFilterData(filtered);
    }
    useEffect(() => {
        axios.get("http://localhost:5000/activity/getMonthlyGoals", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            const dataval = result.data.result;
            console.log(dataval);
            dataval.sort((a, b) => parseFloat(a.idx) - parseFloat(b.idx));
            setData(dataval);
            let filtered = [];
            dataval.forEach((elem, idx) => {
                if (elem.year === new Date().getFullYear()) {
                    filtered.push(elem);
                }
            })
            setFilterData(filtered);
            setIsLoading(false);
        })
    }, [])

    const config = {
        data: filterData,
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
        theme: 'custom-theme'
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
                        <div className="fs-1 fw-bold activity-headers">Goals</div>
                        <div>
                            <input type="number" className="year-filter-inpt" min="1900" max="2099" step="1" value={currentYear} onChange={(e) => handleFilterData(e.target.value)} />
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