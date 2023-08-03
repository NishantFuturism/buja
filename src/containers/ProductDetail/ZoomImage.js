/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react';
import Drift from 'drift-zoom'
const ZoomImage = (src, srcZoom) => {
  const imgRef = useRef();
  const paneRef = useRef();
  const inlineContainerRef = useRef();
  useEffect(() => {
    // let Drift;
    // if (typeof window !== "undefined") {
    //   Drift = require("drift-zoom").default;
    // }
    new Drift(imgRef.current, {
      paneContainer: paneRef.current,
      inlineContainer: inlineContainerRef.current
    });
  }, []);
  return (
    <>
      {/* <div className='imageContainer' >
        <img className='image-zoom'
          src={image} data-zoom={zoomimage} />
        <div className="image-details"></div>
      </div> */}
      <div className="zoom-image">
        <img
          className="zoom-image__img"
          ref={imgRef}
          src={src}
          data-zoom={srcZoom}
          alt="Zoom here :)"
        />
        <div ref={inlineContainerRef} />
        <div ref={paneRef} />
      </div>
    </>
  );
};
export default ZoomImage;
