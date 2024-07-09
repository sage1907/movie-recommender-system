// import React, { useRef, useState } from 'react';
// import ReactPlayer from 'react-player';
// import '../../css/VideoPlayer.css';

// const VideoPlayer = ({ url }) => {
//   const playerRef = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.8);
//   const [played, setPlayed] = useState(0);
//   const [seeking, setSeeking] = useState(false);

//   const handlePlayPause = () => {
//     setPlaying(!playing);
//   };

//   const handleVolumeChange = (e) => {
//     setVolume(parseFloat(e.target.value));
//   };

//   const handleSeekChange = (e) => {
//     setPlayed(parseFloat(e.target.value));
//   };

//   const handleSeekMouseDown = () => {
//     setSeeking(true);
//   };

//   const handleSeekMouseUp = (e) => {
//     setSeeking(false);
//     playerRef.current.seekTo(parseFloat(e.target.value));
//   };

//   const handleProgress = (state) => {
//     if (!seeking) {
//       setPlayed(state.played);
//     }
//   };

//   const handleFastForward = () => {
//     playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
//   };

//   const handleRewind = () => {
//     playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
//   };

//   return (
//     <div className="video-player">
//       <ReactPlayer
//         ref={playerRef}
//         url={url}
//         playing={playing}
//         volume={volume}
//         onProgress={handleProgress}
//         controls={true}  // Disable default controls to use custom controls
//       />
//       <div className="controls">
//         <button className="play-pause-button" onClick={handlePlayPause}>
//           {playing ? 'Pause' : 'Play'}
//         </button>
//         <button className="rewind-button" onClick={handleRewind}>Rewind 10s</button>
//         <button className="fast-forward-button" onClick={handleFastForward}>Fast Forward 10s</button>
//         <input
//           type="range"
//           min={0}
//           max={1}
//           step="any"
//           value={played}
//           onMouseDown={handleSeekMouseDown}
//           onChange={handleSeekChange}
//           onMouseUp={handleSeekMouseUp}
//         />
//         <input
//           type="range"
//           min={0}
//           max={1}
//           step="any"
//           value={volume}
//           onChange={handleVolumeChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;


import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import '../../css/VideoPlayer.css';

const VideoPlayer = ({ url }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false); // State to track playing status
  
    const handlePlayPause = () => {
      setPlaying(!playing);
    };
  
    const handleSkip = (time) => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime + time);
      }
    };
  
    return (
      <div className="video-player-container">
        <ReactPlayer
          ref={playerRef}
          url={url}
          className="video-player"
          controls
          playing={playing} // ReactPlayer's playing prop tied to state
          width="100%"
          height="auto"
        />
        <div className="video-controls">
          <button className="video-control-button" onClick={() => handleSkip(-10)}>
            <i className="fas fa-backward"></i>
          </button>
          <button className="video-control-button" onClick={handlePlayPause}>
            {playing ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
          </button>
          <button className="video-control-button" onClick={() => handleSkip(10)}>
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </div>
    );
  };
  
  export default VideoPlayer;
