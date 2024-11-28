import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {authActions} from "../../store/auth";
import axios from "axios";



const Sidebar = () => {

 

  const dispatch = useDispatch();
  const history = useNavigate();

  

  const data = [
    {
      title:"All Tasks",
      icons:<CgNotes />,
      link:"/"
    },
    {
      title:"Important Tasks",
      icons:<MdLabelImportant />,
      link:"/importantTasks"
    },
    {
      title:"Completed Tasks",
      icons:<FaCheckDouble />,
      link:"/completedTasks"
    },
    {
      title:"Incompleted Tasks",
      icons:<TbNotebookOff />,
      link:"/incompleteTasks"
    },
  ];

  // const logout = () => {
  //   dispatch(authActions.logout());
  //   localStorage.clear("id");
  //   localStorage.clear("token");
  //   dispatch(authActions.logout());
  //   history("/signup");
  // };

  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch(authActions.logout());
    history("/signup");
  };
  

    const headers = {id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks",
      {headers}
      )
      setData(response.data.data);
    }
    fetch();
  }, [])
  
  
  return (
    <>
   {Data && (
     <div>
     <h2 className='text-xl font-semibold'>{Data.username}</h2>
     <h4 className='my-1 text-gray-400 mb-1'>{Data.email}</h4>
     <hr />
   </div>
   )}
      <div>
      {data.map((item) => (
  <Link to={item.link} key={item.link} className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300">
    {item.icons}
    {item.title}
  </Link>
))}

      </div>
      <div><button className='bg-gray-600 w-full p-2 rounded' onClick={logout}>Log Out</button></div></>
      
    
  )
}

export default Sidebar
