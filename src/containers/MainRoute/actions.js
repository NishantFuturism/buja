/*
 *
 * MainRoute actions
 *
 */
import { DEFAULT_ACTION, MEGA_MENU } from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function megaMenuAction() {
  return {
    type: MEGA_MENU,
  };
}
