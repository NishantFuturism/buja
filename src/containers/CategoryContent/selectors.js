import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the categoryContent state domain
 */
const selectCategoryContentDomain = state =>
  state.categoryContent || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by CategoryContent
 */
const makeSelectCategoryContent = () =>
  createSelector(
    selectCategoryContentDomain,
    substate => substate,
  );
export default makeSelectCategoryContent;
export { selectCategoryContentDomain };
