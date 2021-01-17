import React, {useEffect, useState, useRef} from 'react';
import './ChatApp.css';
import ChatMessageField from './message-field/ChatMessageField';
import ChatWindow from './window/ChatWindow';
import {w3cwebsocket as WebSocket} from "websocket"


const ChatApp = () => {
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState("")
    const [userName, setUserName] = useState("anonymus")

    const client = useRef(null)

    // const clientWebSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);


    // useEffect(() => {

    //     document.title = 'Chatter'
    //
    //     clientWebSocket.onopen =  () => {
    //         console.log("clientWebSocket.onopen");
    //     }
    //     clientWebSocket.onclose =  (error) => {
    //         console.log("clientWebSocket.onclose", error);
    //     }
    //     clientWebSocket.onerror =  (error) => {
    //         console.log("clientWebSocket.onerror", error);
    //     }
    //     clientWebSocket.onmessage = (event) => {
    //         setMessages((prev) => [...prev, JSON.parse(event.data)])
    //     }
    // }, [])

    useEffect(() => {
        client.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
        client.current.onopen = () => {
            console.log("client connected")
        }
        client.current.onmessage = (event) => {
            setMessages((prev) => [...prev, JSON.parse(event.data)])
        }
    },[])



    const sendMessage = () => {
        if (messageText.length === 0) {
            return
        }
        const message = {
            userName,
            content: messageText
        }
        // clientWebSocket.readyState === clientWebSocket.OPEN && clientWebSocket.send(JSON.stringify(message))
        client.current.send(JSON.stringify(message))
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