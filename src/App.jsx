import { useState } from 'react'
import Register from './screens/Register'
import Login from './screens/Login'
import './App.css'

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Register />
      <Login />
    </>
  )
}

export default App
