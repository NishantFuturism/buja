/* eslint-disable react/prop-types */
/**
 *
 * LogoutPopup
 *
 */
import React from 'react';
function LogoutPopup(props) {
  const logout = () => {
    props.fetchToggle()
    // localStorage.removeItem("googlesignindata");
  }
  const logoutcancel = () => {
    props.fetchToggle()
    // localStorage.removeItem("googlesignindata");
  }
  return (
    <>
      <div className="modal show" id="logoutmodal" style={{ display: 'block' }}>
        <div className="modal-content" style={{ zIndex: 5 }}>
          <div className="modal-body text-center">
            <button type="button" className="close" data-dismiss="modal"
              onClick={() => {
                props.fetchToggle()
              }}>×</button>
            <h4 className="modal-title">Are you sure you want to logout? </h4>
            <button id="yeslogout" type='button'
              onClick={logout}
              className="btn btn-default btn-secondary">Yes</button>
            <button className="btn btn-default btn-secondary"
              onClick={logoutcancel}
              type='button' data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </>
  );
}
LogoutPopup.propTypes = {};
export default LogoutPopup;
