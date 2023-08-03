import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the orderdeatails state domain
 */
const selectOrderdeatailsDomain = state => state.orderdeatails || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by Orderdeatails
 */
const makeSelectOrderdeatails = () =>
  createSelector(
    selectOrderdeatailsDomain,
    substate => substate,
  );
export default makeSelectOrderdeatails;
export { selectOrderdeatailsDomain };
