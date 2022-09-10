import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard({setIsOut}) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.table(data)
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/')

    fetchUserName();
  }, [user, loading]);
  
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div> </div>
        <h2 className="dashboard__btn" onClick={logout}>
          Logout
        </h2>
        <div className='user_name'>{name}</div>
      </div>
    </div>
  );
}

export default Dashboard;
























































































