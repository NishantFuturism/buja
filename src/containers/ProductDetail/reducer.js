/*
 *
 * Product reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_CUSTOMER_REVIEW, GET_CUSTOMER_REVIEW_SUCCESS, GET_SKU_PRODUCTDETAIL, GET_SKU_PRODUCTDETAIL_FAILURE, GET_SKU_PRODUCTDETAIL_SUCCESS, SHOPPING_CART_DETAILS_BUYPRODUCT } from './constants';
export const initialState = {
  skudetaildata: [],
  reviewdata: [],
  shoppingDetailsHome: []
};
/* eslint-disable default-case, no-param-reassign */
const productReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_SKU_PRODUCTDETAIL:
        break;
      case GET_SKU_PRODUCTDETAIL_SUCCESS:
        draft.skudetaildata = action.skudetaildata
        break;
      case GET_SKU_PRODUCTDETAIL_FAILURE:
        break;
      case GET_CUSTOMER_REVIEW:
        break;
      case GET_CUSTOMER_REVIEW_SUCCESS:
        draft.reviewdata = action.reviewdata
        break;
      case SHOPPING_CART_DETAILS_BUYPRODUCT:
        draft.shoppingDetailsHome = action.shoppingcartDetails
        break
    }
  });
export default productReducer;
