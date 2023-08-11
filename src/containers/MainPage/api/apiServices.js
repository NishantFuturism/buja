/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
// import Constants from '../../App/constants';
import { ConstantsValues } from './homeServices';
//import history from '../../../utils/history';
// function fetchtoken() {
//   fetch(`${Constants.urls.baseUrl}${Constants.endPoints.token}`, {
//     method: 'POST',
//     headers: {
//       accept: 'application/x-www-form-urlencoded',
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body:
//       'username=FCAPICL0100145&password=JHASGjnknkjhIhAjksnjansasasMKLAHNSJHGASB02012121&grant_type=password',
//   })
//     .then(res => res.json())
//     .then(
//       result => {
//         result && localStorage.setItem('generatedtoken', result.access_token);
//       },
//       function (error) {
//         // this.setState({ buttonload: false });
//         console.log(error);
//       },
//     );
// }
export const httpRequest = async (url, method, body,) => {
  const dataBody = JSON.stringify(body)
  //const token = localStorage.getItem('generatedtoken');
  const token = "eWlluoVfoVZJ5aZ93V5a9ZLej3jhtEVwHptlisDegR3f2AVuZ-x31LqLFuWMzlQn9wKshI-IMJSs_53kiBPW76WUujy8yMPEqueBj0gpd0oIRKwztRQnFDtZjzMrPKxeMhmbWnESWqBzTo_hi_QqHzcpu5FYzjKapqFURApMkt8lwsELz9146PmFObIPu0jJCFSCaRefiht93Ru5dytUSZwwoSi3dlnaUiUTxcWOGwFxIFNmt-eMaOs45Opl5W52SNTY8xAe61d7yiBzJTeI4xknyTVOP6XrSlCvyw1K7eAwIrNm9YpebtBcZZuM58KS0IDXsXBbc9RusYRmTWfSBJS1Vd_vPL_h7havNcDKGxA";
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, {
    method,
    headers,
    // mode: 'no-cors',
    body: dataBody,
  })
    // .then(res => res.text())
    // .then(responseBodyAsText => {
    //   try {
    //     if (url.includes('/api/v1/updateCart') && (window.atob(localStorage.getItem('CartGUID')) === ConstantsValues.defaultCartGUID)) {
    //       localStorage.setItem('CartGUID', window.btoa(JSON.parse(responseBodyAsText).split('|')[0]))
    //     }
    //     const bodyAsJson = JSON.parse(responseBodyAsText);
    //     return bodyAsJson;
    //   } catch (e) {
    //     throw Error(responseBodyAsText);
    //   }
    // });
    .then(res => {
      // console.log('ee', res);
      if (res.status === 403) {
        // console.log('ee', res);
        // fetchtoken()
        // alert(res.status)
        // router.push('/NotFoundPage')
        // window.location.href = '/unauthorised'
      } else if (res.status === 500) {
        // console('something went wrong')
        router.push('/NotFoundPage')
      }
      return res.text();
    })
    .then(responseBodyAsText => {
      try {
        if (url.includes('/api/v1/updateCart') && (window.atob(localStorage.getItem('CartGUID')) === ConstantsValues.defaultCartGUID)) {
          localStorage.setItem('CartGUID', window.btoa(JSON.parse(responseBodyAsText).split('|')[0]))
        }
        // if (url.includes('/api/V2/get-skusfromcodes') && (window.atob(localStorage.getItem('CartGUID')) === ConstantsValues.defaultCartGUID)) {
        //   // localStorage.setItem('CartGUID', window.btoa(JSON.parse(responseBodyAsText).split('|')[0]))
        //   localStorage.setItem('Comapredatalength', JSON.parse(responseBodyAsText.length))
        // }
        const bodyAsJson = JSON.parse(responseBodyAsText);
        return bodyAsJson;
      } catch (e) {
        // alert('something went wrong')
        console.log("loggingerror----------------------",responseBodyAsText)
        throw Error(responseBodyAsText);
        
      }
    },
      // .catch((err) => {
      //   console.log(err.message);
      // });
    );
}
