import { useRef, useState, useEffect } from "react"
import { Balloons } from "./components/ui/balloons"

function useTextScramble(targetText: string) {
  const [text, setText] = useState("")
  const chars = "░▒▓█░▒▓█✿❀❁❃"
  
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    
    interval = setInterval(() => {
      setText(
        targetText.split("")
          .map((_, index) => {
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 45);
    
    return () => clearInterval(interval);
  }, [targetText]);

  return text;
}

export default function App() {
  const balloonsRef = useRef<{ launchAnimation: () => void } | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const scrambleWelcome = useTextScramble("Happy 16th Birthday Hala!")

  const toggleMusic = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      if (audioRef.current.currentTime < 2.5) {
        audioRef.current.currentTime = 2.5
      }
      
      // Forces lower volume level (20% power)
      audioRef.current.volume = 0.2;

      audioRef.current.play().catch(err => console.log("Audio play blocked: ", err))
      setIsPlaying(true)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center selection:bg-rose-200 overflow-hidden">
      
      {/* HAND-DRAWN NOISE FILTERS */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="handDrawnNoise">
          <feTurbulence result="noise" numOctaves="8" baseFrequency="0.1" type="fractalNoise" />
          <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale="3" in2="noise" in="SourceGraphic" />
        </filter>
        <filter id="handDrawnNoise2">
          <feTurbulence result="noise" numOctaves="8" baseFrequency="0.1" seed="1010" type="fractalNoise" />
          <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale="3" in2="noise" in="SourceGraphic" />
        </filter>
      </svg>

      {/* STRATEGICALLY SCATTERED DECORATIVE PEONIES (z-0 background layer) */}
      
      {/* Top Left Corner */}
      <img src="/p1.png" alt="peony" className="absolute top-0 left-0 -translate-x-6 -translate-y-6 w-28 md:w-36 opacity-70 pointer-events-none rotate-[110deg] animate-pulse z-0" loading="lazy" />
      
      {/* Top Right Corner */}
      <img src="/p2.png" alt="peony" className="absolute top-0 right-0 translate-x-6 -translate-y-6 w-24 md:w-32 opacity-65 pointer-events-none -rotate-45 z-0" loading="lazy" />

      {/* Midway Left - Near Photo Gallery Start */}
      <img src="/p4.png" alt="peony" className="absolute top-[38%] left-[-20px] w-24 md:w-32 opacity-60 pointer-events-none rotate-45 z-0" loading="lazy" />

      {/* Midway Right - Near Photo Gallery Center */}
      <img src="/p3.png" alt="peony" className="absolute top-[52%] right-[-30px] w-32 md:w-40 opacity-70 pointer-events-none -rotate-12 z-0" loading="lazy" />

      {/* Lower Left - Framed around the Cassette Wrapper */}
      <img src="/p1.png" alt="peony" className="absolute bottom-[28%] left-[-15px] w-28 md:w-36 opacity-75 pointer-events-none rotate-180 z-0" loading="lazy" />

      {/* Lower Right - Directly flanking the Play/Pause system */}
      <img src="/p3.png" alt="peony" className="absolute bottom-[18%] right-[-10px] w-26 md:w-34 opacity-70 pointer-events-none rotate-90 z-0" loading="lazy" />
      
      {/* NEW: Deep Bottom Center-Left (Filling the space under the play button) */}
      <img src="/p2.png" alt="peony" className="absolute bottom-[6%] left-[15%] w-24 md:w-32 opacity-65 pointer-events-none rotate-[20deg] z-0" loading="lazy" />

      {/* NEW: Deep Bottom Center-Right (Filling the space under the play button) */}
      <img src="/p1.png" alt="peony" className="absolute bottom-[3%] right-[20%] w-28 md:w-36 opacity-70 pointer-events-none -rotate-[15deg] z-0" loading="lazy" />

      {/* Absolute Bottom Right Corner */}
      <img src="/p4.png" alt="peony" className="absolute bottom-0 right-0 translate-x-6 translate-y-6 w-28 md:w-36 opacity-65 pointer-events-none rotate-[340deg] z-0" loading="lazy" />

      {/* NEW: Absolute Bottom Left Corner */}
      <img src="/p3.png" alt="peony" className="absolute bottom-0 left-0 -translate-x-6 translate-y-6 w-24 md:w-32 opacity-65 pointer-events-none rotate-[60deg] z-0" loading="lazy" />


      {/* MASSIVE WHITE SPACE AT THE VERY TOP */}
      <div style={{ height: '20vh' }}></div>

      {/* PERFECTLY CENTERED WELCOME HERO SECTION */}
      <header 
        className="text-center z-10 px-6 py-6 md:px-10 bg-[#fffbfb] rounded-[24px] border-3 border-[#4a3e3d] shadow-[#4a3e3d_5px_5px_0_0px] flex items-center justify-center max-w-[90vw]" 
        style={{ filter: 'url(#handDrawnNoise)' }}
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-mono tracking-wider font-extrabold text-rose-900 leading-tight m-0">
          {scrambleWelcome}
        </h1>
      </header>

      {/* MASSIVE WHITE SPACE BETWEEN WELCOME AND BUTTON */}
      <div style={{ height: '15vh' }}></div>

      {/* CLICK ME BUTTON */}
      <section className="flex flex-col items-center justify-center z-10 w-full">
        <button 
          onClick={() => balloonsRef.current?.launchAnimation()} 
          className="button-handdrawn text-rose-950 pl-14 bg-white"
        >
          <svg className="button-cosm" width="128" height="128" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <path d="M243.07324,157.43945c-1.2334-1.47949-23.18847-27.34619-60.46972-41.05859-1.67579-17.97412-8.25293-34.36328-18.93653-46.87158C149.41309,52.8208,128.78027,44,104,44,54.51074,44,22.10059,88.57715,20.74512,90.4751a3.99987,3.99987,0,0,0,6.50781,4.65234C27.5625,94.6958,58.68359,52,104,52c22.36816,0,40.89648,7.85107,53.584,22.70508,8.915,10.437,14.65625,23.9541,16.65528,38.894A133.54185,133.54185,0,0,0,136,108c-25.10742,0-46.09473,6.48486-60.69434,18.75391-12.65234,10.63379-19.91015,25.39355-19.91015,40.49463a43.61545,43.61545,0,0,0,12.69336,31.21923C76.98438,207.3208,89.40234,212,104,212c23.98047,0,44.37305-9.4668,58.97461-27.37744,12.74512-15.6333,20.05566-37.145,20.05566-59.01953,0-.1128-.001-.22559-.001-.33838,33.62988,13.48486,53.62207,36.96631,53.89746,37.2959a4.00015,4.00015,0,0,0,6.14648-5.1211ZM104,204c-27.89746,0-40.60449-19.05078-40.60449-36.75146C63.39551,142.56592,86.11621,116,136,116a124.37834,124.37834,0,0,1,38.97266,6.32617q.05712,1.63038.05761,3.27686C175.03027,177.07129,139.29785,204,104,204Z" />
          </svg>
          <svg className="highlight" viewBox="0 0 144.75738 77.18431" preserveAspectRatio="none">
            <g transform="translate(-171.52826,-126.11624)">
              <g fill="none" strokeWidth="17" strokeLinecap="round" strokeMiterlimit="10">
                <path d="M180.02826,169.45123c0,0 12.65228,-25.55115 24.2441,-25.66863c6.39271,-0.06479 -5.89143,46.12943 4.90937,50.63857c10.22345,4.2681 24.14292,-52.38336(37.86455,-59.80493c3.31715,-1.79413 -5.35094,45.88889 -0.78872,58.34589c5.19371,14.18125 33.36934,-58.38221 36.43049,-56.91633c4.67078,2.23667 -0.06338,44.42744 5.22574,47.53647c6.04041,3.55065 19.87185,-20.77286 19.87185,-20.77286" />
              </g>
            </g>
          </svg>
          Click Me!
        </button>
      </section>

      {/* MASSIVE WHITE SPACE BETWEEN BUTTON AND CARDS */}
      <div style={{ height: '15vh' }}></div>

      {/* STAGGERED PHOTO CARDS */}
      <section className="w-full max-w-5xl flex flex-col gap-[70px] z-10">
        
        {/* Card 1: Forced Left, Tilted Right */}
        <div className="stack" style={{ margin: '0 auto 0 10%', transform: 'rotate(5deg)' }}>
          <div className="card-stacked">
            <img src="/card1.jpeg" alt="Card 1" className="w-full aspect-square object-cover border-2 border-[#4a3e3d]" />
          </div>
        </div>

        {/* Card 2: Forced Center, Slight Left Tilt */}
        <div className="stack" style={{ margin: '0 auto', transform: 'rotate(-2deg)' }}>
          <div className="card-stacked">
            <img src="/card2.jpeg" alt="Card 2" className="w-full aspect-square object-cover border-2 border-[#4a3e3d]" />
          </div>
        </div>

        {/* Card 3: Forced Right, Tilted Left */}
        <div className="stack" style={{ margin: '0 10% 0 auto', transform: 'rotate(-5deg)' }}>
          <div className="card-stacked">
            <img src="/card3.jpeg" alt="Card 3" className="w-full aspect-square object-cover border-2 border-[#4a3e3d]" />
          </div>
        </div>

      </section>

      {/* WHITE SPACE BETWEEN CARDS AND CASSETTE */}
      <div style={{ height: '15vh' }}></div>

      {/* CASSETTE DECK CONTAINER */}
      <section className={`flex flex-col items-center z-10 w-full ${isPlaying ? 'playing-anime' : ''}`}>
        
        <div className="cassette-wrapper">
          <div className="cassette-card">
            
            {/* Absolute Corner Screws */}
            <div className="screw1">+</div>
            <div className="screw2">+</div>
            <div className="screw3">+</div>
            <div className="screw4">+</div>

            {/* Spacer to push card1 down accurately */}
            <div className="ups" style={{ height: '35px' }}></div>

            <div className="card1">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="yl">
                <div className="roll">
                  <div className="s_wheel"></div>
                  <div className="tape"></div>
                  <div className="e_wheel"></div>
                </div>
                <p className="num">90</p>
              </div>
              <div className="or">
                <p className="time">2×30min</p>
              </div>
            </div>
            
            <div className="card2_main">
              <div className="card2">
                <div className="c1"></div>
                <div className="t1"></div>
                <div className="screw5">+</div>
                <div className="t2"></div>
                <div className="c2"></div>
              </div>
            </div>

            {/* Spacer to maintain cassette structural integrity */}
            <div className="downs" style={{ height: '35px' }}></div>
            
          </div>
        </div>

        {/* AUDIO FILE */}
        <audio 
          ref={audioRef} 
          src="/song.mp3" 
          loop
        />

        {/* MATCHING CIRCULAR PLAY BUTTON DESIGN */}
        <label className="music-deck-container">
          <input 
            type="checkbox" 
            checked={isPlaying} 
            onChange={toggleMusic} 
          />
          <svg className="highlight" viewBox="0 0 144.75738 77.18431" preserveAspectRatio="none" style={{ borderRadius: '9999px' }}>
            <g transform="translate(-171.52826,-126.11624)">
              <g fill="none" strokeWidth="17" strokeLinecap="round" strokeMiterlimit="10">
                <path d="M180.02826,169.45123c0,0 12.65228,-25.55115 24.2441,-25.66863c6.39271,-0.06479 -5.89143,46.12943 4.90937,50.63857c10.22345,4.2681 24.14292,-52.38336(37.86455,-59.80493c3.31715,-1.79413 -5.35094,45.88889 -0.78872,58.34589c5.19371,14.18125 33.36934,-58.38221 36.43049,-56.91633c4.67078,2.23667 -0.06338,44.42744 5.22574,47.53647c6.04041,3.55065 19.87185,-20.77286 19.87185,-20.77286" />
              </g>
            </g>
          </svg>
          <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" className="play">
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
          </svg>
          <svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" className="pause">
            <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path>
          </svg>
        </label>
      </section>

      {/* MASSIVE WHITE SPACE AT THE VERY BOTTOM */}
      <div style={{ height: '30vh' }}></div>

      <Balloons ref={balloonsRef} type="default" />
    </div>
  )
}