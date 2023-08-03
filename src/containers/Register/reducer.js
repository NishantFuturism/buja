/*
 *
 * Register reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SEND_OTP_FAILURE, SEND_OTP_REQUEST, SEND_OTP_SUCCESS } from './constants';
export const initialState = {
  enableview: false,
  sendotpdata: []
};
/* eslint-disable default-case, no-param-reassign */
const registerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SEND_OTP_REQUEST:
        break;
      case SEND_OTP_SUCCESS:
        console.log('dndj', action);
        draft.enableview = true
        draft.sendotpdata = action.repos
        break;
      case SEND_OTP_FAILURE:
        // draft.error = action.error
        break;
    }
  });
export default registerReducer;
