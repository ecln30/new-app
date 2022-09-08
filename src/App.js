import './App.css';
import {Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Reset from './pages/Reset'
import Dashboard from './pages/Dashboard'

// main function App
function App() {
  return (
    <div className="App">
      <Routes>
      <Route  path="/" element={<Login />} />
          <Route  path="register" element={<Register />} />
          <Route  path="reset" element={<Reset />} />
          <Route  path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
