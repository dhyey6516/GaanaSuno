import React from "react";
import { useContext } from "react";
import { Pause, Play, PlusCircle, Download, CheckCheck } from "lucide-react";
import { PlayerContext } from "../contexts/PlayerContext";
import { useNavigate } from "react-router-dom";

const SongList = ({ songs, onSongSelect }) => {
  const navigate = useNavigate();

  const { isPlaying, setIsPlaying, currentSong, audioRef, playlist, setPlaylist, isPlaylist, setIsPlaylist } = useContext(PlayerContext);

  const handleTogglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAddToPlaylist = (song) => {
    if (playlist.some((item) => item.id === song.id)) {
      setPlaylist(playlist.filter((item) => item.id !== song.id));
      localStorage.setItem('playlist', JSON.stringify(playlist.filter((item) => item.id !== song.id)));
    } else {
      const updatedPlaylist = [...playlist, song];
      setPlaylist(updatedPlaylist);
      localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Search Results</h2>
      {isPlaylist && <h2 className="bg-blue-500 w-44" onClick={() => {navigate('/'); setIsPlaylist(false)}} >Back to Search Songs</h2>}
      <div>
        <ul className="space-y-2 flex flex-wrap gap-3 justify-center">
          {songs && songs.map((song) => (
            <li
              key={song.id}
              className="p-2 border rounded cursor-pointer hover:bg-gray-900 h-65 w-40 bg-gray-900"
            >
              <img src={song.image} height={120} width={120} alt="" className="m-auto mb-5" />
              <h3 className="font-medium">{song.song}</h3>
              <p className="text-sm text-white">{song.singers}</p>

              <div className="flex items-center justify-around gap-2 mt-2">
                <a className="mt-2" href={song.media_url} target="_blank">
                  <button onClick={() => handleDownload(song.media_url)} className="text-white rounded-lg hover:cursor">
                    <Download className="hover:pointer" />
                  </button>
                </a>
                <div className="bg-green-600 pt-2 px-3 rounded-full">
                  <button onClick={() => { onSongSelect(song); handleTogglePlayPause(); }} className="text-white rounded-full">
                    {currentSong && song.id === currentSong.id && isPlaying ? <Pause /> : <Play />}
                  </button>
                </div>
                <button onClick={() => handleAddToPlaylist(song)}>
                  {playlist && playlist.some((item) => item.id === song.id) ? <CheckCheck /> : <PlusCircle />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongList;