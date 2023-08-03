/* eslint-disable prefer-destructuring */
/*
 *
 * RelatedProduct reducer
 *
 */
import produce from 'immer';
import { ADD_TO_CART_SUCCESS, CLOSE_MSG_BAR, DEFAULT_ACTION, NEXT_PAGE_SUCCESS, RESPONCE_MSG, SHOPPING_CART_DETAILS_HOME } from './constants';
export const initialState = {
  dealData: [],
  name: '',
  qty: 0,
  addToCartMsg: '',
  shoppingDetailsHome: [],
  IsMsgBar: false
};
/* eslint-disable default-case, no-param-reassign */
const relatedProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
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
      case SHOPPING_CART_DETAILS_HOME:
        console.log("reduceraction deal=", action.shoppingcartDetails)
        draft.shoppingDetailsHome = action.shoppingcartDetails
        break
      case NEXT_PAGE_SUCCESS:
        console.log('NEXT_PAGE_SUCCESS reducer', action.dealOfTheDayData);
        draft.dealData = action.dealOfTheDayData
        break
    }
  });
export default relatedProductReducer;
