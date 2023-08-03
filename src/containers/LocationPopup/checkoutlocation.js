/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationApi from '../MainPage/api/Locationapi';
import { checkserviceavailability, detectCurrentlocation } from './actions';
export default function Checkoutlocation() {
  const [atosuggestdadta, setatosuggestdadta] = useState([])
  const [enblesuggestion, setenblesuggestion] = useState(false)
  const [locationname, setlocationname] = useState('')
  const [Autolist, setAutolist] = useState('')
  const locationPopupState = useSelector(state => state.locationPopup)
  useEffect(() => {
    LocationApi.GoogleApi({})
      .then(response => {
        setatosuggestdadta(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, []);
  const dispatch = useDispatch();
  const autosuggestloaction = (e) => {
    setlocationname(e.target.value)
    // dispatch(onChangelocattion(e.target.value, atosuggestdadta));
    setenblesuggestion(true)
  }
  const detectmylocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(detectCurrentlocation(position.coords.latitude, position.coords.longitude, atosuggestdadta))
        // Your Code
        // ( DO fetch call to get address from lat and lng
        // https://maps.googleapis.com/maps/api/geocode/json?key= 
        // <\API_KEY_HERE>&latlng="latitude","longitude"&sensor=true )
      },
      // (error) => this.setState({ error: error.message }),
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  useEffect(() => {
    if (locationPopupState !== undefined) {
      setAutolist(locationPopupState.predictlist)
    }
  }) // const Autolist = locationPopupState.predictlist
  function checkservice(description, selectedatavalue, placeid) {
    setlocationname(description)
    // setenteredvalue(selectedatavalue)
    setenblesuggestion(false)
    dispatch(checkserviceavailability(description, placeid, atosuggestdadta))
  }
  return (
    <div id="divSearchDeliveryLocalityForCheckout" className="input-group" style={{ display: 'table' }}>
      <div className="row">
        <div className="col-sm-8">
          <input type="text" id="txtDeliveryLocalityForCheckout"
            className="form-control" placeholder="Search Delivery Locality"
            onChange={(e) => autosuggestloaction(e)} value={locationname} />
        </div>
        <div className="col-sm-4">
          <button type="button" id="btnUseMyLocationForCheckout" className="btn btn-secondary" onClick={() => detectmylocation()}>
            <i className="fa fa-map-marker"></i> Detect My Location <i ></i>
          </button>
        </div>
      </div>
      {
        enblesuggestion ?
          <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: '999', width: '280px' }}>
            {(Autolist || []).map((data,) => (
              <ul className="list-group" id="Suggestionlist" >
                <li className="list-group-item checkout-delivery-autocomplete-div"
                  onClick={() => checkservice(data.description, data, data.place_id)}>
                  {data.description}
                </li>
              </ul>
            ))}
          </div>
          : null}
    </div>
  )
}
