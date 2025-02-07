import React from "react"

const SongList = ({ songs, onSongSelect }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Search Results</h2>
      <div>
      <ul className="space-y-2 flex flex-wrap gap-3 justify-center">
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-2 border rounded cursor-pointer hover:bg-gray-900 max-h-70 w-40"
            onClick={() => {onSongSelect(song); console.log(song)}}
          >
            <img src={song.image} height={120} width={120} alt=""  className="m-auto mb-5" />
            <h3 className="font-medium">{song.song}</h3>
            <p className="text-sm text-white">{song.singers}</p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default SongList
