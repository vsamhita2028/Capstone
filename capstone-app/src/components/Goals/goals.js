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
import badge1 from "../../images/medal1.png"
import badge2 from "../../images/medal2.png"
import badge3 from "../../images/medal3.png"
import badge4 from "../../images/medal4.png"
import badge5 from "../../images/medal5.png"
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
    let badges = [{ url: badge1, id: 0 }, { url: badge2, id: 1 }, { url: badge3, id: 2 }, { url: badge4, id: 3 }, { url: badge5, id: 4 }]
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
        return (
            <div className="d-flex justify-content-center align-items-center mt-5" style={{ padding: 0, margin: 0, height: "inherit" }}>
                <lottie-player src="https://assets3.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json" background="transparent" speed="1" style={{ width: "550px", height: "550px" }} loop autoplay></lottie-player>
            </div>
        )
    }
    return (
        <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
            <div className="row mt-2" >
                <div className="col-4">
                    <div className={"row px-2"}>
                        <div className="col-12 mt-3 d-flex justify-content-between">
                            <span className="fs-2 goals-header">Monthly Milestones</span>
                            <button className="btn rounded-pill float-end add-goals-btn" onClick={() => setModalVisibility(true)} > Add </button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="goal-data-scrl">
                                <GoalsCard schedulerData={schedulerData}
                                    setEditGoalsView={setEditGoalsView}
                                    setEditGoalsData={setEditGoalsData}
                                    dateParser={dateParser} setIsLoading={setIsLoading}
                                    fetchData={fetchData} currentDate={currentDate} badges={badges} />
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
            {modalVisibility && <GoalsModal setModalVisibility={setModalVisibility} fetchData={fetchData} setIsLoading={setIsLoading} today={today} badges={badges} />}
            {editGoalsView && <GoalsOffCanvas setEditGoalsView={setEditGoalsView} editGoalsData={editGoalsData} setIsLoading={setIsLoading} fetchData={fetchData} today={today} badges={badges} />}
        </div>
    );
}

export default Goals;

