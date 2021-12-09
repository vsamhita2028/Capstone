import { IconContext } from "react-icons/lib";
import { TiWarning } from "react-icons/ti";
const CategoryDeleteWarning = ({ setDeleteWarning, handleDeleteCategory }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    return (
        <div>
            <div className="modal show fade" style={Modalstyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="container p-4">
                            <div className="row">
                                <div className="col-12">
                                    <button type="button" className="btn-close float-end" onClick={() => setDeleteWarning(false)}></button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <div className="fs-4 fw-bold">Delete Category ?</div>
                                    <div className="mt-3">Are You Sure you want to delete this Category ?</div>
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
                                                    All the Mail Desks present in the current category will be deleted permanently.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className={"d-flex justify-content-evenly mt-4"} >
                                        <button type="button" className="btn btn-grey rounded-pill px-5 py-2" onClick={() => setDeleteWarning(false)}> Cancel</button>
                                        <button type="button" className="btn btn-danger rounded-pill px-5 py-2" onClick={() => handleDeleteCategory()}> Delete </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-content">
                        <div className="modal-header">
                            <h5>Warning</h5>
                            <button type="button" className="btn-close" onClick={() => setDeleteWarning(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div>Are You Sure you want to delete this Category ?</div>
                            <div className='text-danger'>Deleting this category means, deleting all the mail desks under this category.</div>
                            <div className={"d-flex justify-content-evenly mt-4"} >
                                <button type="button" className="btn btn-primary" onClick={() => handleDeleteCategory()}> Yes </button>
                                <button type="button" className="btn btn-primary" onClick={() => setDeleteWarning(false)}> No </button>
                            </div>

                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    );
}

export default CategoryDeleteWarning;