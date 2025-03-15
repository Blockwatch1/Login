import { use, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from 'axios';


function App() {
  
 const [currentUser,setCurrentUser]=useState([]);
  const getData = async()=>{
    const res = await Axios.get("http://localhost:3050/getUser");
    setCurrentUser(res.data);
  }
  useEffect(
    ()=>{
      getData();
    },
  [])
  console.log(currentUser[0]);
  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center justify-center gap-4'>
        <div>
          <h1 className='text-4xl'>Cry Bout It</h1>
        </div>
        <div className='w-60 flex flex-row'><div className='w-20 hover:w-60 bg-amber-300 transition-all h-2 ease-in-out duration-500'></div></div>
        <Form></Form>
      </div>
    </>
  )
}
function Form(props){
  const [wawa,setWawa]= useState();
  function handleSubmitSignUp() {
    const emailRegex = /^[a-zA-Z0-9_.]+@[a-zA-Z]+\.com$/;
    const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/g;
    const emailTest =emailRegex.test(emailSignRef.current.value);
    const passwordTest = passwordRegex.test(passwordSignRef.current.value);
    const verify = async ()=> {
      const res = await Axios.get("http://localhost:3050/verifyEmail");
      setWawa(res.data);
    }
    verify();
    console.log(wawa);
}
const emailSignRef = useRef();
const passwordSignRef= useRef();

  let formClassName =`bg-gray-700 rounded-2xl p-4 flex flex-col gap-6 items-center h-[26rem] w-[36rem] justify-evenly`;
return(
 <form onSubmit={(e)=>{e.preventDefault(); handleSubmitSignUp()}} className={formClassName}>
          <h1 className='text-3xl font-bold text-neutral-200'>Login With Email</h1>
          <Input type={"text"} ref={emailSignRef}placeholder={"Email"}></Input>
          <Input type={"Password"}ref={passwordSignRef} placeholder={"Password"}></Input>
          <button type='submit' className='w-28 h-10 flex items-center justify-center p-2 bg-amber-400 text-black hover:bg-amber-200 rounded-3xl transition-all' >Submit</button>
        </form>
)
}
function Input(props){
 return(
  <input type={props.type} ref={props.ref} className='rounded-2xl focus:outline-0 bg-white placeholder:text-gray-400 h-9 w-72 p-1' placeholder={props.placeholder}></input>
 )
 
}

export default App
