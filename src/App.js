import React, { useState } from 'react';
import {
  useHistory
} from "react-router-dom";
import Body from './components/Body';
import Login from './components/Login';
import { auth } from './firebase';


function App() {
  const history = useHistory();
  const [isLogged, setIsLogged] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email)
      setName(user.displayName)
      setIsLogged(true)
    } else {
      // history.push('/login');
    }
  });
  if (isLogged)
    return <Body username={name} email={email} />
  else
    return (
      <Login />
    )
}

export default App
