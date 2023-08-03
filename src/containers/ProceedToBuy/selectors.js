import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the proceedToBuy state domain
 */
const selectProceedToBuyDomain = state => state.proceedToBuy || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by ProceedToBuy
 */
const makeSelectProceedToBuy = () =>
  createSelector(
    selectProceedToBuyDomain,
    substate => substate,
  );
export default makeSelectProceedToBuy;
export { selectProceedToBuyDomain };
