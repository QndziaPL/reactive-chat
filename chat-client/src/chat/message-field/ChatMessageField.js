import React from 'react';
import './ChatMessageField.css';

const ChatMessageField = ({userName, setMessageText, setUserName, messageText, send}) => {

    const handleEnterPressed = event => {
        if (event.key === "Enter") {
            event.preventDefault()
            send()
        }
    }
    return (
        <div className="message-input-container">
            <div className="chat-message-field">
                <div className="textarea-container">
                    <textarea id="messageInput" className="chat-text-field" value={messageText}
                              onKeyPress={handleEnterPressed} rows={3} wrap={"hard"}
                              name="messageText"
                              onChange={(event) => setMessageText(event.target.value)}/>
                </div>
                <div id="sendButton" className="chat-message send-button " onClick={send}>send</div>
            </div>

            <div style={{textAlign: "right", marginTop: 20}}>
                <label className="username-input-label">Logged as: </label>
                <input id="username-input" type="text" className="form-control" placeholder="Username"
                       value={userName} name="userName"
                       onChange={(event) => setUserName(event.target.value)}/>
            </div>
        </div>
    );
}

export default ChatMessageField