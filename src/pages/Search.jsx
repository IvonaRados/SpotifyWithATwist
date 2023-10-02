import { useSelector } from "react-redux";
import { Error, Loader, SongCard, PopUp } from "../components";
import { useParams } from "react-router-dom";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useState, useEffect } from "react";

const Search = () => {
  const { searchTerm } = useParams();
  const {activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const [isActive, setIsActive] = useState(false);
  const [settingsong, setSong] = useState(false);

  const songs = data?.tracks?.hits?.map((song) => song.track);
  if(isFetching) return <Loader title= "Loading... " />;

  if(error) return <Error />;


  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">
          {searchTerm}
        </span>

      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <div key={song.key}>
          <SongCard 
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
            isActive={isActive}
            setIsActive={setIsActive}
            setSong={setSong}
          />
          {isActive && (
            <PopUp linkValue={settingsong} 
            setIsActive={setIsActive}
            />
          )}
          </div>
        ))}

      </div>

    </div>
  )

};

export default Search;
