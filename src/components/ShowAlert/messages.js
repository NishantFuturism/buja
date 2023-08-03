/*
 * ShowAlert Messages
 *
 * This contains all the text for the ShowAlert component.
 */
import { defineMessages } from 'react-intl';
export const scope = 'app.components.ShowAlert';
export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ShowAlert component!',
  },
});
