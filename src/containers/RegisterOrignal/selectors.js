import { createSelector } from 'reselect';
import { initialState } from './reducer';
export const selectRegisterOrignalDomain = state => state.registerOrignal || initialState;
// const selectRouter = state => state.router;
const makeSelectCurrentUser = () =>
  createSelector(
    selectRegisterOrignalDomain,
    registerState => registerState.username,
  );
const makeSelectCurrentUserOTP = () =>
  createSelector(
    selectRegisterOrignalDomain,
    registerState => registerState.otpvalue,
  );
const makeSelectLoading = () =>
  createSelector(
    selectRegisterOrignalDomain,
    registerState => registerState,
  );
const makeSelectError = () =>
  createSelector(
    selectRegisterOrignalDomain,
    registerState => registerState.error,
  );
const makeSelectRepos = () =>
  selectRegisterOrignalDomain(
    selectRegisterOrignalDomain,
    registerState => registerState.enableview
  );
const makeSelectLocation = () =>
  createSelector(
    selectRegisterOrignalDomain,
    registerState => registerState.phonesuccessdata,
  );
const makeloginreqhome = () =>
  selectRegisterOrignalDomain(
    selectRegisterOrignalDomain,
    registerState => registerState.use,
  );
const makeSelectverifieddata = () =>
  selectRegisterOrignalDomain(
    selectRegisterOrignalDomain,
    registerState => registerState.verifieddata,
  );
export {
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectCurrentUserOTP,
  makeloginreqhome,
  makeSelectverifieddata,
};
