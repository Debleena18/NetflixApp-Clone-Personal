import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../axios/axios';
import YouTube from 'react-youtube';
//import movieTrailer from 'movie-trailer'

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title , fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData(){
     const request = await axios.get(fetchUrl);
     setMovies(request.data.results);
     return request;
    } fetchData();
    
  }, [fetchUrl]);
 
   const opts = {
     height: "390",
     width: "100%",
     playerVars: {
       autoplay:1,
     },
   }
     
   const handleClick = async (movie, isLargeRow) => {
     if(trailerUrl){
       setTrailerUrl("");
     }else if (!isLargeRow) {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fc5c1a7d52257e4d463943612cbb1366`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
       };

    return (
        <div className="row" >
            <h2>{title}</h2>

            <div className="row__posters" >

              {movies.map((movie) => movie.backdrop_path !== null &&(
                <img 
                key={movie.id}
                onClick={()=> handleClick(movie, isLargeRow)}
                className={`row__poster  ${isLargeRow && "row__posterLarge"} `}
                src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name} 
                
                />
              ))}

            </div>
            {trailerUrl && <YouTube
             videoId={trailerUrl}  
             opts={opts}
            />}
        </div>
    )
}

export default Row;