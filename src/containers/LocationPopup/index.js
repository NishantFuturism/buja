/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * LocationPopup
 *
 */
// import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import Success from '../../components/ShowAlert/success';
import Warn from '../../components/ShowAlert/warn';
import Constants from '../App/constants';
import LocationApi from '../MainPage/api/Locationapi';
import { changed, getlocationtitle } from './actions';
import reducer from './reducer';
import saga from './saga';
//import DealdayProductOriginal from '../DealdayProductOriginal';
//import ToppSellingOriginal from '../ToppSellingOriginal';
// import { makeSelectLocationuser } from './selectors';
// import from 'react-router-dom';
export function LocationPopup(props) {
  const {
    input,
  } = props
  // const { popup } = props
  useInjectReducer({ key: 'locationPopup', reducer });
  useInjectSaga({ key: 'locationPopup', saga });
  const [enblesuggestion, setenblesuggestion] = useState(false)
  const [atosuggestdadta, setatosuggestdadta] = useState([])
  const [locationname, setlocationname] = useState('')
  const [Autolist, setAutolist] = useState('')
  const [current, setcurrent] = useState(false)
  const [auto, setauto] = useState(false)
  const [lat, setlat] = useState(false)
  const [long, setlong] = useState(false)
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [locationupdate, setLocationUpdate] = useState(false)
  const [locationmsg, setLocationmsg] = useState('')
  const [locationstatus, setLocationstatus] = useState(false)
  const [warnstatus, setWarnstatus] = useState(false)
  const [Homerefresh, setHomerefresh] = useState(false)
  const [locationBlock, setlocationBlock] = useState(false)
  const locationPopupState = useSelector(state => state.locationPopup)
  console.log({ locationPopupState });
  useEffect(() => {
    // if (locationPopupState !== undefined) {
    //   if (locationPopupState.avilabiltymsg === 'NotAvailable') {
    //     alert('We are currently operational in Pune (selected locations). We are working on it and hang tight, we will serve you very soon!')
    //   }
    // }
    // dispatch(changed(locationname, atosuggestdadta));
  }, [auto])
  useEffect(() => {
    LocationApi.GoogleApi({})
      .then(response => {
        console.log(`detectlocationKey${JSON.stringify(response)}`)
        setatosuggestdadta(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, []);
  useEffect(() => {
    dispatch(changed(locationname, atosuggestdadta));
  }, [auto])
  const dispatch = useDispatch();
  const autosuggestloaction = (e) => {
    console.log('sss');
    setauto(true)
    setlocationname(document.getElementById('txtSearchDeliveryLocality').value)
    // dispatch(changed(e.target.value, atosuggestdadta));
    const token = localStorage.getItem('generatedtoken');
    setTimeout(() => fetch(`${Constants.urls.baseUrl}${Constants.endPoints.autocomplete}key=${atosuggestdadta.GooglePlacesApiKey}&keyword=${e.target.value}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        accept: 'application/json',
        // accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // mode: 'cors',
        // "Access-Control-Allow-Headers": "*",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "*"
      },
      // body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(addressresponse => {
        console.log('registerresponse', addressresponse)
        const responsew = JSON.parse(addressresponse)
        setAutolist(responsew.predictions)
        setenblesuggestion(true)
      }), 2000)
  }
  // const URL = "https://meowfacts.herokuapp.com/"
  // async function getCatFact() {
  //   const response = await fetch(URL)
  //   console.log(await response.json())
  // }
  // useEffect(() => {
  //   getCatFact()
  // }, [])
  useEffect(() => {
    if (current) {
      // dispatch(detectCurrentlocation(lat, long, atosuggestdadta))
    }
  }, [current, lat, long])
  const detectmylocation = () => {
    console.log('in the detect location', navigator);
    const error = () => {
      setlocationBlock(true)
    }
    const success = (position) => {
      setlat(position.coords.latitude)
      setlong(position.coords.longitude)
      setcurrent(true)
      let keyForGoogleAPI = "";
      if (atosuggestdadta && atosuggestdadta.GooglePlacesApiKey) {
        keyForGoogleAPI = atosuggestdadta.GooglePlacesApiKey;
      } else {
        LocationApi.GoogleApi({})
          .then(response => {
            console.log(`detectlocationKey${JSON.stringify(response)}`)
            keyForGoogleAPI = response.GooglePlacesApiKey;
          });
      }
      return fetch(`${Constants.endPoints.geocode}key=${keyForGoogleAPI}&latlng=${position.coords.latitude},${position.coords.longitude}&sensor=${true}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          // 'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(form)
      })
        .then(res => res.text())
        .then(addressresponse => {
          const token = localStorage.getItem('generatedtoken');
          let tempCity = "";
          let address2 = "";
          let pincode2 = "";
          let city = "";
          console.log('registerresponse', addressresponse)
          if (JSON.parse(addressresponse).results && JSON.parse(addressresponse).results[0]) {
            address2 = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[1] === 'sublocality')
            pincode2 = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'postal_code')
            city = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'locality')
            if (city && city[0] && city[0].long_name) {
              tempCity = city;
            } else {
              tempCity = JSON.parse(addressresponse).results[1].address_components.filter(x => x.types[0] === 'locality')
              if (tempCity && tempCity[0] && tempCity[0].long_name) {
                // do nothing
              } else {
                tempCity = JSON.parse(addressresponse).results[2].address_components.filter(x => x.types[0] === 'locality')
                if (tempCity && tempCity[0] && tempCity[0].long_name) {
                  // do nothing
                } else {
                  tempCity = JSON.parse(addressresponse).results[3].address_components.filter(x => x.types[0] === 'locality')
                }
              }
            }
          } else {
            address2 = JSON.parse(addressresponse).results.address_components.filter(x => x.types[1] === 'sublocality')
            pincode2 = JSON.parse(addressresponse).results.address_components.filter(x => x.types[0] === 'postal_code')
            city = JSON.parse(addressresponse).results.address_components.filter(x => x.types[0] === 'locality')
            tempCity = city
          }
          const state = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'administrative_area_level_1')
          const area = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[1] === 'sublocality')
          console.log({ address2, pincode2, city });
          setPincode(pincode2[0].long_name)
          localStorage.setItem('sublocalityvalue', address2[0].long_name)
          localStorage.setItem('pincodevalue', pincode2[0].long_name)
          setAddress(address2[0].long_name)
          return fetch(`${Constants.endPoints.checkserviceavailability}setsession=true&address=${address2[0].long_name}&area=${area[0].long_name}&city=${tempCity}&lat=${position.coords.latitude}&lng=${position.coords.longitude}&pincode=${pincode2[0].long_name}&placeid=${JSON.parse(addressresponse).results[0].place_id}&state=${state[0].long_name}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => res.text())
            .then(response => {
              // toast(response)
              // console.log('DD', response)
              if (response !== "NotAvailable") {
                setLocationstatus(true)
                setLocationmsg('Delivery location is updated ')
                setHomerefresh(true)
                setTimeout(() => {
                  props.fetchToggle()
                }, 3000);
                // toast('Delivery location is updated ')
                setLocationUpdate(true)
              } else {
                setWarnstatus(true)
                setLocationmsg(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
                setTimeout(() => {
                  setlocationname('')
                  props.fetchToggle()
                }, 3000);
                // toast(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
              }
            });
        })
    }
    // navigator.geolocation.getCurrentPosition(success, error)
    navigator.geolocation.getCurrentPosition(success, error, { timeout: 10000 });
    // setlat(position.coords.latitude)
    // setlong(position.coords.longitude)
    // setcurrent(true)
    // return fetch(`${Constants.endPoints.geocode}key=${atosuggestdadta.GooglePlacesApiKey}&latlng=${position.coords.latitude},${position.coords.longitude}&sensor=${true}`, {
    //   method: 'GET',
    //   headers: {
    //     accept: 'application/json',
    //     // 'Content-Type': 'application/json',
    //     // Authorization: `Bearer ${token}`,
    //   },
    //   // body: JSON.stringify(form)
    // })
    //   .then(res => res.text())
    //   .then(addressresponse => {
    //     const token = localStorage.getItem('generatedtoken');
    //     console.log('registerresponse', addressresponse)
    //     const address2 = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[1] === 'sublocality')
    //     const pincode2 = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'postal_code')
    //     const city = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'locality')
    //     const state = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'administrative_area_level_1')
    //     const area = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[1] === 'sublocality')
    //     console.log({ address2, pincode2, city });
    //     setPincode(pincode2[0].long_name)
    //     localStorage.setItem('pincodevalue',pincode2[0].long_name)
    //     setAddress(address2[0].long_name)
    //     return fetch(`${Constants.endPoints.checkserviceavailability}setsession=true&address=${address2[0].long_name}&area=${area[0].long_name}&city=${city[0].long_name}&lat=${position.coords.latitude}&lng=${position.coords.longitude}&pincode=${pincode2[0].long_name}&placeid=${JSON.parse(addressresponse).results[0].place_id}&state=${state[0].long_name}`, {
    //       method: 'GET',
    //       headers: {
    //         accept: 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //       .then(res => res.text())
    //       .then(response => {
    //         // toast(response)
    //         // console.log('DD', response)
    //         if (response !== "NotAvailable") {
    //           setLocationstatus(true)
    //           setLocationmsg('Delivery location is updated ')
    //           setHomerefresh(true)
    //           setTimeout(() => {
    //             props.fetchToggle()
    //           }, 3000);
    //           // toast('Delivery location is updated ')
    //           setLocationUpdate(true)
    //         } else {
    //           setWarnstatus(true)
    //           setLocationmsg(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
    //           setTimeout(() => {
    //             setlocationname('')
    //             props.fetchToggle()
    //           }, 3000);
    //           // toast(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
    //         }
    //       });
    //   })
    // Your Code
    // ( DO fetch call to get address from lat and lng
    // https://maps.googleapis.com/maps/api/geocode/json?key= 
    // <\API_KEY_HERE>&latlng="latitude","longitude"&sensor=true )
    // (error) => this.setState({ error: error.message }),
    // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // alert('location block')
  }
  // useEffect(() => {
  //   if (locationPopupState !== undefined) {
  //     setAutolist(locationPopupState.predictlist)
  //   }
  // }) // const Autolist = locationPopupState.predictlist
  function checkservice(description, selectedatavalue, placeid) {
    console.log("Futurism-Rohit1")
    setlocationBlock(false)
    console.log("description=============", description);
    setlocationname(description)
    // setenteredvalue(selectedatavalue)
    const token = localStorage.getItem('generatedtoken');
    // setenblesuggestion(false)
    // dispatch(checkserviceavailability(description, placeid, atosuggestdadta))
    return fetch(`${Constants.urls.baseUrl}${Constants.endPoints.placedetails}key=${atosuggestdadta.GooglePlacesApiKey}&placeId=${placeid}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(addressresponse => {
        console.log(`Futurism-Rohit2${JSON.stringify(addressresponse)}`)
        const responsew = JSON.parse(addressresponse)
        console.log('nvnujss', JSON.parse(addressresponse))
        return fetch(`${Constants.endPoints.geocode}key=${atosuggestdadta.GooglePlacesApiKey}&latlng=${responsew.result.geometry.location.lat},${responsew.result.geometry.location.lng}&sensor=${true}`, {
          method: 'GET',
          headers: {
            accept: 'text/plain',
          },
          // body: JSON.stringify(form)
        })
          .then(res => res.text())
          .then(resaa => {
            const check = JSON.parse(resaa)
            // below code added to check if response address has zipcode or not
            const responseAddressList = check.results;
            let addressToConsider = "";
            for (let i = 0; i < responseAddressList.length; i += 1) {
              const formatAddressText = responseAddressList[i].formatted_address;
              if (/(\d{6})/.test(formatAddressText)) {
                addressToConsider = responseAddressList[i];
                break;
              }
            }
            // let newPinCode = "";
            const address1 = addressToConsider.address_components.filter(x => x.types[1] === 'sublocality')
            const pincode1 = addressToConsider.address_components.filter(x => x.types[0] === 'postal_code')
            let city = addressToConsider.address_components.filter(x => x.types[0] === 'locality')
            if (city && city !== "Pune") {
              city = addressToConsider.address_components.filter(x => x.types[0] === 'administrative_area_level_3')
            }
            const state = addressToConsider.address_components.filter(x => x.types[0] === 'administrative_area_level_1')
            const area = addressToConsider.address_components.filter(x => x.types[1] === 'sublocality')
            setPincode(pincode1[0].long_name)
            if (address1.length > 0 && pincode1.length > 0 && area.length > 0 && state.length > 0 && city[0].long_name === 'Pune') {
              localStorage.setItem('sublocalityvalue', address1[0].long_name)
              localStorage.setItem('pincodevalue', pincode1[0].long_name)
              setAddress(address1[0].long_name)
            }
            console.log(`Futurism-Rohit3-address${address1.length}`)
            console.log(`Futurism-Rohit3-pincode${pincode1.length}`)
            console.log(`Futurism-Rohit3-area${area.length}`)
            console.log(`Futurism-Rohit3-state${state.length}`)
            console.log(`Futurism-Rohit3-city${state.length}`)
            if (address1.length > 0 && pincode1.length > 0 && area.length > 0 && state.length > 0) {
              // do nothing 
            } else {
              console.log("you are here")
              setWarnstatus(true)
              setLocationmsg(`Address not found! Please search again`)
              setTimeout(() => {
                setlocationname('')
                props.fetchToggle()
              }, 500);
            }
            if (city[0] && city[0].long_name && city[0].long_name !== "" && city[0].long_name === 'Pune') {
              return fetch(`${Constants.endPoints.checkserviceavailability}setsession=true&address=${address1[0].long_name}&area=${area[0].long_name}&city=${city[0].long_name}&lat=${responsew.result.geometry.location.lat}&lng=${responsew.result.geometry.location.lng}&pincode=${pincode1[0].long_name}&placeid=${JSON.parse(resaa).results[0].place_id}&state=${state[0].long_name}`, {
                method: 'GET',
                // mode: 'cors',
                headers: {
                  accept: 'application/json',
                  // 'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              })
                .then(res => res.json())
                .then(response => {
                  console.log(`Futurism-Rohit4${JSON.stringify(response)}`)
                  // toast(response)
                  const msg = response
                  console.log('JJJJ', msg, msg === "Available")
                  if (msg === "Available") {
                    setLocationstatus(true)
                    setLocationmsg('Delivery location is updated ')
                    setHomerefresh(true)
                    setTimeout(() => {
                      props.fetchToggle()
                    }, 500);
                    // toast('Delivery location is updated ')
                    setLocationUpdate(true)
                  } else {
                    setWarnstatus(true)
                    setLocationmsg(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
                    setTimeout(() => {
                      setlocationname('')
                      props.fetchToggle()
                    }, 500);
                    // toast(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
                  }
                  // if (response === "Available") {
                  //   toast('Delivery location is updated and Avialable')
                  // }
                  // else {
                  //   toast('Delivery location is updated and not Avialable')
                  // }
                });
            }
            setWarnstatus(true)
            setLocationmsg(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
            setTimeout(() => {
              setlocationname('')
              props.fetchToggle()
            }, 500);
            return null;
            // });
            // const responsew = JSON.parse(addressresponse)
            // setAutolist(responsew.predictions)
            // setenblesuggestion(true)
          });
        // const responsew = JSON.parse(addressresponse)
        // setAutolist(responsew.predictions)
        // setenblesuggestion(true)
      });
  }
  useEffect(() => {
    if (locationupdate) {
      dispatch(getlocationtitle(address, pincode, locationupdate))
    }
  }, [address, pincode, locationupdate])
  const closemsg = () => {
    // detectmylocation()
    setLocationstatus(false)
    props.fetchToggle()
  }
  console.log('s==============', Autolist, locationname);
  console.log("locationPopupState ", locationPopupState, props.popup);
  return (
    <>
      <div>
        {locationstatus && <Success msg={locationmsg} close={closemsg} />}
        {warnstatus && <Warn msg={locationmsg} close={closemsg} />}
        {/* <ToastContainer /> */}
        <div className='togglecityoverlay'>
          <div className="togglecitydrop" style={{ display: 'block' }}>
            <span id="span"><b>Please select your delivery locality</b></span>
            <a href className="fa fa-window-close pull-right"
              onClick={() => {
                props.fetchToggle()
              }}
              style={{ cursor: 'pointer', fontSize: '23px', top: '2px', position: 'absolute', right: '3px' }} id="iclosepincodepopup"></a>
            <form action="#" autoComplete="off">
              <div className="form-row mt-10">
                {/* <style>
              .delivery-autocomplete-div {
                min - height: 20px;
              background-color: white;
              border-bottom: 1px #7b7777 solid;
              cursor: pointer;
              padding: 10px;
    }n.
            </style> */}
                <div className="form-group col-12">
                  <div id="divSearchDeliveryLocality" className="input-group">
                    <div id="inputdiv">
                      <input type="text" id="txtSearchDeliveryLocality" className="form-control" placeholder="Search Delivery Locality" onChange={(e) => autosuggestloaction(e)} value={locationname} />
                    </div>
                    <div className="input-group-append">
                      <div className="btn-group">
                        <button type="button" id="btnUseMyLocation" className="btn btn-default input-group-btn"
                          onClick={() => detectmylocation()}
                          style={{ backgroundColor: 'green', color: 'white', fontSize: '14px' }}>
                          <i className="fa fa-map-marker"></i> Detect My Location <i id="icnMyLocationSpinner" className="fa fa-spinner fa-spin" style={{ display: 'none' }}></i>
                        </button>
                      </div><br />
                    </div>
                  </div>
                  {
                    enblesuggestion ?
                      <div id="divDeliveryLocalitySuggestions"
                        style={{ position: 'absolute', zIndex: '999', width: '280px' }}>
                        {(Autolist || []).map((data,) => (
                          <ul className="list-group"
                          >
                            <li className="list-group-item delivery-autocomplete-div"
                              onClick={() => checkservice(data.description, data, data.place_id)}
                            >{data.description}</li>
                          </ul>
                        ))}
                      </div>
                      : null}
                </div>
                {locationBlock && <span style={{ color: 'red' }}>Sorry! Geo Location is not supported on your current browser! Please check your browser settings.</span>}
                <div></div>
              </div>
              <div id="HeaderNoteAlert"></div>
            </form>
          </div>
        </div>
      </div>
      {/*Homerefresh && <DealdayProductOriginal />*/}
      {/*Homerefresh && <ToppSellingOriginal />*/}
    </>
  );
}
// function mapDispatchToProps() {
//   return {
//     // loaddeafault: evt => dispatch(defaultAction(evt))
//   };
// }
