/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */
import PropTypes from 'prop-types';
import React from 'react';
function Img(props) {
  return <img referrerPolicy='no-referrer' className={props.className} src={props.src} alt={props.alt} />;
}
// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default Img;
