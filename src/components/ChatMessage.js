import React from 'react'
import "./ChatMessage.css"

function ChatMessage(props) {
    return (
        <div className={props.isSent?"chatMessage__isSentContainer":"chatMessage__container"}>
            <span className={props.isSent?"chatMessage__msgisSent":"chatMessage__msg"}>Hi there!</span>
        </div>
    )
}

export default ChatMessage
