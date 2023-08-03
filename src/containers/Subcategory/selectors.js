import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the subcategory state domain
 */
const selectSubcategoryDomain = state => state.subcategory || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by Subcategory
 */
const makeSelectSubcategory = () =>
  createSelector(
    selectSubcategoryDomain,
    substate => substate,
  );
export default makeSelectSubcategory;
export { selectSubcategoryDomain };
