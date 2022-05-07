// import { useState } from 'react'
// import logo from './logo.svg'
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login/Login'
import { Signup } from "./Components/Signup/Signup"

function App() {

  return (
    <div className="App">
        <Routes>
          {/* <Route path='/'></Route> */}
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>   
        {/* <Signup/>  */}
      </div>
  )
}

export default App
