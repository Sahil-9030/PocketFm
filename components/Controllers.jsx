import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume1,
  VolumeX,
  Rewind,
  FastForward,
  Minimize,
  Maximize,
  SquareX,
} from 'lucide-react';
import { Slider } from '@mui/material';

import { formatTime } from '@/utils/formate';

const Controllers = ({
  playing,
  setFileState,
  fileState,
  handlePlayPause,
  handleFastForward,
  handleRewind,
  played,
  seekhandler,
  volume,
  handleVolumeChange,
  muted,
  toggleScreen,
  screenToggle,
  setPlaybackRate,
  handleNextVideo,
  handlePreviousVideo,
  currentTime,
  duration,
  togglePiPMode,
  isPiPMode,
  seekMouseUpHandler,
  onSeekMouseDownHandler,
}) => {
  const toggleDropdown = () => {
    setFileState({ ...fileState, dropdownOpen: !fileState.dropdownOpen });
  };

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  return (
    <div className='w-full h-full '>
      {!isPiPMode ? (
        <div className='w-full h-full flex flex-col  gap-20'>
          {/* play pause rewind fast-forward container  */}

          <div className='flex  justify-around px-20'>
            <button
              className='h-14 w-14 rounded-full bg-white flex items-center justify-center'
              onClick={handleRewind}
              aria-label='Rewind'
            >
              <Rewind />
            </button>

            <button
              className='h-14 w-14 rounded-full bg-white flex items-center justify-center'
              onClick={handlePlayPause}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause /> : <Play />}
            </button>

            <button
              className='h-14 w-14 rounded-full bg-white flex items-center justify-center'
              onClick={handleFastForward}
              aria-label='Fast Forward'
            >
              <FastForward />
            </button>
          </div>

          {/* bottom section  */}
          <div className='flex flex-col'>
            <div className='px-3'>
              <Slider
                onChange={seekhandler}
                onChangeCommitted={seekMouseUpHandler}
                onMouseDown={onSeekMouseDownHandler}
                min={0}
                max={100}
                value={played * 100}
                aria-label='Seek Bar'
              />
            </div>

            <div className='flex justify-between items-center gap-2 text-white h-[42px] w-full'>
              <div className='gap-5 flex items-center '>
                <div className='flex gap-3'>
                  <button onClick={handlePreviousVideo}>
                    <SkipBack />
                  </button>

                  <button onClick={handlePlayPause}>
                    {playing ? <Pause /> : <Play />}
                  </button>

                  <button onClick={handleNextVideo}>
                    <SkipForward />
                  </button>

                  <div>
                    {formatCurrentTime} / {formatDuration}
                  </div>
                </div>
                <div className='flex gap-3'>
                  <button onClick={togglePiPMode}>
                    {isPiPMode ? 'Exit PiP' : 'PiP'}
                  </button>
                  <button>{muted ? <VolumeX /> : <Volume1 />}</button>

                  <div className='w-20 items-center flex'>
                    <Slider
                      min={0}
                      max={100}
                      value={volume * 100}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='flex items-center justify-center gap-3'>
                  <span>Playback Speed</span>

                  <Dropdown
                    group
                    isOpen={fileState.dropdownOpen}
                    direction='up'
                    size='sm'
                    inNavbar
                    toggle={toggleDropdown}
                    aria-label='Playback Speed Dropdown'
                  >
                    <DropdownToggle caret>
                      {`${fileState.playbackRate}x`}
                    </DropdownToggle>
                    <DropdownMenu className='flex flex-col '>
                      <div>
                        <button onClick={setPlaybackRate} value={0.5}>
                          0.5
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={0.75}>
                          0.75
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={1}>
                          1
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={1.25}>
                          1.25
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={1.5}>
                          1.5
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={2}>
                          2
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={2.25}>
                          2.25
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={2.5}>
                          2.5
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={2.75}>
                          2.75
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={3}>
                          3
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={3.25}>
                          3.25
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={3.5}>
                          3.5
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={3.75}>
                          3.75
                        </button>
                      </div>
                      <div>
                        <button onClick={setPlaybackRate} value={4}>
                          4
                        </button>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div
                  onClick={toggleScreen}
                  aria-label='Toggle Fullscreen'
                  className='flex items-center'
                >
                  {screenToggle ? <Minimize /> : <Maximize />}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-[300px] h-[170px] flex bottom-0 right-0 flex-row-reverse justify-between p-2 fixed z-20 text-white '>
          <div>
            <SquareX onClick={togglePiPMode} />
          </div>

          <div>
            <Maximize onClick={toggleScreen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Controllers;
