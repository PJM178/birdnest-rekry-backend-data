const InfoModalCopy = (props) => {
  const closeModal = (event) => {
    if (event.target.className === 'modal-background' || event.target.className === 'close') {
      props.setModal(false);
    }
  };

  if (props.modal) {
    return (
      <div className="modal-background" onMouseDown={(event) => closeModal(event)}>
        <div className="modal-content">
          <div className='modal-header'>
            <div id='modal-header-text'>Contact info</div>
            <span className="close" onClick={(event) => closeModal(event)}>&times;</span>
          </div>
          <div className="modal-body">
            <div>Name: {props.item.pilot.firstName} {props.item.pilot.lastName}</div>
            <div>Email: {props.item.pilot.email}</div>
            <div>Phone number: {props.item.pilot.phoneNumber}</div>
            <div>Shortest distance to the nest:
              <div>{props.violations.find(item =>
                item.drone.serialNumber === props.item.drone.serialNumber).distance.toFixed(2)} meters</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

};

export default InfoModalCopy;