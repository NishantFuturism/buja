/*
 *
 * Otherseller reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_OTHER_SELLER_SUCCESSS, SHOPPING_CART_DETAILS_SALLER } from './constants';
export const initialState = {
  sellerlist: [],
  shoppingDetailsHome: []
};
/* eslint-disable default-case, no-param-reassign */
const othersellerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_OTHER_SELLER_SUCCESSS:
        draft.sellerlist = action.listseller
        break;
      case SHOPPING_CART_DETAILS_SALLER:
        draft.shoppingDetailsHome = action.shoppingcartDetails
        break
    }
  });
export default othersellerReducer;
