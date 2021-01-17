import React from 'react';
import './ChatMessageField.css';

const ChatMessageField = ({userName, setMessageText, setUserName, messageText, send}) => {

    const handleEnterPressed = event => {
        if (event.key === "Enter"){
            event.preventDefault()
            send()
        }
    }
    return (
        <div className="message-input-container">
            <div className="chat-message-field">
                    <textarea id="messageInput" className="form-control chat-text-field" value={messageText}
                              onKeyPress={handleEnterPressed} rows={3} wrap={"hard"}
                              name="messageText" onChange={(event) => setMessageText(event.target.value)}/>
                <div id="sendButton" className="send-button" onClick={send}>Send</div>
            </div>

            <div style={{textAlign: "right"}}>
                <label className="username-input-label">Nick: </label>
                <input id="username-input" type="text" className="form-control" placeholder="Username"
                       value={userName} name="userName" onChange={(event) => setUserName(event.target.value)}/>
            </div>
        </div>
    );
}

export default ChatMessageField