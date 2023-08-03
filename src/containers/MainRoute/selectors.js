import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the mainRoute state domain
 */
const selectMainRouteDomain = state => state.mainRoute || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by MainRoute
 */
const makeSelectMainRoute = () =>
  createSelector(
    selectMainRouteDomain,
    substate => substate,
  );
export default makeSelectMainRoute;
export { selectMainRouteDomain };
