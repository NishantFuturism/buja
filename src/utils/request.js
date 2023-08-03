/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, method,) {
  const token = localStorage.getItem('generatedtoken');
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  };
  return fetch(url, {
    method,
    headers,
  })
    .then(checkStatus)
    .then(parseJSON);
}
export function requestlocation(url, method) {
  const headers = {
    accept: 'application/json',
  };
  return fetch(url, {
    method,
    // mode: 'no-cors',
    headers,
  })
    .then(checkStatus)
    .then(parseJSON);
}
export function requestlocationservice(url, method) {
  const token = localStorage.getItem('generatedtoken');
  const headers = {
    // accept: 'application/json',
    // mode: 'no-cors',
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, {
    method,
    // mode: 'no-cors',
    headers,
  })
    .then(checkStatus)
    .then(parseJSON);
}