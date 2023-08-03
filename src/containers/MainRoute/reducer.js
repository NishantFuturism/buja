/*
 *
 * MainRoute reducer
 *
 */
import produce from 'immer';
import { MEGA_MENU_SUCCESS } from './constants';
export const initialState = {
  megaMenuResp: []
};
/* eslint-disable default-case, no-param-reassign */
const mainRouteReducer = (state = initialState, action) =>
  produce(state, (/* (draft) */) => {
    switch (action.type) {
      case MEGA_MENU_SUCCESS:
        break;
    }
  });
export default mainRouteReducer;
