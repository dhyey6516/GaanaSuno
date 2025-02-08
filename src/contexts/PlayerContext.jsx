import { createContext, useState, useRef } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [songs, setSongs] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null)
    const [playlist, setPlaylist] = useState([])
    const [isPlaylist, setIsPlaylist] = useState(false)


    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong, songs, setSongs, isPlaying, setIsPlaying, audioRef, playlist, setPlaylist, isPlaylist, setIsPlaylist }}>
            {children}
        </PlayerContext.Provider>
    );
};