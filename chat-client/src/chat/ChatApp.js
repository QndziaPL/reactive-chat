import React, {useEffect, useState} from 'react';
import './ChatApp.css';
import ChatMessageField from './message-field/ChatMessageField';
import ChatWindow from './window/ChatWindow';


const ChatApp = () => {
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState("")
    const [userName, setUserName] = useState("anonymus")

    const clientWebSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    useEffect(() => {
        document.title = 'Chatter'

        clientWebSocket.onopen =  () => {
            console.log("clientWebSocket.onopen");
        }
        clientWebSocket.onclose =  (error) => {
            console.log("clientWebSocket.onclose", error);
        }
        clientWebSocket.onerror =  (error) => {
            console.log("clientWebSocket.onerror", error);
        }
        clientWebSocket.onmessage = (event) => {
            setMessages((prev) => [...prev, JSON.parse(event.data)])
        }
    }, [clientWebSocket.CONNECTING])

    const sendMessage = () => {
        if (messageText.length === 0) {
            return
        }
        const message = {
            userName,
            content: messageText
        }
        clientWebSocket.readyState === clientWebSocket.OPEN && clientWebSocket.send(JSON.stringify(message))
        setMessageText("")
    }

    return (
        <div className="whole-app">
            <div className="chat-app">
                <h1 className="header-container chat-message">chatter</h1>
                <ChatWindow userName={userName} messages={messages}/>
                <ChatMessageField userName={userName} messageText={messageText} send={sendMessage}
                                  setMessageText={setMessageText} setUserName={setUserName}/>
            </div>
        </div>
    );
}

export default ChatApp