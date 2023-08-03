/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import classnames from "classnames";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getbrandListfilter } from './actions';
import "./slider.css";
export const Slider = (props) => {
  console.log(props);
  const [minVal, setMinVal] = useState(props.min);
  const [maxVal, setMaxVal] = useState(props.max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  // Convert to percentage
  // const getPercent = useCallback(
  //   (value) => Math.round(((value - min) / (max - min)) * 100),
  //   [min, max]
  // );
  // Set width of the range to decrease from the left side
  // useEffect(() => {
  //   if (maxValRef.current) {
  //     const minPercent = getPercent(minVal);
  //     const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number
  //     if (range.current) {
  //       range.current.style.left = `${minPercent}%`;
  //       range.current.style.width = `${maxPercent - minPercent}%`;
  //     }
  //   }
  // }, [minVal, getPercent]);
  // Set width of the range to decrease from the right side
  // useEffect(() => {
  //   if (minValRef.current) {
  //     const minPercent = getPercent(+minValRef.current.value);
  //     const maxPercent = getPercent(maxVal);
  //     if (range.current) {
  //       range.current.style.width = `${maxPercent - minPercent}%`;
  //     }
  //   }
  // }, [maxVal, getPercent]);
  // Get min and max values when their state changes
  // useEffect(() => {
  //   onChange({ min: minVal, max: maxVal });
  // }, [minVal, maxVal, onChange]);
  useEffect(() => {
    dispatch(getbrandListfilter(props.valueString, props.valuepackString, props.fieldString, props.valuediscountstring, props.URL, minVal, maxVal))
  }, [props.valueString, props.valuepackString, props.fieldString, props.valuediscountstring, props.URL, minVal, maxVal])
  const dispatch = useDispatch()
  console.log('minmax', minVal, maxVal);
  return (
    <div className='position-relative rangeslider' >
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          // const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(event.target.value);
          // event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": ''
        })}
      />
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          // const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(event.target.value);
          event.target.value = props.min.toString();
        }}
        className="thumb thumb--zindex-4"
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">₹ {minVal}</div>
        <div className="slider__right-value">₹ {maxVal}</div>
      </div>
    </div>
  );
};
// Slider.propTypes = {
//   min: PropTypes.number.isRequired,
//   max: PropTypes.number.isRequired,
//   onChange: PropTypes.func.isRequired
// };
export default Slider;
