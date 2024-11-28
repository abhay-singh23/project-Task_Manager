import React, { useEffect } from 'react';
import {authActions} from "./store/auth"
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Alltasks from './pages/Alltasks';
import Importanttasks from './pages/Importanttasks';
import Incompletedtasks from './pages/Incompletedtasks';
import CompletedTasks from './pages/CompletedTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }

     else if(isLoggedIn === false){
      navigate("/signup");
    }
    },[]);

  return(
      <div className='bg-gray-900 text-white h-screen p-2 relative'>
        <Routes>
          <Route exact path="/" element={<Home/>}>
          <Route index element={<Alltasks/>}/>
          <Route path="/importantTasks" element={<Importanttasks/>}/>
          <Route path="/completedTasks" element={<CompletedTasks/>}/>
          <Route path="/incompletedTasks" element={<Incompletedtasks/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />



        </Routes>
        
      </div>
  )
  
}

export default App;
