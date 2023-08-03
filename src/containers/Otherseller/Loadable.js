/**
 *
 * Asynchronously loads the component for Otherseller
 *
 */
import loadable from 'utils/loadable';
export default loadable(() => import('./index'));
