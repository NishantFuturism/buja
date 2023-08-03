import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the trackorder state domain
 */
const selectTrackorderDomain = state => state.trackorder || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by Trackorder
 */
const makeSelectTrackorder = () =>
  createSelector(
    selectTrackorderDomain,
    substate => substate,
  );
export default makeSelectTrackorder;
export { selectTrackorderDomain };
