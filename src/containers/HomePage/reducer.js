/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import { CHANGE_USERNAME, GET_COMMON_CART, GET_COMMON_CART_SUCCESS, GOOGLE_LOGIN, SHOPPING_CART_DETAILS } from './constants';
// The initial state of the App
export const initialState = {
  username: '',
  allCartData: [],
  cartCount: 0,
  CartDetail: [],
  googlelogindata: [],
  logincustomer: false,
  IsLogin: false,
  isOpenMyCart: false,
  shoppingcartDetails: {},
  wishlistdata: [],
  caturl: '',
};
/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        draft.username = action.username.replace(/@/gi, '');
        break;
      case GET_COMMON_CART:
        draft = { ...draft }
        break;
      case GET_COMMON_CART_SUCCESS:
        draft.allCartData = action.cartAllData
        break;
      case GOOGLE_LOGIN:
        draft.googlelogindata = action.googlelogindata
        draft.logincustomer = action.login
        break;
      // case OPEN_MY_CART:
      //   draft.isOpenMyCart = action.isOpen
      //   break;
      case SHOPPING_CART_DETAILS:
        draft.shoppingcartDetails = action.shoppingcartDetails
        break;
    }
  });
export default homeReducer;
