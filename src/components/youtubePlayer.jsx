"use client";
import { useState } from "react";
import YouTube from "react-youtube";

export default function YouTubePlayer({ videoId, taskId }) {
  const [videoCompleted, setVideoCompleted] = useState(false);

  const onPlayerStateChange = (event) => {
    const playerState = event.data;

    if (playerState === 0) {
      // Video ended
      setVideoCompleted(true);
    }

    if (playerState === 1) {
      // Prevent skipping
      const player = event.target;
      //player.seekTo(0, true); // Forces the video to restart if skipped
    }
  };

  const videoOptions = {
    playerVars: {
      autoplay: 0, // Auto-play the video
      controls: 1, // Disable controls
      disablekb: 1, // Disable keyboard shortcuts
      rel: 0, //Dispables Suggested videos after playback
    },
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", marginLeft: "50px" }}>
      <h6>{taskId}</h6>
      <YouTube
        videoId={videoId} //  video ID
        opts={videoOptions}
        onStateChange={onPlayerStateChange}
      />
      <div>{videoCompleted}</div>
      {videoCompleted && (
        <div style={{ marginTop: "20px", color: "green" }}>
          🎉 Video Completed! Thank you for watching. 🎉
        </div>
      )}
    </div>
  );
}
