import { use, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Axios from "axios";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const getUser = async () => {
    const res = await Axios.get("http://localhost:3050/getUser");
    setCurrentUser(res.data);
  };
  console.log(currentUser);
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl">Login SignUp Example</h1>
        </div>
        <div className="w-42 md:w-60 flex flex-row">
          <div className="w-14 hover:w-42 md:hover:w-60 bg-amber-300 transition-all h-2 ease-in-out duration-500"></div>
        </div>
        <Form></Form>
      </div>
    </>
  );
}
function Form(props) {
  const [login,setLogin]= useState(false);
  const [logSignText, setLogSignText]= useState("");
  const [emailValid, SetEmailValid] = useState(null);
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [passwordValid, SetPasswordValid] = useState(null);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  function toggleLoginSignup(){
    setLogin(!login);
  }
  async function handleSubmitLogin() {
    const emailRegex = /^[a-zA-Z0-9_.]+@[a-zA-Z]+\.com$/;
    const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/g;
    const emailTest = emailRegex.test(emailSignRef.current.value);
    const passwordTest = passwordRegex.test(passwordSignRef.current.value);
    if (!emailTest) {
      SetEmailValid(false);
      setEmailValidationMessage("Please Enter a Valid Email");
      return;
    } else {
      SetEmailValid(true);
      setEmailValidationMessage("");
    }
    if (passwordSignRef.current.value.length < 8) {
      SetPasswordValid(false);
      setPasswordValidationMessage(
        "Password must be at least 8 characters long"
      );
      return;
    }else {
      SetPasswordValid(true);
      setPasswordValidationMessage("");
    }
  
    try {
      const response = await Axios.post(
        "http://localhost:3050/handleLogin",
        {
          email: emailSignRef.current.value,
          password: passwordSignRef.current.value,
        }
      );
      if(response.data.status==="accepted"){
        setLogSignText("Logged in Sucessfully");
    
      }else{
        setLogSignText("Log in Failed : "+response.data.reason);
      }
    } catch (e) {
      console.log(e);
    }
    
  }
  async function handleSubmitSignUp() {
    const emailRegex = /^[a-zA-Z0-9_.]+@[a-zA-Z]+\.com$/;
    const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/g;
    const emailTest = emailRegex.test(emailSignRef.current.value);
    const passwordTest = passwordRegex.test(passwordSignRef.current.value);
    if (!emailTest) {
      SetEmailValid(false);
      setEmailValidationMessage("Please Enter a Valid Email");
      return;
    } else {
      SetEmailValid(true);
      setEmailValidationMessage("");
    }
    if (!passwordTest) {
      SetPasswordValid(false);
      setPasswordValidationMessage(
        "Password must contain an uppercase Character, a lowercase character and a number"
      );
      return;
    } else if (passwordSignRef.current.value.length < 8) {
      SetPasswordValid(false);
      setPasswordValidationMessage(
        "Password must be at least 8 characters long"
      );
      return;
    } else if (passwordSignRef.current.value !== confirmPasswordRef.current.value) {
      SetPasswordValid(false);
      setPasswordValidationMessage("Passwords must match");
      return;
    } else {
      SetPasswordValid(true);
      setPasswordValidationMessage("");
    }
  
    try {
      const response = await Axios.post(
        "http://localhost:3050/handleSignup",
        {
          email: emailSignRef.current.value,
          password: passwordSignRef.current.value,
        }
      );
      if(response.data.status==="accepted"){
        setLogSignText("Signed up Sucessfully");
      }else{
        setLogSignText("Sign Up Failed : "+response.data.reason);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const emailSignRef = useRef();
  const passwordSignRef = useRef();
  const confirmPasswordRef = useRef();

  let formClassName = `bg-gray-700 rounded-2xl p-4 flex flex-col gap-2 lg:gap-6  items-center w-[19rem] md:w-[30rem] justify-evenly`;
  if(logSignText!==""){
      return(
          <>
          <div  className={formClassName}>
          <h1 className="text-xl md:text-3xl font-bold text-neutral-200">{logSignText}</h1>
          </div>
          </>
      );
  }
  else if(login){
    return (
      <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitLogin();
        }}
        className={formClassName}
      >
        <h1 className="text-xl md:text-3xl font-bold text-neutral-200">Login With Email</h1>
        <Input
          type={"text"}
          ref={emailSignRef}
          valid={emailValid}
          validationMessage={emailValidationMessage}
          placeholder={"Email"}
        ></Input>
        <Input
          type={"Password"}
          ref={passwordSignRef}
          valid={passwordValid}
          validationMessage={passwordValidationMessage}
          placeholder={"Password"}
        ></Input>
        <button
          type="submit"
          className="w-16 h-5 md:w-20 md:h-8 flex items-center justify-center p-2 bg-amber-400 text-black hover:bg-amber-200 rounded-3xl transition-all text-sm md:text-base"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-row justify-end w-[19rem] md:w-[30rem] h-3"><span className="text-blue-400 hover:text-blue-200" onClick={toggleLoginSignup}>Sign Up?</span></div>
      </>
    );
  }else{
    return (
      <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitSignUp();
        }}
        className={formClassName}
      >
        <h1 className="text-xl md:text-3xl font-bold text-neutral-200">Sign Up With Email</h1>
        <Input
          type={"text"}
          ref={emailSignRef}
          valid={emailValid}
          validationMessage={emailValidationMessage}
          placeholder={"Email"}
        ></Input>
        <Input
          type={"Password"}
          ref={passwordSignRef}
          valid={passwordValid}
          validationMessage={passwordValidationMessage}
          placeholder={"Password"}
        ></Input>
        <Input
          type={"Password"}
          ref={confirmPasswordRef}
          valid={passwordValid}
          validationMessage={""}
          placeholder={"Confirm Password"}
        ></Input>
        <button
          type="submit"
          className="w-16 h-5 md:w-20 md:h-8 flex items-center justify-center p-2 bg-amber-400 text-black hover:bg-amber-200 rounded-3xl transition-all text-sm md:text-base"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-row justify-end w-[19rem] md:w-[30rem] h-3"><span className="text-blue-400 hover:text-blue-200" onClick={toggleLoginSignup}>Log In?</span></div>
      </>
    );
  }
}
function Input(props) {
  let validBorder =
    props.valid === true
      ? "border-2 border-green-500"
      : props.valid === null
      ? "border-2 border-black"
      : "border-2 border-red-500";
  let className = `rounded-2xl focus:outline-0 bg-white placeholder:text-gray-400 h-7 lg:h-9 w-60 md:w-72 p-1 ${validBorder}`;
  if (props.valid || props.valid === null) {
    return (
      <>
        <div className="flex flex-col justify-center w-60 md:w-72">
          <input
            type={props.type}
            ref={props.ref}
            className={className}
            placeholder={props.placeholder}
          ></input>
          <div className="flex w-72"></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col justify-center w-60 md:w-72">
          <input
            type={props.type}
            ref={props.ref}
            className={className}
            placeholder={props.placeholder}
          ></input>
          <div className="flex flex-row justify-end w-60 md:w-72">
            <span className="text-red-600 text-xs">
              {props.validationMessage}
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default App;
