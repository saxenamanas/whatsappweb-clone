import React from 'react';
import './ChatHeads.css';
import Avatar from '@material-ui/core/Avatar'

function ChatHeads(props) {
    return (
        <div className="chatHeads__Wrapper">
            <Avatar className="chatHeads__avatar" />
            <div className="chatHeads__chatData">
                <span className="chatHeads__name">{props.name}</span>
                <span className="chatHeads__lastMsg">{props.lastMsg}</span>
            </div>
        </div>
    )
}

export default ChatHeads
