import React from 'react';
import chatBotLogo from '../../images/bot-logo-icon.png';
import '../../../assets1/css/style.min.css';
const ChatBotLogo = () => {
  const chatBotLogoClickHandler = () => {
    const x = document.getElementsByClassName("react-chatbot-kit-chat-container");
    console.log(`display prop--->${x[0].style.display}`);
    if (x[0].style.display === "") {
      x[0].style.display = "block";
    } else if (x[0].style.display === "none") {
      x[0].style.display = "block";
    } else {
      x[0].style.display = "none";
    }
  }
  return (
    <>
      <div className="chatbot-logo-initial" title="Adibuja Chatbot (Beta)" style={{ display: "block" }}> <span id="chatbot-logo-initial-span"> <img alt="adibuja-chatbot" role='presentation' onClick={chatBotLogoClickHandler} onKeyPress={chatBotLogoClickHandler} src={chatBotLogo} style={{ width: '45px', height: '45px' }} className="img-responsive center-block width-100" /> </span> </div>
    </>
  )
}
export default ChatBotLogo;