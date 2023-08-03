import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the locationPopup state domain
 */
export const selectLocationPopupDomain = state => state.locationPopup || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by LocationPopup
 */
const makeSelectLocationPopup = () =>
  createSelector(
    selectLocationPopupDomain,
    locationPopupstate => locationPopupstate.input
  );
const makeSelectLocationuser = () =>
  createSelector(
    selectLocationPopupDomain,
    locationPopupstate => locationPopupstate
  );
// export default makeSelectLocationPopup;
export { makeSelectLocationuser, makeSelectLocationPopup };
