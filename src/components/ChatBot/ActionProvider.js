import React from 'react';
import PropTypes from 'prop-types';
import CustomsAPI from '../../containers/MainPage/api/homeServices';
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Welcome to Adibuja Bot!');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  /* const returnChatBotResponse = (response) => (<div>
    <h4>{response.message}</h4>
    {response && response.option ?
      response.option.map((data) =>
        <div style={{ marginTop: "10px" }}>
          <div><a href={data.PageUrl}><img alt="product" referrerpolicy="no-referrer" src={data.Image} /></a></div>
          <a href={data.PageUrl}><h7>{data.DisplayName}</h7></a>
        </div>
      ) : ""
    }
  </div>) */
  const returnChatBotResponse = (response) => {
    // const botReponseData = "";
    if (response && response.option && response.option[0].OrderNumber && response.option[0].OrderNumber !== "") {
      return (<div>
        <h4 className="hey">{response.message}</h4>
        <h5>Order Number: {response.option[0].OrderNumber}</h5><h5>Order Amount: {response.option[0].OrderAmount}</h5></div>)
    } if (response && response.option) {
      return (<div>
        <h4>{response.message}</h4>
        {
          response.option.map((data) =>
            <div style={{ marginTop: "10px" }}>
              <div><a href={data.PageUrl}><img alt="product" referrerpolicy="no-referrer" src={data.Image} /></a></div>
              <a href={data.PageUrl}><h7>{data.DisplayName}</h7></a>
            </div>
          )}
      </div>)
    } if (response.message && response.message === null) {
      return (<h4>Please submit valid request</h4>)
    }
    return (<div>
      <h4>{response.message}</h4>
    </div>)
  }
  const handleUserInputChatBot = (userResponse) => {
    if (userResponse) {
      CustomsAPI.getChatBotAIResponse(userResponse)
        .then(response => response)
        .then(response => {
          let initialResp = '';
          if (response.message === 'NonAI') {
            initialResp = (<div><h4>Only logged in user can see the details.</h4><h4><a href="/login">Click here</a> to login</h4></div>);
          } else {
            initialResp = returnChatBotResponse(response);
          }
          const botMessage = createChatBotMessage(initialResp);
          setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
          }));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  return (
    <div>
      {React.Children.map(children, (child) => React.cloneElement(child, {
        actions: {
          handleHello,
          handleUserInputChatBot
        },
      }))}
    </div>
  );
};
ActionProvider.propTypes = {
  createChatBotMessage: PropTypes.node,
  setState: PropTypes.node,
  children: PropTypes.node,
};
export default ActionProvider;