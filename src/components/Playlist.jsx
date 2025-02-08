import React, { useEffect, useState, useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'
import SongList from './SongList'
import Player from './Player'

const Playlist = () => {
    const { songs, currentSong, setCurrentSong, playlist,  setPlaylist } = useContext(PlayerContext)
    useEffect(() => {
        const playlist = JSON.parse(localStorage.getItem('playlist')) || []
        console.log(playlist)
        setPlaylist(playlist)

    }, [])
  return (
    <div className='m-3'>
      <h1 className='text-2xl fond-semi-bold mt-5' >My Playlist</h1>
      <ul>
        {currentSong && <Player song={currentSong} />}
        <SongList songs={playlist} onSongSelect={setCurrentSong} />
      </ul>
    </div>
  )
}

export default Playlist