import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import SongList from './components/SongList'
import Player from './components/Player'

import './App.css'

function App() {
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null)

  const handleSearch = async (query) => {
    const response = await fetch(`https://saavnapi-nine.vercel.app/result/?query=${encodeURIComponent(query)}`)
    const data = await response.json()
    setSongs(data)
  }
  return (
    <>
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Music Player</h1>
      <SearchBar onSearch={handleSearch} />
      {currentSong && <Player song={currentSong} />}
      <SongList songs={songs} onSongSelect={setCurrentSong} />
    </div>
    </>
  )
}

export default App
