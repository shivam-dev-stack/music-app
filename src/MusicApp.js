import React, { useState, useRef, useEffect } from "react";
import "./musicapp.css";

const songs = [
  {
    id: 1,
    title: "Song1",
    artist: "elektro",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Song2",
    artist: "elektro",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Song3",
    artist: "elektro",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Song4,
    artist: "elektro",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Song5",
    artist: "elektro",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

const MusicApp = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback error:", error);
        });
      }
    }
  }, [currentSongIndex, isPlaying]);

  const playSong = () => {
    audioRef.current.play().catch((error) => {
      console.error("Audio playback error:", error);
    });
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const skipToNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const skipToPrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="music-player-container">
      <h1 className="music-player-title">Music Player</h1>
      <div className="song-details">
        <h2>{songs[currentSongIndex].title}</h2>
        <p>{songs[currentSongIndex].artist}</p>
      </div>
      <audio ref={audioRef} src={songs[currentSongIndex].url} onEnded={skipToNext}></audio>
      <div className="controls">
        <button onClick={skipToPrevious} className="control-button">
          Previous
        </button>
        {isPlaying ? (
          <button onClick={pauseSong} className="control-button">
            Pause
          </button>
        ) : (
          <button onClick={playSong} className="control-button">
            Play
          </button>
        )}
        <button onClick={skipToNext} className="control-button">
          Next
        </button>
      </div>
    </div>
  );
};
export default MusicApp;
