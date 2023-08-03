/*
 *
 * Subcategory reducer
 *
 */
import produce from 'immer';
import { PRODUCT_BRAND_LIST_FILTER_SUCCESS, PRODUCT_LIST, PRODUCT_LIST_SUCCESS, RemoveOldData, SHOPPING_CART_DETAILS } from './constants';
export const initialState = {
  subCategoryProductList: {},
  shoppingCartDetails: [],
  error: '',
  caturl: '',
  filterdata: [],
  advanceSkusListingByFilterModels: [],
  productlistdata: [],
  productlist: [],
  scrollvalue: 400,
  parentcaturl: [],
  url: [],
  divenable: false,
  CategoryName: '',
  loading: ''
};
/* eslint-disable default-case, no-param-reassign */
const subcategoryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PRODUCT_LIST:
        draft.loading = true
        draft = { ...draft }
        break;
      case PRODUCT_LIST_SUCCESS:
        draft.loading = false
        draft.subCategoryProductList = action.subCategoryProductList
        draft.productlist = draft.productlist.concat(action.subCategoryProductList.skuListingModels)
        break;
      case PRODUCT_BRAND_LIST_FILTER_SUCCESS:
        draft.loading = false
        draft.advanceSkusListingByFilterModels = action.brandlistfilterdata.advanceSkusListingByFilterModels
        break;
      case SHOPPING_CART_DETAILS:
        // draft = { ...draft, shoppingCartDetails: action.shoppingcartDetails }
        draft.shoppingCartDetails = action.shoppingcartDetails
        break;
      case RemoveOldData:
        draft.productlist = []
        break;
    }
  });
export default subcategoryReducer;
