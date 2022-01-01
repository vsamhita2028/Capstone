import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from "axios";
import { useEffect, useState } from 'react';
import "./activity.css";
import GoalsGraph from './goalsProductivity';
import MonthlyGoals from './monthlyGoals';
import Monthly from './monthlyProductivity';
import Productivity from './productivityGraph';
const Activity = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let start = new Date();
        start.setHours(0, 0, 0, 0);
        let end = new Date();
        end.setHours(23, 59, 59, 999);
        axios.get('http://localhost:5000/activity/getTasks', {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress,
                start: start,
                end: end
            }
        }).then((result) => {
            const data = result.data.result;
            console.log(data);
            setData(data);
            setIsLoading(false);
        })
    }, [])
    const Appointment = ({
        children, style, ...restProps
    }) => (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: '#B590CA',
                borderRadius: '8px',
            }}
        >
            {children}
        </Appointments.Appointment>
    );
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5" style={{ padding: 0, margin: 0, height: "inherit" }}>
                <lottie-player src="https://assets3.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json" background="transparent" speed="1" style={{ width: "550px", height: "550px" }} loop autoplay></lottie-player>
            </div>
        )
    } else {
        return (
            <div className="container-fluid" style={{ padding: 0 }}>
                <div className="row ms-1" >
                    <div className="col-4 mt-2">
                        <div className="row">
                            <div className="col-12 calendar-card" style={{ padding: 5 }}>
                                <div className="row p-3">
                                    <div className="col-12 fs-1 px-3 fw-bold activity-headers">
                                        Schedule
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="calender-scrl pe-4">
                                            <Scheduler
                                                data={data}
                                            >
                                                <DayView
                                                    startDayHour={0}
                                                    endDayHour={24}
                                                />
                                                <Appointments
                                                    appointmentComponent={Appointment} />
                                                <AppointmentTooltip />
                                            </Scheduler>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-3" style={{ paddingRight: 0 }}>
                                <div className="row-1-cards mt-2 pt-4">
                                    <Productivity />
                                </div>
                            </div>
                            <div className="col-3" style={{ paddingRight: 0 }}>
                                <div className="row-1-cards mt-2">
                                    <GoalsGraph />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row-1-cards mt-2 p-2">
                                    <MonthlyGoals />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="row-2-cards mt-2 p-3" style={{ height: "19em" }}>
                                    <Monthly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Activity;