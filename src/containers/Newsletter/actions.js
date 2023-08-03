/*
 *
 * Newsletter actions
 *
 */
import { DEFAULT_ACTION, LOAD_VALIDATION_POPUP, SUBSCRIBE_EMAIL } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function subscribeemail(email) {
  return {
    type: SUBSCRIBE_EMAIL,
    email
  };
}
export function validationmpopup(popup) {
  return {
    type: LOAD_VALIDATION_POPUP,
    popup
  };
}