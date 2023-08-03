/**
 *
 * Asynchronously loads the component for LoadProducts
 *
 */
import loadable from 'utils/loadable';
export default loadable(() => import('./index'));
