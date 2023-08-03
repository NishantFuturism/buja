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
  const token = "BMYDRql-QSazfTBXzjoam7hzqhDK7RiSuO47vN9t9B6aZlHzZhHGzSuvwQRq5vVjweWcDr8ETe_zvBrgD15ATR2NCgfHtwz66EMTG4qqqsGGKOT1k0hi08OuC91T8emw-ibERwFAa1Gz2nGPXvaK28ZRAciZyE7OWc_0rjEu7ryc3OC-GoELBk3jRvIsDuE1EWXmkq-Pd0lJJMjt8yDWj2LQ5_xqPF1t7stm0QRKYRXzeLGqcgwkx_UdbF49lQ9ZxdvD40gW6d6c1MdOYRdMSlGCMTSwsTJH2W6cymzEH8vy2KBMfLCAZnIO80QeIYOVy2jrU00BaYB97CV3XhNZ3BfTtlzRcJ1rQhkwHEONpPU";
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
