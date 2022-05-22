import React, { useState, useContext, useEffect } from 'react'
import { socketContext } from "App"
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useLocation } from 'react-router-dom';

export default function ChatOverlay(props) {
    const socket = useContext(socketContext).socket
    const [visibility, setVisibility] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('account')) {
            setVisibility(false)
        } else {
            setVisibility(true)
        }
    }, [location])

    useEffect(() => {
        if (location.pathname.includes('account')) {
            setVisibility(false)
        } else {
            setVisibility(true)
        }


        if (socket) {
            socket.on("chat", (data) => {
                let email = localStorage.getItem("email")
                if (data.Email !== email) {
                    addResponseMessage(`${data.UserName ? data.UserName : data.Email}: ${data.Message}`)
                }
            })
        }


    }, [socket])

    const handleNewUserMessage = (newMessage) => {
        if (socket)
            socket.emit("chat", newMessage)
    };

    return (
        visibility ?
            <div className='ignore-style'>
                <Widget
                    handleNewUserMessage={handleNewUserMessage}
                    title="Chat box"
                    emojis={true}
                    customComponent={(data) => { console.log(data) }}
                    subtitle={null}
                />
            </div>
            : null
    )
}
