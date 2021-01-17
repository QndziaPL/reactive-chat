import React from 'react';
import './ChatWindow.css';
import person from "../../assets/person.png"

const ChatWindow = ({messages, userName}) => {
    const listItems = messages.map((msg) => {
            const isItMe = msg.userName === userName;
            const style = isItMe ? { textAlign: "right", backgroundColor: "#00bcec"}
                : {backgroundColor: "#24ffa0"}
            return (
                <div className="chat-message-container" style={{justifyContent: isItMe ? "flex-end" : "flex-start"}}>
                    <div className="chat-message" style={style} key={msg.id}>
                        <div className="chat-message-user" style={{justifyContent: isItMe ? "flex-end" : "flex-start"}}>
                            <p style={{display: "inline"}}>{msg.userName}</p>
                            <img alt=""  className="user-icon" src={person}/>
                        </div>
                        <p className="chat-message-text">{msg.content}</p>
                    </div>
                </div>

            )
        }
    );
    return (
        <div className="chat-window">
            {listItems}
        </div>
    );
}

export default ChatWindow