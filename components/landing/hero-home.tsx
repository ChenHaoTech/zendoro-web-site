import { useEffect, useState } from "react";
import PreviewLink from "../misc/preview-link";

const HeroHome = () => {
  const [iframeHidden, setIframeHidden] = useState(true);  

    // hides iframe to prevent focus jank (jumping to iframe on click) 
    useEffect(() => {
      let lastScrollPosition = window.scrollY;
      const scrollHandler = () => {
        if (Math.abs(lastScrollPosition - window.scrollY) > 500) {
          lastScrollPosition = window.scrollY;
          setIframeHidden(true);
        }
      };
      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }, []);  

  return(
    <section className="relative">

      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-4" data-aos="zoom-y-out">Imagine Apple Notes, synced with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-400">Obsidian</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                Your Ideas, Instantly in Obsidian: The Open-Source Tool Making Note-Taking Effortless
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center mb-4" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="https://my.fleetingnotes.app">Try Web App</a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="/docs">Learn more</a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div className="relative flex justify-center mb-8 max-w-3xl mx-auto" data-aos="zoom-y-out" data-aos-delay="450">
              <div className="flex flex-col justify-center w-full shadow-md border rounded">
                {iframeHidden ? (
                  <img className="w-full mx-auto" src="assets/demo.png" alt="Hero" />
                ) : (
                  <iframe className="w-full h-[500px]" src="https://my.fleetingnotes.app/?note=d8e2d800-3470-11ed-8f75-019219fce7fb"></iframe>
                )}
              </div>
              <button className={`absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg ${iframeHidden ? 'block' : 'hidden'}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIframeHidden(!iframeHidden); }} aria-controls="modal">
                <svg className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span className="ml-3">Click to try yourself</span>
              </button>
            </div>
          </div>
        
        </div>
      </div>
    </section>

  )
}

export default HeroHome;
