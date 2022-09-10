import './App.css';
import {logout,auth, getFirestore,query,getDocs,collection,where,addDoc,db} from './firebase'
import { doc,setDoc,onSnapshot,serverTimestamp, updateDoc} from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import React,{ useEffect, useState} from 'react';
import {Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Reset from './pages/Reset'
import Navbar from './pages/Navbar'
import Dashboard from './pages/Dashboard'


// main function App
function App() {
  const [isShow,setIsShow] = useState(false);
  const [file,setFile] = useState('')
  const [onclick,setOnclick] = useState(false)
  const [user] = useAuthState(auth)
  const [email,setEmail] = useState('')
  const [input,setInput] = useState('')
  const [text,setText] = useState([])
  const [count,setCount] = useState(0)
  const userRef = query(collection(db, "users"), 
  where("email", "==", email))

  useEffect(f => {
     onSnapshot(userRef, snapshot => {
       setText(snapshot.docs.map(doc=>({
        id:doc.id,
        item: doc.data()
       })))
     })
  }, [input])
  console.log(text)
  const SaveText = async () => {
    if(!user)return
    alert('this is from save')
    const findUsers = await getDocs(userRef);
    findUsers.forEach( async user => {
       const getUser = doc(db, 'users', user.id)
       await updateDoc(getUser, {
         text:input,
         timeStamp: serverTimestamp()
       })
       alert('saved your data in:' + user.id)
       console.log(user.id)
    })}

  const handlefile = () => {
     if(!user) return
     setFile(text.map(data => data.item.text))
     alert(file)
     setOnclick(true)
  }

  const handleShow = f =>{
     setIsShow( true)
  }

  useEffect(f => {
    setCount(
         input.replace(/\s/g, '').length
    )
  },[text])
 
  
  return (
    <div className="App">
      <Navbar handleShow={handleShow} 
         handlefile={handlefile}
         file={file}
         onclick={onclick}
         SaveText={SaveText}
      />
      <Routes>
        <Route  path="Login" element={<Login 
        email={email} setEmail={setEmail}
        isShow={isShow}/>} />
        <Route  path="reset" element={<Reset />} />
        <Route  path="dashboard" element={<Dashboard />} />
        <Route path='register' element={<Register />} />
      </Routes>
      <div className="text_container">
        
         <textarea  className={`textarea ${isShow && 'hidden'} ${user && 'show'}`}
          value={input}
          onChange={e => setInput(e.target.value)}
         />
        <p className={`count ${isShow && 'hidden' } ${user && 'show'}`}>{count}</p>
      </div>
    </div>
  );
}

export default App;
