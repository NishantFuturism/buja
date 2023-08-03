/**
 *
 * Asynchronously loads the component for ProductGallery
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
