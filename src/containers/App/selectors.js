/**
 * The global state selectors
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectGlobal = state => state.global || initialState;
console.log('fgg', selectGlobal);
const selectRouter = state => state.router;
const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );
const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );
const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );
const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState,
  );
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );
const makeloginreqhome = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.use,
  );
export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeloginreqhome,
};
