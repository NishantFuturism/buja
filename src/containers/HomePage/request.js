const url =
  'https://productionapi.adibuja.com/api/v2/HomePageData?clientId=1&LanguageId=2&currencyCode=INR&CustGUID=F68364DA-2EA8-4FF7-9EAF-70EAEBA79B6E&CartGUID=E0306B0D-314E-4BC0-A0CA-D825393F13FE&CustomerId=42042&pincode=411045&IsgetAll=0&sortby=MOD&IsTopSet=false&skuIds=30955';
const fetchGetUsers = () => {
  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization :"Bearer " + token.token
    Authorization:
      'Bearer QyDUs53aPcT9uLeSmNI3Crf8MT8SyT9XjVpmCHoObjql4-M2MMNXik_V3lOoy4FLAaG0re-34gS-udpDt3psnhF0UewoojHIXy1mPne-LAWTcrLMnE2iNtxOuw84cyL0KePZ8quWiGcnGa8jEWFV0RlI0jtNm5XRjv5KK-3srGPZKDlgY2lUy58nD2epdKStP2aM680y8HHVuFGCdP5SXwvKsQmWH2Afu0cywYNcPlYU5shetdlL4mTu3LwDydpcDpEDPvj9In4CSIaL9hdY5yn2Ze5KZBwdstiQaQMj_X3GL3_A5VUKP3Yp5trr9BH6lfHirJJ4hOXpfLkVqZMnMRRSHKgSWeEfRR7b8Z47c8I',
  };
  return fetch(url, {
    method: 'GET',
    headers,
    // body: (method == 'POST') ?  formBody : '',
  })
    .then(res => res.text())
    .then(responseBodyAsText => {
      try {
        const bodyAsJson = JSON.parse(responseBodyAsText);
        return bodyAsJson;
      } catch (e) {
        throw Error(responseBodyAsText);
      }
    });
};
export default fetchGetUsers;
