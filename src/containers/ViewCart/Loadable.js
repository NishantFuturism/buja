/**
 *
 * Asynchronously loads the component for ViewCart
 *
 */
import loadable from 'utils/loadable';
export default loadable(() => import('./index-back'));
