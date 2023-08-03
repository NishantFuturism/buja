/* eslint-disable prefer-destructuring */
/*
 *
 * ReorderProduct reducer
 *
 */
import produce from 'immer';
import { SHOPPING_CART_DETAILS } from '../LoadProducts/constants';
import { ADD_TO_CART_SUCCESS, CLOSE_MSG_BAR, DEFAULT_ACTION, GET_REORDER_PRODUCT_SUCCESS, NEXT_PAGE_SUCCESS, RESPONCE_MSG, SHOPPING_CART_DETAILS_REORDER } from './constants';
export const initialState = {
  reoderlist: [],
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  IsMsgBar: false,
  shoppingDetails: [],
  shoppingDetailsReorder: []
};
/* eslint-disable default-case, no-param-reassign */
const reorderProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_REORDER_PRODUCT_SUCCESS:
        console.log('actiondddd', action);
        // draft.reoderlist = action.reorderdata
        break;
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
        console.log('s', action);
        draft.dealData = action.dealOfTheDayData.GetSku
        break
      case SHOPPING_CART_DETAILS:
        draft.shoppingDetails = action.shoppingcartDetails
        break
      case SHOPPING_CART_DETAILS_REORDER:
        draft.shoppingDetailsReorder = action.shoppingcartDetails
        break
    }
  });
export default reorderProductReducer;
