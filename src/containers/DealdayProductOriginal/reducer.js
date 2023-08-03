/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/*
 *
 * DealdayProduct reducer
 *
 */
import produce from 'immer';
import { SHOPPING_CART_DETAILS } from '../HomePage/constants';
import { ADD_TO_CART_SUCCESS, CLOSE_MSG_BAR, NEXT_PAGE_SUCCESS, RESPONCE_MSG, DEFAULT_ACTION_DEAL_SUCCESS, SHOPPING_CART_DETAILS_HOME } from "./constants";
export const initialState = {
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  IsMsgBar: false,
  shoppingDetails: [],
  shoppingDetailsHome: [],
  DealofthdayData: []
};
// const stateDataDealDay = useSelector(state => state.dealdayProduct)
/* eslint-disable default-case, no-param-reassign */
const dealdayProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CLOSE_MSG_BAR:
        draft.IsMsgBar = false
        break
      case ADD_TO_CART_SUCCESS:
        draft.IsMsgBar = true
        draft.addToCartMsg = action.updateCartData.split('|')[1]
        break
      case RESPONCE_MSG:
        draft.IsMsgBar = true
        draft.addToCartMsg = action.recievedMsg
        break
      case NEXT_PAGE_SUCCESS:
        draft.dealData = action.dealOfTheDayData.Data
        break
      case SHOPPING_CART_DETAILS:
        draft.shoppingDetails = action.shoppingcartDetails
        break
      case SHOPPING_CART_DETAILS_HOME:
        console.log("reduceraction deal=", action.shoppingcartDetails)
        draft.shoppingDetailsHome = action.shoppingcartDetails
        break
      case DEFAULT_ACTION_DEAL_SUCCESS:
        draft.DealofthdayData = action.dealOfTheDayData
        break
    }
  });
export default dealdayProductReducer;
