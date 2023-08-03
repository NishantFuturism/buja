/*
 *
 * Newsletter reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOAD_VALIDATION_POPUP, SUBSCRIBE_EMAIL_SUCCESS } from './constants';
export const initialState = {
  emalipopup: '',
  subscribemsg: ''
};
/* eslint-disable default-case, no-param-reassign */
const newsletterReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_VALIDATION_POPUP:
        draft.emalipopup = action.popup
        break;
      case SUBSCRIBE_EMAIL_SUCCESS:
        // draft.subscribemsg = action.popup
        break;
    }
  });
export default newsletterReducer;
