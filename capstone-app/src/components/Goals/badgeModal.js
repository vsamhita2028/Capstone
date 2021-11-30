const BadgeModal = ({ setBadgeModal, handleCloseCompletedModal }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    const close = () => {
        setBadgeModal(false);
        handleCloseCompletedModal();
    }
    return (
        <div>
            <div className="modal show fade" style={Modalstyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" onClick={() => close()}></button>
                        </div>
                        <div className="modal-body">
                            <h1>Congratulations!!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BadgeModal;