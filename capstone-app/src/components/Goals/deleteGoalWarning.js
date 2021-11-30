const GoalDeleteWarning = ({ handleDeleteGoal, setGoalWarning, deleteId }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    return (
        <div>
            <div className="modal show fade" style={Modalstyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Warning</h5>
                            <button type="button" className="btn-close" onClick={() => setGoalWarning(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div>Are You Sure you want to delete the Milestone with title :<span className="fw-bold"> {deleteId.title} </span>?</div>
                            <div className={"d-flex justify-content-evenly mt-4"} >
                                <button type="button" className="btn btn-primary" onClick={(e) => handleDeleteGoal()}> Yes </button>
                                <button type="button" className="btn btn-primary" onClick={() => setGoalWarning(false)}> No </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalDeleteWarning;