import React, { useState, useContext, useEffect } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import SearchBar from './SearchBar'
import SongList from './SongList'
import Player from './Player'
import { Mic, Music } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerContext'
import "../App.css"

function Home() {

  const [loading, setLoading] = useState(false)
  
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
  const { currentSong, setCurrentSong, setPlaylist, isPlaylist, setIsPlaylist } = useContext(PlayerContext)
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setLoading(true)
    const response = await fetch(`https://saavnapi-nine.vercel.app/result/?query=${encodeURIComponent(query)}`)
    const data = await response.json()
    setSongs(data)
    setLoading(false)
  }
  const handleStopRecording = () => {
    stopSpeechToText();
    if (results.length > 0) {
      handleSearch(results[results.length - 1].transcript);
      results.length = 0;
    }
  };

  useEffect(() => {
    const playlist = JSON.parse(localStorage.getItem('playlist')) || []
    console.log(playlist)
    setPlaylist(playlist)
  }, [])

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Music Player</h1>

        {!error && <button onClick={isRecording ? handleStopRecording : startSpeechToText} className={`mt-2 px-4 py-2 text-white rounded mb-4 ${isRecording ? '' : 'bg-blue-500'}`}>
          {isRecording ? <img src="https://i.pinimg.com/originals/ec/61/2c/ec612c4085582da4f5b8a7c2cc575bf9.gif" height={50} width={50} alt="" /> : <Mic size={24} />}
        </button>}
        {!error && isRecording && <ul className='mb-4'>
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li className='text-2xl'>{interimResult}</li>}
        </ul>}

        <SearchBar onSearch={handleSearch} />
        <div onClick={() => {navigate("/playlist"); setIsPlaylist(true)}} className='flex justify-center items-center bg-white text-black w-40'>
          <h2 className='pt-1 pb-1 pl-4 pr-4 rounded-sm mb-2' >My Playlist</h2>
          <Music/>
        </div>
        {currentSong && <Player song={currentSong} />}
        {loading && <img src='https://loading.io/assets/mod/spinner/music/lg.gif' />}
        <SongList songs={songs} onSongSelect={setCurrentSong} />
      </div>
    </>
  )
}

export default Home
