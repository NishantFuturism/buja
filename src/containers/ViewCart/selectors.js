import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the viewCart state domain
 */
const selectViewCartDomain = state => state.viewCart || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by ViewCart
 */
const makeSelectViewCart = () =>
  createSelector(
    selectViewCartDomain,
    substate => substate,
  );
// export default ;
export { selectViewCartDomain, makeSelectViewCart };
