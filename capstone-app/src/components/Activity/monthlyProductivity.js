import axios from "axios";
import { useEffect, useState } from "react";
import { Column, G2 } from '@ant-design/charts';
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
const Monthly = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterData, setFilterData] = useState([]);
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
        axios.get("http://localhost:5000/activity/getMonthly", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            const dataval = result.data.result;
            console.log(dataval);
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
        isStack: true,
        xField: 'month',
        yField: 'value',
        seriesField: 'status',

        theme: 'custom-theme'
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
                    <div className="col-12 d-flex justify-content-between align-items-center ">
                        <div className="fs-1 fw-bold activity-headers">
                            Tasks
                        </div>
                        <div>
                            <input type="number" className="year-filter-inpt" min="1900" max="2099" step="1" value={currentYear} onChange={(e) => handleFilterData(e.target.value)} />
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