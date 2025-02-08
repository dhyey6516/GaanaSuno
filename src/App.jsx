import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Playlist from './components/Playlist'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/playlist' element={<Playlist />} />
    </Routes>
  )
}

export default App