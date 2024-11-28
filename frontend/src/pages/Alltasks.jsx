import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoMdAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from "axios";

const Alltasks = () => {
  
  
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id:"",
    title:"",
    desc:"",
  });

  const headers = {id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
};
  
useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
    
      setData(response.data.data);  
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  fetch();
});


  return (
    <>
    <div>
      <div className='w-full flex justify-end items-end px-4 py-2 '>

       <button onClick={()=>setInputDiv("fixed")}>
       <IoMdAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-200'/>
       </button>
      </div>
     {Data &&  <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData}/>}
    </div>
    <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData}
    setUpdatedData={setUpdatedData}/>
    </>
    
  )
}

export default Alltasks
