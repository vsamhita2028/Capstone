const BadgeModal = ({ setBadgeModal, handleCloseCompletedModal, dataforModal, badges }) => {
    const Modalstyle = { display: "block", backgroundColor: 'rgba(0,0,0,0.8)' }
    const close = () => {
        setBadgeModal(false);
        handleCloseCompletedModal();
    }
    return (
        <div className="modal show fade " style={Modalstyle} onClick={() => close()}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center">
                            <img src={badges[dataforModal.badgeId].url} className="back" alt={"img"} height="300" width="300" />
                            <span className="front mt-5" ><lottie-player src="https://assets5.lottiefiles.com/packages/lf20_wgcqrpue.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></lottie-player></span>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-12">
                        <div className="mt-3 bg-white p-3">
                            For Completing {dataforModal["title"]} Milestone!
                        </div>
                    </div>
                </div> */}
            </div>


        </div >
        // <div>
        //     <div className="modal show fade" style={Modalstyle}>
        //         <div className="modal-dialog">
        //             <div className="modal-content">
        //                 <div className="modal-header">
        //                     <h1>Congratulations!!</h1>
        //                     <button type="button" className="btn-close" onClick={() => close()}></button>
        //                 </div>
        //                 <div className="modal-body" style={{ minHeight: "20em" }}>
        //                     <div>
        //                         You have sucessfully completed a milestone and you earn the following badge :
        //                     </div>
        //                     <div className="d-flex justify-content-center mt-4">
        //                         <img src={badges[dataforModal.badgeId].url} className="back" alt={"img"} height="150" width="150" />
        //                         <span className="front" ><lottie-player src="https://assets5.lottiefiles.com/packages/lf20_lg6lh7fp.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player></span>
        //                     </div>

        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default BadgeModal;