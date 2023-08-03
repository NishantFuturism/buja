/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/*
 *
 * DealdayProduct reducer
 *
 */
import produce from 'immer';
import { ADD_TO_CART_SUCCESS, CLOSE_MSG_BAR, NEXT_PAGE_SUCCESS, RESPONCE_MSG, DEFAULT_ACTION, DEFAULT_ACTION_SUCCESS, SHOPPING_CART_DETAILS_HOME } from './constants';
export const initialState = {
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  IsMsgBar: false,
  topsellingdata: [],
  shoppingDetailsHome: []
};
// const stateDataDealDay = useSelector(state => state.dealdayProduct)
/* eslint-disable default-case, no-param-reassign */
const ToppSellingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        // console.log('actiontopselling', action);
        // draft.topsellingdata = action.getTopsellingdb
        break
      case DEFAULT_ACTION_SUCCESS:
        console.log('actiontopselling', action);
        draft.topsellingdata = action.getTopsellingdb
        break
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
      case SHOPPING_CART_DETAILS_HOME:
        draft.shoppingDetailsHome = action.shoppingcartDetails
        break
      case NEXT_PAGE_SUCCESS:
        draft.dealData = action.dealOfTheDayData.Data
        break
    }
  });
export default ToppSellingReducer;
