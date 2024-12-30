import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataDisplay from './components/DataDisplay'
import Navbar from './components/Navbar'
function App() {

  return (
    <>
      <div className="App">
        <Navbar/>
      <DataDisplay />
      </div>
    </>
  )
}

export default App
