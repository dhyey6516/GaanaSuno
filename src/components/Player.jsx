import React, { useContext, useEffect, useRef } from "react"
import AudioPlayer from "react-h5-audio-player"
import 'react-h5-audio-player/lib/styles.css'
import { PlayerContext } from "../contexts/PlayerContext"
import './Player.css'

const Player = ({ song }) => {
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying, songs, playlist, isPlaylist } = useContext(PlayerContext)
  const playerRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Save current time when source changes
  useEffect(() => {
    if (playerRef.current) {
      lastTimeRef.current = playerRef.current.audio.current.currentTime;
    }
  }, [song.media_url]);

  // Restore time when audio is loaded
  const handleLoadedData = () => {
    if (playerRef.current && lastTimeRef.current > 0) {
      playerRef.current.audio.current.currentTime = lastTimeRef.current;
    }
  };

  const handleClickNext = () => {
    if(isPlaylist){
      const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
      if (currentIndex < playlist.length - 1) {
        setCurrentSong(playlist[currentIndex + 1])
      }
    }
    else{
      const currentIndex = songs.findIndex(s => s.id === currentSong.id)
      if (currentIndex < songs.length - 1) {
        setCurrentSong(songs[currentIndex + 1])
      }
    }
  }

  const handleClickPrevious = () => {
    if(isPlaylist){
      const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
      if (currentIndex > 0) {
        setCurrentSong(playlist[currentIndex - 1])
      }
    }
    else{
      const currentIndex = songs.findIndex(s => s.id === currentSong.id)
      if (currentIndex > 0) {
        setCurrentSong(songs[currentIndex - 1])
      }
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="flex items-center px-4">
        <div className="flex-shrink-0 w-16 h-16 mr-4">
          <img src={song.image} alt={song.song} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <AudioPlayer
            ref={playerRef}
            className="player-wrapper"
            autoPlay
            src={song.media_url}
            onLoadedData={handleLoadedData}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClickNext={handleClickNext}
            onClickPrevious={handleClickPrevious}
            showSkipControls={true}
            showJumpControls={true}
            onEnded={handleClickNext}
            loop={false}
            volume={0.8}
            progressUpdateInterval={100}
            // ...existing customStyles and header props...
          />
        </div>
      </div>
    </div>
  )
}

export default Player