import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import axios from "axios";


const Cards = ({home,InputDiv,setInputDiv,data,setUpdatedData}) => {
  const headers = {id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
};
  const handleCompleteTask = async (id) => {
    try{
      const response = await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`,
      {},
      {headers}
      );
      alert(response.data.message);
    }catch(error){
      console.log(error);
    }
  }

  const  handleImportant = async (id) => {
    try{
      const response = await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`,
      {},
      {headers}
      );
      alert(response.data.message);
    }catch(error){
      console.log(error);
    }
  };

  const deleteTask = async(id) => {
    try{
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`,
        {headers}
      );
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = (id,title,desc) => {
    setInputDiv("fixed");
    setUpdatedData({id:id,title:title,desc:desc})
  }



  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {data && data.map((items,i)=>(
      <div  className='flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
      <div>
       <h3 className='text-xl font-semibold'>{items.title}</h3>
       <p className='text-gray-300 my-2'>{items.desc}</p>
       
      </div>
      
      <div className='mt-4 w-fill flex items-center'>
          <button className={`${items.complete === false ? "bg-red-400" : "bg-green-700"}  rounded p-2 w-3/6`} onClick={() => handleCompleteTask(items._id)}
          >
            {items.complete === true ? "Completed":"In Completed"}
            </button>
          <div className='text-white p-2 w-3/6 text-2xl flex justify-around'>
          <button onClick={() => handleImportant(items._id)}>
            {items.important === false ?  <CiHeart />:<FaHeart className='text-red-500'/>}
           
</button>
          {home !== "false" && (
            <button onClick={() => handleUpdate(items._id,items.title,items.desc)}><FaEdit /></button>
          )}
          <button onClick={() => deleteTask(items._id)}><MdDelete /></button>
          </div>
        </div>
      </div>
      ))}

       {home === "true" && (
          <button className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4  text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300' onClick={()=>setInputDiv("fixed")}>
          <IoMdAddCircle className='text-5xl' />
            <h2 className='text-2xl'>Add Tasks</h2>
         </button>
       )}
      
       
      
    
    </div>
  )
}

export default Cards
