/* eslint-disable react/prop-types */
/**
 *
 * ShowAlert
 *
 */
import React, { memo, useEffect, useState } from 'react';
import '../../../assets1/css/default.min.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
function ShowAlert(props) {
  const [counter, setCounter] = useState(59);
  useEffect(() => {
    // counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    const timer = setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      counter > 0 && setTimeout(() => setCounter(counter - 1), 2000);
    }, [counter]);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);
  return (
    <div>
      <div className="topmessage alert alert-danger alert-dismissible show" role="alert"><i className="fa fa-warning cross"></i><strong className="msg">{props.error}</strong>
        <button type='button' className="close msgclose" aria-label="close" onClick={() => {
          props.fetchToggle()
        }}>×</button>
      </div>
    </div>
  );
}
// ShowAlert.propTypes = {};
export default memo(ShowAlert);
