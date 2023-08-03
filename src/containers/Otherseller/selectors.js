import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the otherseller state domain
 */
const selectOthersellerDomain = state => state.otherseller || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by Otherseller
 */
const makeSelectOtherseller = () =>
  createSelector(
    selectOthersellerDomain,
    substate => substate,
  );
export default makeSelectOtherseller;
export { selectOthersellerDomain };
