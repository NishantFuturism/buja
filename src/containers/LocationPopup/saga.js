/* eslint-disable no-unused-vars */
// import { getLocation } from 'connected-react-router';
import { call, put, takeEvery } from 'redux-saga/effects';
import { requestlocation, requestlocationservice } from '../../utils/request';
import Constants from '../App/constants';
// import { DEFAULT_ACTION } from '../RegisterOrignal/constants';
import { AVILABILYTY_MSG, CHECK_SERVICE_AVALABILITY, DETECT_MY_LOCATION, ONCHANGE_LOCATIONT, ONCHANGE_LOCATION_SUCCESS } from './constants';
// Individual exports for testing
export default function* locationPopupSaga() {
  yield takeEvery(ONCHANGE_LOCATIONT, getrepos)
  yield takeEvery(DETECT_MY_LOCATION, getcuurentlocation)
  yield takeEvery(CHECK_SERVICE_AVALABILITY, getavailability)
}
function* getcuurentlocation(action) {
  console.log('ac', action);
  const getyourplace = yield call(requestlocation, `${Constants.endPoints.geocode}key=${action.atosuggestdadta.GooglePlacesApiKey}&latlng=${action.lat},${action.lng}&sensor=${true}`, 'GET')
  console.log({ getyourplace });
  const address = getyourplace.results[0].address_components.filter(x => x.types[1] === 'sublocality')
  const pincode = getyourplace.results[0].address_components.filter(x => x.types[0] === 'postal_code')
  const city = getyourplace.results[0].address_components.filter(x => x.types[0] === 'locality')
  const state = getyourplace.results[0].address_components.filter(x => x.types[0] === 'administrative_area_level_1')
  const area = getyourplace.results[0].address_components.filter(x => x.types[1] === 'sublocality')
  console.log({ address, pincode, city });
  const checkserviceavailability = yield call(requestlocationservice, `${Constants.endPoints.checkserviceavailability}setsession=true&address=${address[0].long_name}&area=${area[0].long_name}&city=${city[0].long_name}&lat=${action.lat}&lng=${action.lng}&pincode=${pincode[0].long_name}&placeid=${getyourplace.results[0].place_id}&state=${state[0].long_name}`
    , 'GET')
  console.log({ checkserviceavailability });
  yield put({ type: AVILABILYTY_MSG, checkserviceavailability })
  // alert(`delivery location ${checkserviceavailability} `,)
  if (checkserviceavailability === 'NotAvailable') {
    alert('We are currently operational in Pune (selected locations). We are working on it and hang tight, we will serve you very soon!')
  } else {
    alert(checkserviceavailability)
  }
}
function* getrepos(action) {
  console.log('acek', action);
  console.log({ action });
  // fetch(`${Constants.endPoints.autocomplete}?key=${action.atosuggestdadta.GooglePlacesApiKey}&input=${action.input}&components=country:in`, {
  //   method: 'GET',
  //   mode: 'no-cors',
  //   headers: {
  //     accept: 'application/json',
  //     // 'Content-Type': 'application/json',
  //     // Authorization: `Bearer ${token}`,
  //   },
  //   // body: JSON.stringify(form)
  // })
  //   .then(res => console.log('hh', res.text()))
  // // .then(addressresponse => {
  // //   console.log('registerresponse', addressresponse)
  // // setenblesuggestion(true)
  // // alert(addressresponse)
  // // toast(addressresponse)
  // // props.fetchaddress()
  // // props.cancelform()
  // // }
  // // ); s
  const { GooglePlacesApiKey } = action.atosuggestdadta
  const placeid = action.atosuggestdadta.DefaultDeliveryLocality_PlaceId
  // const repos = yield call(requestlocationservice, `${Constants.endPoints.autocomplete}?key=${GooglePlacesApiKey}&input=${action.input}&components=country:in`, 'GET')
  // const { predictions } = repos
  console.log(GooglePlacesApiKey);
  // yield put({ type: ONCHANGE_LOCATION_SUCCESS, predictions })
}
function* getavailability(action) {
  console.log({ action });
  console.log('ac', action);
  const placedetails = yield call(requestlocation, `${Constants.endPoints.placedetails}key=${action.atosuggestdadta.GooglePlacesApiKey}&place_id=${action.ID}`, 'GET')
  console.log({ placedetails });
  console.log(placedetails.result.geometry.location.lat);
  const getyourplaceauto = yield call(requestlocation, `${Constants.endPoints.geocode}key=${action.atosuggestdadta.GooglePlacesApiKey}&latlng=${placedetails.result.geometry.location.lat},${placedetails.result.geometry.location.lng}&sensor=${true}`, 'GET')
  console.log({ getyourplaceauto });
  const address = getyourplaceauto.results[0].address_components.filter(x => x.types[1] === 'sublocality')
  const pincode = getyourplaceauto.results[0].address_components.filter(x => x.types[0] === 'postal_code')
  const city = getyourplaceauto.results[0].address_components.filter(x => x.types[0] === 'locality')
  const state = getyourplaceauto.results[0].address_components.filter(x => x.types[0] === 'administrative_area_level_1')
  const area = getyourplaceauto.results[0].address_components.filter(x => x.types[1] === 'sublocality')
  console.log({ address, pincode, city });
  const checkserviceavailability = yield call(requestlocation, `${Constants.endPoints.checkserviceavailability}setsession=true&address=${address[0].long_name}&area=${area[0].long_name}&city=${city[0].long_name}&lat=${placedetails.result.geometry.location.lat}&lng=${placedetails.result.geometry.location.lng}&pincode=${pincode[0].long_name}&placeid=${getyourplaceauto.results[0].place_id}&state=${state[0].long_name}`
    , 'GET')
  console.log({ checkserviceavailability });
  yield put({ type: AVILABILYTY_MSG, checkserviceavailability })
  // alert(`delivery location ${checkserviceavailability} `,)
  if (checkserviceavailability === 'NotAvailable') {
    alert('We are currently operational in Pune (selected locations). We are working on it and hang tight, we will serve you very soon!')
  } else {
    alert(checkserviceavailability)
  }
}