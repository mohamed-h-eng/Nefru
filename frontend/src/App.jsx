import styles from './App.module.css'
import {Link, Routes, Route} from 'react-router-dom'

import Welcome from './pages/Auth/Welcome/Welcome'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import Home from './pages/User/Home/Home'
import Trips from './pages/User/Trips/Trips'
import Saved from './pages/User/Saved/Saved'
import Profile from './pages/User/Profile/Profile'
import Book from './pages/User/Trips/Book/Book'
import Info from './pages/User/Trips/Info/Info'
import Status from './pages/User/Trips//Book/Status/Status'
import Guide from './pages/User/Trips/Guide/Guide'

import User from './pages/User/User'
// LEAVE THIS CODE
//    Explain:  this will be used to protect admin endpoints when finished
// function ProtectedRoute({ children }){
//     const token = localStorage.getItem('token');
//     return token ? children : <Navigate to="/" />;
// };

function App() {
  return (
    <>
      <Routes>
        {/* not found route */}
        <Route index path="*" element={<></>}/> 
        {/*  */}
        <Route index path="/" element={<Welcome/>}/>
        <Route path="auth">
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />}/>
        </Route>
        <Route path="user/*" element={<User/>}/>
        <Route path="guide">
          <Route path="home" element={<></>}/>
          <Route path="tours" element={<></>}/>
          <Route path="saved" element={<></>}/>
          <Route path="profile" element={<></>}/>
        </Route>
        <Route path="dashboard"/>
      </Routes>
    </>
  );
}

export default App;