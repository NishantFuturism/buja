/**
 *
 * Asynchronously loads the component for FeatureProduct
 *
 */
import loadable from 'utils/loadable';
export default loadable(() => import('./index'));
