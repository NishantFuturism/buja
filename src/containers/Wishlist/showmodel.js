import React from 'react'
export default function showmodel() {
  return (
    <div className="modal show" id="confirmmodal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body text-center">
            <button type="button" className="close" data-dismiss="modal">×</button>
            <h4 className="modal-title">Are you sure you want to remove? </h4><br />
            <button type='button' id="modal-btn-si" className="btn btn-default btn-secondary">Yes</button>
            <button type='button' className="btn btn-default btn-secondary" id="modal-btn-no">No</button>
          </div>
        </div>
      </div>
    </div>
  )
}
