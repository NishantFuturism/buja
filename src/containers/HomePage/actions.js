/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import { CHANGE_USERNAME, GET_COMMON_CART, GET_COMMON_CART_SUCCESS, GOOGLE_LOGIN } from './constants';
/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}
export function getCommonCartAction() {
  return {
    type: GET_COMMON_CART,
  };
}
export function getCommonCartSuccessAction() {
  return {
    type: GET_COMMON_CART_SUCCESS,
  };
}
export function getgooglelogindata(googlelogindata,) {
  return {
    type: GOOGLE_LOGIN,
    googlelogindata,
  };
}
