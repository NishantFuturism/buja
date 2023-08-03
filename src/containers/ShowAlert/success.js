/* eslint-disable react/prop-types */
import React from 'react';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
export default function Success(props) {
  const { msg, isError } = props
  // function closeMsgBar() {
  //   setTimeout(() => {
  //     // setShowMsg(false)
  //     // dispatch(setInternalMsg())
  //   }, 1000);
  // }
  return (
    <div>
      <div className={`topmessage alert  alert-dismissible show ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
        {isError ? <i className="fa fa-warning cross"></i> : <i className="fa fa-check chk"></i>}
        <strong className="msg">{msg}</strong>
        <button type='button' className="close msgclose" aria-label="close" onClick={props.close}>×</button>
      </div>
    </div>
  );
}