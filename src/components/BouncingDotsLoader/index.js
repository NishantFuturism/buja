/**
 *
 * BouncingDotsLoader
 *
 */
import React, { memo } from 'react';
import './BouncingDotsLoader.css';
function BouncingDotsLoader() {
  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <div className="bouncing-loader" style={{ margin: 100 }}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
BouncingDotsLoader.propTypes = {};
export default memo(BouncingDotsLoader);
