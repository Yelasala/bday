import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

export function SpotifyCard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Direct open-source stream link for "Young" by Vacations
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
  const albumArt = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60"

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((err) => console.log("Playback error:", err))
    }
    setIsPlaying(!isPlaying)
  }

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative w-[320px] h-[140px] bg-[#191414] rounded-[12px] p-[14px] font-sans select-none shadow-2xl flex flex-col justify-between border border-neutral-800">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Top Track Header Details Row */}
      <div className="relative w-full flex gap-[12px] items-center">
        <img 
          src={albumArt} 
          alt="Vacations Album Art" 
          className="h-[50px] w-[50px] bg-[#282828] rounded-[6px] object-cover shadow-md"
        />
        <div className="flex flex-col justify-center overflow-hidden flex-1">
          <h4 className="text-white text-[16px] font-bold truncate leading-snug">Young</h4>
          <p className="text-[#b3b3b3] text-[13px] font-medium truncate">Vacations</p>
        </div>

        {/* Animated Equalizer Visualizer Bars */}
        <div className="flex items-end justify-center gap-[2px] w-[24px] h-[16px] mb-1">
          <div className={`bg-[#1db954] w-[2px] rounded-sm origin-bottom ${isPlaying ? 'animate-[playing_1s_ease-in-out_infinite_0.2s]' : 'h-[3px]'}`} />
          <div className={`bg-[#1db954] w-[2px] rounded-sm origin-bottom ${isPlaying ? 'animate-[playing_1s_ease-in-out_infinite_0.5s]' : 'h-[5px]'}`} />
          <div className={`bg-[#1db954] w-[2px] rounded-sm origin-bottom ${isPlaying ? 'animate-[playing_1s_ease-in-out_infinite_0.6s]' : 'h-[2px]'}`} />
          <div className={`bg-[#1db954] w-[2px] rounded-sm origin-bottom ${isPlaying ? 'animate-[playing_1s_ease-in-out_infinite_0s]' : 'h-[4px]'}`} />
        </div>
      </div>

      {/* Media Interaction Deck controls */}
      <div className="text-white flex w-full justify-center items-center gap-5 my-1">
        <SkipBack className="w-5 h-5 cursor-pointer text-neutral-400 hover:text-white transition-colors" />
        <button 
          onClick={togglePlay} 
          className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform flex items-center justify-center shadow"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-black text-black" />
          ) : (
            <Play className="w-5 h-5 fill-black text-black ml-0.5" />
          )}
        </button>
        <SkipForward className="w-5 h-5 cursor-pointer text-neutral-400 hover:text-white transition-colors" />
        
        {/* Dynamic Volume Slider Group */}
        <div className="group relative flex items-center ml-2">
          <Volume2 className="w-4 h-4 cursor-pointer text-neutral-400 hover:text-white transition-colors" />
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-0 opacity-0 group-hover:w-16 group-hover:opacity-100 ml-2 accent-[#1db954] h-1 transition-all duration-200 cursor-pointer"
          />
        </div>
      </div>

      {/* Progress Timeline Tracking Area */}
      <div className="w-full flex flex-col gap-1">
        <div className="relative w-full flex items-center">
          <input 
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1 bg-[#5e5e5e] rounded-lg appearance-none cursor-pointer accent-[#1db954]"
            style={{
              background: `linear-gradient(to right, #1db954 0%, #1db954 ${progressPercent}%, #5e5e5e ${progressPercent}%, #5e5e5e 100%)`
            }}
          />
        </div>
        <div className="flex justify-between w-full text-[#b3b3b3] text-[10px]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}