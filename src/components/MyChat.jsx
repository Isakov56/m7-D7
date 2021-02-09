import React, { Component } from "react";
import { addResponseMessage, Chat } from "react-chat-popup";

class MyChat extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    //console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  };

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default MyChat;
