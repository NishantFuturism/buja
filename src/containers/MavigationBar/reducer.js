/*
 *
 * MavigationBar reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_DB_AUTOSUGGESTION_SUCCESS, GET_SERACH_PRODUCTS_SUCCESS, OPEN_MY_CART, FILTERMOB_ICON, HOMECART_ICON } from './constants';
export const initialState = {
  isOpenMyCart: false,
  dblist: [],
  searchsku: [],
  filterinfo: "",
  cartinfo: ""
};
/* eslint-disable default-case, no-param-reassign */
const mavigationBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case OPEN_MY_CART:
        draft.isOpenMyCart = action.isOpen
        break;
      case GET_DB_AUTOSUGGESTION_SUCCESS:
        console.log('reducersearchlist', action.searchlist)
        draft.dblist = action.searchlist
        break;
      case GET_SERACH_PRODUCTS_SUCCESS:
        draft.searchsku = action.skuproducts
        break;
      case FILTERMOB_ICON:
        console.log("reducer...", action.isActive)
        draft.filterinfo = action.isActive
        break;
      case HOMECART_ICON:
        console.log("reducercart...", action.carticon)
        draft.cartinfo = action.carticon
        break;
    }
  });
export default mavigationBarReducer;
