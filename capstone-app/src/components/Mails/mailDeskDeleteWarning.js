const MailDeskDeleteWarning = ({ handleDeleteMail, seMaildeskWarning }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    return (
        <div>
            <div className="modal show fade" style={Modalstyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Warning</h5>
                            <button type="button" className="btn-close" onClick={() => seMaildeskWarning(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div>Are You Sure you want to delete this Category ?</div>
                            <div className={"d-flex justify-content-evenly mt-4"} >
                                <button type="button" className="btn btn-primary" onClick={() => handleDeleteMail()}> Yes </button>
                                <button type="button" className="btn btn-primary" onClick={() => seMaildeskWarning(false)}> No </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MailDeskDeleteWarning;