/**
 *
 * Asynchronously loads the component for MainRoute
 *
 */
import loadable from '@/utils/loadable';
export default loadable(() => import('./index'));
