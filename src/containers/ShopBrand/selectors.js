import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the shopBrand state domain
 */

const selectShopBrandDomain = state => state.shopBrand || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ShopBrand
 */

const makeSelectShopBrand = () =>
  createSelector(
    selectShopBrandDomain,
    substate => substate,
  );

export default makeSelectShopBrand;
export { selectShopBrandDomain };
