// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import VideoPlayer from './VideoPlayer';

// const VideoPlayback = () => {
//   const location = useLocation();
//   const { videoUrl, title } = location.state;

//   return (
//     <div>
//       <h1>{title}</h1>
//       <VideoPlayer url={videoUrl} />
//     </div>
//   );
// };

// export default VideoPlayback;

import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import '../../css/VideoPlayback.css';

const VideoPlayback = () => {
  const location = useLocation();
  const { videoUrl, title } = location.state;

  return (
    <div className="video-playback-container">
      <h1 className="video-playback-title">{title}</h1>
      <div className="video-player-wrapper">
        <VideoPlayer url={videoUrl} className="video-player" />
      </div>
    </div>
  );
};

export default VideoPlayback;

