import { IconContext } from "react-icons/lib";
import { TiWarning } from "react-icons/ti";
const MailDeskDeleteWarning = ({ handleDeleteMail, seMaildeskWarning }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    return (
        <div>
            <div className="modal show fade" style={Modalstyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="container p-4">
                            <div className="row">
                                <div className="col-12">
                                    <button type="button" className="btn-close float-end" onClick={() => seMaildeskWarning(false)}></button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <div className="fs-4 fw-bold">Delete Mail Desk ?</div>
                                    <div className="mt-3">Are You Sure you want to delete this Mail Desk ?</div>
                                    <div>You cannot undo this action.</div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <div className="warning-conatiner">
                                        <div className="row p-3">
                                            <div className="col-1">
                                                <IconContext.Provider value={{ color: "#d75e4f", size: "1.5em" }}>
                                                    <TiWarning />
                                                </IconContext.Provider>
                                            </div>
                                            <div className="col-11">
                                                <div className="fs-5 warning-header">Warning</div>
                                                <div className="warning-content fw-bold">
                                                    All the mails present in the mail desk will be deleted permanently.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className={"d-flex justify-content-evenly mt-4"} >
                                        <button type="button" className="btn btn-grey rounded-pill px-5 py-2" onClick={() => seMaildeskWarning(false)}> Cancel</button>
                                        <button type="button" className="btn btn-danger rounded-pill px-5 py-2" onClick={() => handleDeleteMail()}> Delete </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MailDeskDeleteWarning;