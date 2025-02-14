import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards';
import axios from "axios";

const Incompletedtasks = () => {
  
  const [Data, setData] = useState()
  
  const headers = {id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
};
  
useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v2/get-incomplete-tasks", { headers });
    
      setData(response.data.data);  
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  fetch();
});
  return (
    <div>
      <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default Incompletedtasks
