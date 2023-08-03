/*
 * Newsletter Messages
 *
 * This contains all the text for the Newsletter container.
 */
import { defineMessages } from 'react-intl';
export const scope = 'app.containers.Newsletter';
export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Newsletter container!',
  },
});
