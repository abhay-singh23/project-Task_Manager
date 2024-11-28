import React, { useState } from 'react';

import { MdTrackChanges } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history("/");

  }
  const [Data, setData] = useState({username:"",email:"",password:""});

  const change = (e) => {
    const {name,value} = e.target;
    setData({...Data,[name]:value});
  };
  const submit = async ()=> {
    try {
      if(Data.username === "" || Data.email === "" || Data.password === ""){
        alert("All fields are required");
      }
      else{
        const response = await axios.post("http://localhost:1000/api/v1/sign-in",Data);
        setData({username:"",email:"",password:""});
        console.log(response);
        history("/login");
      }
      
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className=' h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div className='text-2xl font-semibold'>Signup</div>
        <input type="username" placeholder='username' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' name='username'
value={Data.username}
          onChange={change}
         />


        <input type="email" placeholder='xyz@example.com' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' name='email'
        value={Data.email}
        onChange={change}
        />


        <input type="password" placeholder='password' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' name='password'
        value={Data.password}
        onChange={change}
        />
        <div className='w-full flex items-center justify-between'>
        <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded' onClick={submit}>Singup</button>
        <Link to="/login" className='text-gray-400 hover:text-gray-200'>All ready having an account? Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup

// import React, { useState } from 'react';
// import { MdTrackChanges } from 'react-icons/md';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//   const [data, setData] = useState({ username: '', email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const change = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const submit = async () => {
//     if (data.username === '' || data.email === '' || data.password === '') {
//       alert('All fields are required');
//       return;
//     }

//     setLoading(true);
//     setError(''); // Clear any previous errors

//     try {
//       const response = await axios.post('http://localhost:1000/api/v1/sign-in', data);

//       if (response.status === 200) {
//         // Redirect to login page or another page after successful signup
//         navigate('/login');
//       }
//     } catch (err) {
//       setError('Signup failed. Please try again.');
//       console.error('Error during signup:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-[98vh] flex items-center justify-center">
//       <div className="p-4 w-2/6 rounded bg-gray-800">
//         <div className="text-2xl font-semibold">Signup</div>

//         {error && <div className="text-red-500 mb-2">{error}</div>}

//         <input
//           type="text"
//           placeholder="username"
//           className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
//           name="username"
//           value={data.username}
//           onChange={change}
//         />

//         <input
//           type="email"
//           placeholder="xyz@example.com"
//           className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
//           name="email"
//           value={data.email}
//           onChange={change}
//         />

//         <input
//           type="password"
//           placeholder="password"
//           className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
//           name="password"
//           value={data.password}
//           onChange={change}
//         />

//         <div className="w-full flex items-center justify-between">
//           <button
//             className={`${
//               loading ? 'bg-gray-400' : 'bg-blue-400'
//             } text-xl font-semibold text-black px-3 py-2 rounded`}
//             onClick={submit}
//             disabled={loading}
//           >
//             {loading ? 'Signing up...' : 'Signup'}
//           </button>

//           <Link to="/login" className="text-gray-400 hover:text-gray-200">
//             Already have an account? Login here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

