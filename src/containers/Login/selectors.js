import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = state => state.login || initialState;
/**
 * Other specific selectors
 */
/**
 * Default selector used by Login
 */
const makeSelectLogin = () =>
  createSelector(
    selectLoginDomain,
    loginstate => loginstate,
  );
const makeSelectCurrentUser = () =>
  createSelector(
    selectLoginDomain,
    loginstate => loginstate.username,
  );
export {
  makeSelectCurrentUser,
  makeSelectLogin
};
