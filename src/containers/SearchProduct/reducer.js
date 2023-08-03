/*
 *
 * SearchProduct reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SHOPPING_CART_DETAILS_SEARCH } from './constants';
export const initialState = {
  shoppingCartDetailsSearch: [],
};
/* eslint-disable default-case, no-param-reassign */
const searchProductReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SHOPPING_CART_DETAILS_SEARCH:
        draft.shoppingCartDetailsSearch = action.shoppingcartDetails
        break;
    }
  });
export default searchProductReducer;
