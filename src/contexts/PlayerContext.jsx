import { createContext, useState, useRef } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [songs, setSongs] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null)
    const audioRef = useRef(null)
    const [playlist, setPlaylist] = useState([])
    const [isPlaylist, setIsPlaylist] = useState(false)


    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong, songs, setSongs, isPlaying, setIsPlaying, playerRef, playlist, setPlaylist, isPlaylist, setIsPlaylist, audioRef }}>
            {children}
        </PlayerContext.Provider>
    );
};