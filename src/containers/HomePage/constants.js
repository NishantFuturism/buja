/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';
export const SUBMIT_FORM = 'adibuja/Home/SUBMIT_FORM';
export const GET_TEXT = 'boilerplate/Home/CHANGE_USERNAME';
export const GET_COMMON_CART = 'app/Home/GET_COMMON_CART';
export const GET_COMMON_CART_SUCCESS = 'app/Home/GET_COMMON_CART_SUCCESS';
export const ADD_TO_WISHLIST = 'app/Home/ADD_TO_WISHLIST';
export const ADD_TO_WISHLIST_SUCCESS_HOME = 'app/Home/ADD_TO_WISHLIST_SUCCESS_HOME';
export const GET_COMMON_CART_ERROR = 'app/Home/GET_COMMON_CART_ERROR';
export const GOOGLE_LOGIN = 'app/Home/GOOGLE_LOGIN';
export const SHOPPING_CART_DETAILS = 'app/Home/SHOPPING_CART_DETAILS';
