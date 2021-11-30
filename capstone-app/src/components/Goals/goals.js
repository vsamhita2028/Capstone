import { useEffect, useState } from "react"
import {
    ViewState
} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import GoalsModal from "./addGoalsModal";
import axios from "axios";
import GoalsOffCanvas from "./goalsOffCanvas";
import GoalsCard from "./goalsCard";
// import { BsChevronDown } from "react-icons/bs";
// [{
//     title: 'Website Re-Design Plan',
//     startDate: new Date("2021-11-23").toISOString(),
//     endDate: new Date("2021-11-23").toISOString(),
//     badgeId: "1",
//     color: "#E99497"
// },
// {
//     title: 'Website',
//     startDate: new Date(2021, 10, 21),
//     endDate: new Date(2021, 10, 22),
//     badgeId: "1",
//     color: "#F3C583"
// }]


const Goals = () => {
    let today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    const [schedulerData, setSchdulerData] = useState([]);
    const [currentDate, setCurrentDate] = useState(today);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editGoalsView, setEditGoalsView] = useState(false);
    const [editGoalsData, setEditGoalsData] = useState([]);
    const handleCurrentDate = (currentDate) => {
        console.log(currentDate);
        setCurrentDate(currentDate);
    }
    const fetchData = () => {
        axios.get("http://localhost:5000/goals", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        })
            .then(result => {
                let data = result.data.result;
                console.log(data);
                setSchdulerData(data);
                setIsLoading(false);
            })
    }
    useEffect(fetchData, [])
    const Appointment = ({
        children, style, ...restProps
    }) => (
        <Appointments.Appointment

            {...restProps}
            style={{
                ...style,
                backgroundColor: restProps.data.color,
                borderRadius: '8px',
            }}
        >
            {children}
        </Appointments.Appointment>
    );
    const dateParser = (dateVal) => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = months[new Date(dateVal).getMonth()]
        let today = new Date(dateVal);
        let d = String(today.getDate());
        if (d > 3 && d < 21) return d + 'th ' + month;
        switch (d % 10) {
            case 1: return d + "st " + month;
            case 2: return d + "nd " + month;
            case 3: return d + "rd " + month;
            default: return d + "th " + month;
        }
        // let today = new Date(dateVal);
        // let dd = String(today.getDate());
        // let mm = String(today.getMonth() + 1); //January is 0!
        // let yyyy = today.getFullYear();
        // today = english_ordinal_suffix(dd);
        // return today;
    }
    if (isLoading) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
            <div className="row mt-2" >
                <div className="col-4">
                    <div className={"row"}>
                        <div className="col-12 mt-3 d-flex justify-content-between">
                            <span className="fs-4">Monthly Milestones</span>
                            <button className="btn btn-primary float-end" onClick={() => setModalVisibility(true)} > Add </button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="goal-data-scrl">
                                <GoalsCard schedulerData={schedulerData}
                                    setEditGoalsView={setEditGoalsView}
                                    setEditGoalsData={setEditGoalsData}
                                    dateParser={dateParser} setIsLoading={setIsLoading}
                                    fetchData={fetchData} currentDate={currentDate} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 pe-2" style={{ margin: 0, padding: 0 }}>
                    <div className="calender-container">
                        <Scheduler
                            data={schedulerData}
                            height={700}
                        >
                            <ViewState
                                defaultCurrentDate={today}
                                currentDate={currentDate}
                                onCurrentDateChange={handleCurrentDate}
                            />
                            <MonthView style={{ overflowY: "hidden" }} />
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                            <Appointments
                                appointmentComponent={Appointment} />
                        </Scheduler>
                    </div>

                </div>
            </div>
            {modalVisibility && <GoalsModal setModalVisibility={setModalVisibility} fetchData={fetchData} setIsLoading={setIsLoading} today={today} />}
            {editGoalsView && <GoalsOffCanvas setEditGoalsView={setEditGoalsView} editGoalsData={editGoalsData} setIsLoading={setIsLoading} fetchData={fetchData} />}
        </div>
    );
}

export default Goals;
