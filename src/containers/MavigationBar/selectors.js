import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the mavigationBar state domain
 */
const selectMavigationBarDomain = state => state.mavigationBar || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by MavigationBar
 */
const makeSelectMavigationBar = () =>
  createSelector(
    selectMavigationBarDomain,
    substate => substate,
  );
export default makeSelectMavigationBar;
export { selectMavigationBarDomain };
