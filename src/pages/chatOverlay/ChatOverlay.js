import React, { useState, useContext, useEffect } from 'react'
import { socketContext } from "App"
import { Widget, addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import logo from 'resources/icons/add_grey.svg'
import { useLocation } from 'react-router-dom';

export default function ChatOverlay(props) {
    const socket = useContext(socketContext).socket
    const [myEmail, setMyEmail] = useState('')
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


        if (socket)
            socket.on("chat", (data) => {
                if (data.Email !== myEmail) {
                    addResponseMessage(`${data.UserName ? data.UserName : data.Email}: ${data.Message}`)
                }
            })
        let email = localStorage.getItem("email")
        if (email) setMyEmail(email)

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
