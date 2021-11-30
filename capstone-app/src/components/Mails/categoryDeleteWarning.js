const CategoryDeleteWarning = ({ setDeleteWarning, handleDeleteCategory }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    return (
        <div>
            <div className="modal show fade" style={Modalstyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryDeleteWarning;