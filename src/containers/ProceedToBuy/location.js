/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import { detectCurrentlocation, onChangelocattion } from '../LocationPopup/actions';
export function Location() {
  const [detectlocview, setdetectlocview] = useState(false)
  const editLocation = () => {
    setdetectlocview(true)
  }
  const dispatch = useDispatch();
  const autosuggestloaction = (e) => {
    dispatch(onChangelocattion(e.target.value));
    // setenblesuggestion(true)
  }
  const detectmylocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(detectCurrentlocation(position.coords.latitude, position.coords.longitude))
        // Your Code
        // ( DO fetch call to get address from lat and lng
        // https://maps.googleapis.com/maps/api/geocode/json?key= 
        // <\API_KEY_HERE>&latlng="latitude","longitude"&sensor=true )
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  return (
    <>
      <div className="row delivery-area-box-container">
        <div className="col-sm-3" style={{ paddingTop: '10px' }}>
          <b>Delivery area</b>
        </div>
        {detectlocview ?
          <div id="divSearchDeliveryLocalityForCheckout" className="input-group" style={{ display: 'table' }}>
            <div className="row">
              <div className="col-sm-8">
                <input type="text" id="txtDeliveryLocalityForCheckout" className="form-control" placeholder="Search Delivery Locality" onChange={(e) => autosuggestloaction(e)} />
              </div>
              <div className="col-sm-4">
                <button type="button" id="btnUseMyLocationForCheckout" className="btn btn-secondary" onClick={() => detectmylocation()}>
                  <i className="fa fa-map-marker"></i> Detect My Location <i id="icnMyLocationSpinnerForCheckout" className="fa fa-spinner fa-spin" ></i>
                </button>
              </div>
            </div>
          </div>
          :
          <div className="col-sm-6" style={{ paddingTop: '10px' }}>
            <label id="lblDeliveryLocalityForCheckout" >
              Baner, Pune, Maharashtra, India
            </label>
            <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: 999, width: '280px' }}>
              <ul className="list-group" id="Suggestionlist"></ul>
            </div>
            {/* <label id="lblTxtDeliveryLocalityValidation" style={{ color: 'red' }}></label> */}
          </div>}
        {detectlocview ?
          <div className="col-sm-3" style={{ paddingTop: '16px' }}>
            <a id="btnEditDeliveryLocalityForCheckout" href onClick={() => setdetectlocview(false)} ><i className="fa fa-window-close" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
          </div>
          :
          <div className="col-sm-3" style={{ paddingTop: '16px' }}>
            <a href
              onClick={editLocation}
              id="btnEditDeliveryLocalityForCheckout" type='button' ><i className="fa fa-pencil" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
          </div>
        }
      </div>
    </>
  )
}
const withConnect = connect(
  // mapStateToProps,
  // mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(Location);