import produce from 'immer';
import { CONTACT_S_DATA, SHOW_CONTACT_POPUP } from "./constants";
export const initialState = {
  IsMsgbar: false,
  contactusinfo: '',
  savecpopup: '',
};
/* eslint-disable default-case, no-param-reassign */
const contactdeatailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONTACT_S_DATA:
        draft.IsMsgbar = true
        draft.contactusinfo = action.contactinfo
        break;
      case SHOW_CONTACT_POPUP:
        draft.savecpopup = action.popupsave
        break;
    }
  });
export default contactdeatailsReducer;