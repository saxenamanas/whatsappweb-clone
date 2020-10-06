import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ChatHeads from './ChatHeads';
import ChatMessage from './ChatMessage';
import { gql, useApolloClient, useSubscription } from '@apollo/client';
import "./Body.css";
import { auth } from '../firebase';


const COMMENTS_SUBSCRIPTION = gql`
  subscription chatSub($members:String!){
    chatHistory(participants:$members){
      msg
      sender
    }
  }
`

const GET_USERS = gql`
  query GetUsers($currentUser:String!){
    getUsers(current:$currentUser){
      name,
      email,
      id
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($msg:String!,$members:String!,$sender:String!){
    sendMessage(msg:$msg,participants:$members,sender:$sender)
  }
`

const LOGIN_USER = gql`
  mutation loginUser($email:String!,$name:String!){
    createUser(data:{name:$name,email:$email}){
      id
      name
      email
    }
  }
`

let currentUser = '';
let members = '';

const GET_CHAT = gql`
  query GetChat($id:String!,$currentUser:String!){
    chatHistory(first:$currentUser,second:$id){
      msg,
      sender
    }
  }
`

function Body(props) {
  // const {data,loading,error} = useSubscription(COMMENTS_SUBSCRIPTION,{
  //   shouldResubscribe:true
  // });


  // console.log(data)
  // const [currentUser, setCurrentUser] = useState('');
  let subs;
  const client = useApolloClient();
  const [users, setUsers] = useState([]);
  const [msgField, setMessageField] = useState('');
  const [activeChat, setActiveChat] = useState({});
  const [chatLog, setChatLog] = useState([]);



  useEffect(() => {
    const mount = async () => {
      let user = await client.mutate({
        mutation: LOGIN_USER, variables: {
          email: props.email,
          name: props.username
        }
      });
      currentUser = user.data.createUser.id;
      let { data } = await client.query({ query: GET_USERS,variables:{currentUser:currentUser} });
      setUsers(data.getUsers);
      setActiveChat(data.getUsers[0])
      loadChat(data.getUsers[0], user.data.createUser.id);
    }
    mount()
  }, []);

  const sendMessage = async () => {
    let res = await client.mutate({
      mutation: SEND_MESSAGE, variables: {
        msg: msgField,
        members,
        sender: currentUser
      }
    })
    setMessageField('')
  }

  const loadChat = async (chat, cur) => {
    if (currentUser > chat.id) {
      members = chat.id + currentUser
    }
    else {
      members = currentUser + chat.id
    }
    setActiveChat(chat);
    subs = client.subscribe({ query: COMMENTS_SUBSCRIPTION, variables: { members } }).subscribe({
      next({ data }) {
        setChatLog(data.chatHistory.reverse())
      },

      error(err) {
        console.log(err)
      },
    });
    let { data } = await client.query({ query: GET_CHAT, variables: { id: chat.id, currentUser } });
    setChatLog(data.chatHistory.reverse());
  }


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
            {users.map((user) => {
              return <span key={user.email} onClick={() => loadChat(user)}><ChatHeads lastMsg={user.email} name={user.name} /></span>
            })}
          </div>
        </div>
        <div className="body__chatWindowMain">
          {/* Header */}
          <div className="chatWindow__Header">
            <div className="chatHeader__User">
              <Avatar />
              <span className="chatHeader__heading">{activeChat.name}</span>
            </div>
            <div className="chatHeader__actions">
              <SearchIcon className="chatHeader__icons"></SearchIcon>
              <MoreVertIcon className="chatHeader__icons" />
            </div>
          </div>

          {/* ChatLogs */}
          <div className="chatLogs__Wrapper">
            {chatLog.map(msg => {
              return <ChatMessage isSent={msg.sender == currentUser} content={msg.msg} />
            })}
          </div>

          {/* Input Field */}
          <div className="chatWindow__input">
            <input onKeyDown={(e) => { if (e.key == 'Enter' && msgField != '') { sendMessage() } }} value={msgField} onChange={(event) => { setMessageField(event.target.value) }} placeholder="Enter your text here..." className="chatWindow__textField"></input>
            {/* <SendIcon onClick={() => { (value != null) ? setMsgList([...msgList, value]) : console.log(msgList) }} className="chatWindow__sendIcon" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
