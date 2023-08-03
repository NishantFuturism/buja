/**
 *
 * Asynchronously loads the component for ShowAlert
 *
 */
import loadable from 'utils/loadable';
// import  Alert  from './Alert';
export default loadable(() => import('./Alert'));
