import React from 'react';
import PropTypes from 'prop-types';
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    actions.handleUserInputChatBot(message);
  };
  return (
    <div>
      {React.Children.map(children, (child) => React.cloneElement(child, {
        parse,
        actions: {},
      }))}
    </div>
  );
};
MessageParser.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.node,
};
export default MessageParser;