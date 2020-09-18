import React from 'react';
import './App.css';
import Avatar from '@material-ui/core/Avatar';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ChatHeads from './components/ChatHeads';
import SendIcon from '@material-ui/icons/Send';
import ChatMessage from './components/ChatMessage';

function App() {
  const msgList = [
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',
    'Hey',

  ]
  const chatList = [
    {
      name: "Manas Saxena",
      lastMsg: "Hey! Whatsup?"
    },
    {
      name: "Manas Saxena",
      lastMsg: "Hey! Whatsup?"
    },
    {
      name: "Manas Saxena",
      lastMsg: "Hey! Whatsup?"
    },
    {
      name: "Manas Saxena",
      lastMsg: "Hey! Whatsup?"
    },
    {
      name: "Manas Saxena",
      lastMsg: "Hey! Whatsup?"
    },
    {
      name: "Manas Saxena",
      lastMsg: "Hey! Whatsup?"
    },
    {
      name: "Manas Saxena",
      lastMsg: "Hey! Whatsup?"
    },
    {
      name: "Manas Saxena",
      lastMsg: "Hey! Whatsup?"
    },

  ];
  return (
    <div className="app">
      <div className="body__back">
      </div>
      <div className="body__main">

        {/* SideBar */}
        <div className="body__sideBarMain">
          <div className="body__Head">
            <div className="body__sideBarHeaderMain">
              <Avatar />
              <div className="body__sideBarActions">
                <DonutLargeIcon className="sideBar__actionButton" />
                <ChatIcon className="sideBar__actionButton" />
                <MoreVertIcon className="sideBar__actionButton" />
              </div>
            </div>
          </div>


          {/* Search Bar */}
          <div className="body__sideBarSearchMain">
            <div className="body__sideBarSearchContainer">
              <SearchIcon />
              <input placeholder="Search here..." className="body__sideBarSearchInput"></input>
            </div>
          </div>

          {/* Chat List */}
          <div className="body__sideBarChatHeads">
            {chatList.map((ele) => {
              return <ChatHeads name={ele.name} lastMsg={ele.lastMsg} />
            })}
            {chatList.map((ele) => {
              return <ChatHeads name={ele.name} lastMsg={ele.lastMsg} />
            })}

          </div>

        </div>

        <div className="body__chatWindowMain">
          {/* Header */}
          <div className="chatWindow__Header">
            <div className="chatHeader__User">
              <Avatar />
              <span className="chatHeader__heading">Manas Saxena</span>
            </div>
            <div className="chatHeader__actions">
              <SearchIcon className="chatHeader__icons"></SearchIcon>
              <MoreVertIcon className="chatHeader__icons"/>
            </div>
          </div>

          {/* ChatLogs */}
          <div className="chatLogs__Wrapper">
            {msgList.map((ele)=>{
              return  <ChatMessage/>
            })}
            <ChatMessage isSent/>
            <ChatMessage/>
          </div>

          {/* Input Field */}
          <div className="chatWindow__input">
            <input placeholder="Enter your text here..." className="chatWindow__textField"></input>
            <SendIcon className="chatWindow__sendIcon"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
