import React, { useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import SearchBar from './components/SearchBar'
import SongList from './components/SongList'
import Player from './components/Player'
import { Mic } from "lucide-react"

import './App.css'

function App() {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null)

  const handleSearch = async (query) => {
    const response = await fetch(`https://saavnapi-nine.vercel.app/result/?query=${encodeURIComponent(query)}`)
    const data = await response.json()
    setSongs(data)
  }
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  const handleStopRecording = () => {
    stopSpeechToText();
    if (results.length > 0) {
      handleSearch(results[results.length - 1].transcript);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Music Player</h1>

        <button onClick={isRecording ? handleStopRecording : startSpeechToText} className={`mt-2 px-4 py-2 text-white rounded mb-4 ${isRecording ? '' : 'bg-blue-500'}`}>
          {isRecording ? <img src="https://i.pinimg.com/originals/ec/61/2c/ec612c4085582da4f5b8a7c2cc575bf9.gif" height={50} width={50} alt="" /> : <Mic size={24} />}
        </button>
        {isRecording && <ul className='mb-4'>
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li className='text-2xl'>{interimResult}</li>}
        </ul>}

        <SearchBar onSearch={handleSearch} />
        {currentSong && <Player song={currentSong} />}
        <SongList songs={songs} onSongSelect={setCurrentSong} />
      </div>
    </>
  )
}

export default App
