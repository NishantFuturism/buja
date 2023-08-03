/**
 *
 * Asynchronously loads the component for Wishlist
 *
 */
import loadable from 'utils/loadable';
export default loadable(() => import('./index-back'));
