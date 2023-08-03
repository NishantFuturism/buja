/*
 *
 * Products reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
export const initialState = {
  skucode: []
};
/* eslint-disable default-case, no-param-reassign */
const productsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        console.log('action sku', action);
        draft.skucode = action.SkuCode
        break;
    }
  });
export default productsReducer;
