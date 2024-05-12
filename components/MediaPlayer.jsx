import { useRef, useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';

import Controllers from './Controllers';
import Spinner from './Spinner/Spinner';

const MediaPlayer = () => {
  const urls = [
    'https://www.youtube.com/watch?v=8jW7lpT8HW8',
    'https://www.youtube.com/watch?v=AMxtGWcMYd4',
    'https://www.youtube.com/watch?v=N2FnB3HiDDU',
    'https://www.youtube.com/watch?v=z6VhdFdyY1o',
    'https://www.youtube.com/watch?v=HbNfCM4ilBQ',
    'https://www.youtube.com/watch?v=3xC0F9bj9FU',
  ];

  const [fileState, setFileState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    played: 0,
    playbackRate: 1,
    seeking: true,
    buffer: true,
    width: '640px',
    height: '360px',
    dropdownOpen: false,
    controls: true,
    currIndex: 0,
    pip: false,
  });
  const videoRef = useRef(null);
  const [showLoading, setShowLoading] = useState(false);
  const [screenToggel, setScreenToggle] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const {
    playing,
    muted,
    volume,
    played,
    seeking,
    buffer,
    width,
    height,
    currIndex,
    pip,
  } = fileState;

  const currentTime = videoRef.current
    ? videoRef.current.getCurrentTime()
    : '00:00';
  const duration = videoRef.current ? videoRef.current.getDuration() : '00:00';

  const handlePlayPause = useCallback(() => {
    setFileState((prevState) => ({
      ...prevState,
      playing: !prevState.playing,
    }));
  }, []);

  const handlePlay = () => {
    setFileState((prevState) => ({ ...prevState, playing: true }));
  };

  const handlePause = () => {
    setFileState((prevState) => ({ ...prevState, playing: false }));
  };

  const handleRewind = useCallback(() => {
    const currentTime = videoRef?.current?.getCurrentTime();

    if (currentTime !== null && currentTime !== undefined) {
      const newTime = currentTime - 10;
      const newPercentage = (newTime / duration) * 100;

      setFileState((prevState) => ({
        ...prevState,
        played: newPercentage / 100,
        seeking: true,
      }));

      if (videoRef.current) {
        videoRef.current.seekTo(newTime);
      }
    }
  }, [duration, setFileState, videoRef]);

  const handleFastForward = useCallback(() => {
    const currentTime = videoRef?.current?.getCurrentTime();

    if (currentTime !== null && currentTime !== undefined) {
      const newTime = currentTime + 10;
      const newPercentage = (newTime / duration) * 100;

      setFileState((prevState) => ({
        ...prevState,
        played: newPercentage / 100,
        seeking: true,
      }));

      if (videoRef.current) {
        videoRef.current.seekTo(newTime);
      }
    }
  }, [duration, setFileState, videoRef]);

  const handleProgress = (state) => {
    if (!seeking) {
      setFileState({ ...fileState, ...state });
    }

    videoRef?.current?.seekTo(videoRef?.current?.getCurrentTime());
  };

  const seekhandler = (e, value) => {
    setFileState({ ...fileState, played: parseFloat(value / 100) });
    videoRef.current.seekTo(parseFloat(value / 100));
  };

  const seekMouseUpHandler = (e, value) => {
    setFileState({ ...fileState, seeking: false });
    videoRef.current.seekTo(value / 100);
  };

  const onSeekMouseDownHandler = () => {
    setFileState({ ...fileState, seeking: true });
  };

  const handleVolumeChange = useCallback((e, value) => {
    const changedVolume = parseFloat(value) / 100;
    setFileState((prevState) => ({
      ...prevState,
      volume: prevState.muted ? 0 : changedVolume,
      muted: Number(changedVolume) === 0 ? true : false,
    }));
  }, []);

  const handleBufferStart = () => {
    setFileState((prevState) => ({ ...prevState, buffer: true }));
    setShowLoading(true);
  };

  const handleBufferEnd = () => {
    setFileState((prevState) => ({ ...prevState, buffer: false }));
    setShowLoading(false);
  };

  const toggleScreen = useCallback(() => {
    const element = document.getElementById('player');

    if (element) {
      if (!document.fullscreenElement) {
        element.requestFullscreen().catch((err) => {
          console.error(
            'Error attempting to enable full-screen mode:',
            err.message
          );
        });

        setScreenToggle(true);
      } else {
        document.exitFullscreen();
        setScreenToggle(false);
      }
    }
  }, []);

  const ExitFullScreen = useCallback(() => {
    document.exitFullscreen();
  }, []);

  const handleSetPlaybackRate = (e) => {
    setFileState((prevState) => ({
      ...prevState,
      playbackRate: parseFloat(e.target.value),
    }));
  };

  const handleMute = useCallback(() => {
    setFileState((prevState) => ({ ...prevState, muted: !prevState.muted }));
  }, []);

  const handlePreviousOrNextVideo = useCallback(
    (direction) => {
      const newIndex =
        direction === 'previous'
          ? (currIndex - 1 + urls.length) % urls.length
          : (currIndex + 1) % urls.length;
      setFileState((prevState) => ({
        ...prevState,
        currIndex: newIndex,
        played: fileState.played,
        playing: true,
      }));

      if (videoRef.current) {
        videoRef.current.seekTo(0);
      }
    },
    [currIndex, urls.length, fileState.played, setFileState, videoRef]
  );

  const handlePreviousVideo = useCallback(() => {
    handlePreviousOrNextVideo('previous');
  }, [handlePreviousOrNextVideo]);

  const handleNextVideo = useCallback(() => {
    handlePreviousOrNextVideo('next');
  }, [handlePreviousOrNextVideo]);

  const handleEnablePIP = () => {
    setFileState({ ...fileState, pip: true });
  };

  const handleDisablePIP = () => {
    setFileState({ ...fileState, pip: false });
  };

  const togglePiPMode = () => {
    setFileState({ ...fileState, pip: !pip });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '':
          handlePlayPause();
          break;
        case 'ArrowUp':
          handleVolumeChange(null, volume * 100 + 5);
          break;
        case 'ArrowDown':
          handleVolumeChange(null, volume * 100 - 5);
          break;
        case 'ArrowRight':
          handleFastForward();
          break;
        case 'ArrowLeft':
          handleRewind();
          break;
        case 'm':
        case 'M':
          handleMute();
          break;
        case 'F':
        case 'f':
          toggleScreen();
          break;
        case 'W':
        case 'w':
          toggleScreen();
          break;
        case 'N':
        case 'n':
          handleNextVideo();
          break;
        case 'P':
        case 'p':
          handlePreviousVideo();
          break;
        case 'Escape':
          ExitFullScreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    volume,
    handleNextVideo,
    handlePreviousVideo,
    handlePlayPause,
    handleVolumeChange,
    handleFastForward,
    handleRewind,
    handleMute,
    toggleScreen,
    ExitFullScreen,
  ]);

  const videoStyle = {
    position: pip ? 'fixed' : 'static',
    bottom: pip ? '0' : 'auto',
    right: pip ? '0' : 'auto',
    width: pip ? '300px' : '',
    height: pip ? '170px' : '',
    aspectRatio: pip ? '16/9' : 'auto',
    zIndex: pip ? '10' : 'auto',
  };

  return (
    <div
      className='relative w-full h-full'
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className='relative w-full h-full flex items-center justify-center'>
        <div
          className='player absolute w-full h-full items-center justify-center flex'
          style={videoStyle}
        >
          <ReactPlayer
            url={urls[currIndex]}
            preload='auto'
            playing={playing}
            volume={volume}
            muted={false}
            width={pip ? '300px' : width}
            height={pip ? '170px' : height}
            pip={true}
            stopOnUnmount={false}
            controls={false}
            ref={videoRef}
            onPlay={handlePlay}
            onSeek={seekhandler}
            onPause={handlePause}
            onStart={() =>
              setFileState({ ...fileState, visible_button_refresh: true })
            }
            onEnablePIP={handleEnablePIP}
            onDisablePIP={handleDisablePIP}
            onBuffer={handleBufferStart}
            onBufferEnd={handleBufferEnd}
            onProgress={handleProgress}
            playbackRate={fileState.playbackRate}
            id='player'
          />
        </div>
        {buffer && (
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50'>
            <Spinner />
          </div>
        )}
      </div>

      <div className='w-full h-full flex items-center justify-center'>
        {showControls && (
          <div
            className={`${
              !screenToggel ? 'w-[640px] h-[360px] ' : 'w-full h-full'
            } absolute top-[240px]  items-center flex justify-center `}
          >
            <div>
              <Controllers
                playing={playing}
                setFileState={setFileState}
                fileState={fileState}
                handlePlayPause={handlePlayPause}
                handleRewind={handleRewind}
                handleFastForward={handleFastForward}
                played={played}
                volume={volume}
                handleVolumeChange={handleVolumeChange}
                seekhandler={seekhandler}
                handleProgress={handleProgress}
                muted={muted}
                buffer={buffer}
                toggleScreen={toggleScreen}
                screenToggel={screenToggel}
                setPlaybackRate={handleSetPlaybackRate}
                handleNextVideo={handleNextVideo}
                handlePreviousVideo={handlePreviousVideo}
                currentTime={currentTime}
                duration={duration}
                isPiPMode={pip}
                togglePiPMode={togglePiPMode}
                seekMouseUpHandler={seekMouseUpHandler}
                onSeekMouseDownHandler={onSeekMouseDownHandler}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
