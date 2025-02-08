import React, { useRef, useState, useEffect, useContext } from "react"
import { Play, Pause } from "lucide-react"
import { PlayerContext } from "../contexts/PlayerContext"


const Player = ({ song }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const { currentSong, isPlaying, setIsPlaying, audioRef } = useContext(PlayerContext)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [currentSong]) // dependency adjusted

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="mt-4 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">{song.song}</h2>
      <p className="text-sm text-white mb-2">{song.singers}</p>
      <audio
        ref={audioRef}
        src={song.media_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="flex items-center mb-2">
        <button onClick={togglePlayPause} className="px-4 py-2 bg-blue-500 text-white rounded-full mr-2">
          {isPlaying ? <Pause/> : <Play />}
        </button>
        <span className="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <input type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} className="w-full" />
    </div>
  )
}

export default Player
