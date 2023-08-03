import React from 'react';
import { createChatBotMessage } from "react-chatbot-kit";
import minChatBox from '../../images/minimize-chatbox.png';
import chatBotLogo from '../../images/bot-logo.png';
const handleChatBotClose = () => {
  const x = document.getElementsByClassName("react-chatbot-kit-chat-container");
  if (x[0].style.display === "none") {
    x[0].style.display = "block";
  } else {
    x[0].style.display = "none";
  }
}
const chatbotConfig = {
  botName: "Adibuja Bot",
  initialMessages: [createChatBotMessage("Welcome to Adibuja Bot!")],
  customComponents: {
    header: () => <div className="chatbot-header"><div className="chatbot-header-left"><img alt="chatbot-header" src={chatBotLogo} style={{ width: '24px', height: '24px' }} /><span style={{ marginLeft: "5px" }}>Adibuja <b>bot</b></span></div><div style={{ flex: "1" }}><img alt="close" role='presentation' onClick={handleChatBotClose} onKeyPress={handleChatBotClose} src={minChatBox} style={{ width: '27px', height: '27px' }}></img></div> </div>
  },
}
export default chatbotConfig