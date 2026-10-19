import React from "react";
import { Link } from "react-router-dom";
import getData from "../data";

const Memory = () => {
  const scrollRef = React.useRef(null);
  const data = getData;
  const infiniteData = [...data, ...data, ...data];

  // Mouse Wheel to Horizontal Scroll
  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Smooth Auto Scroll
  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationId;
    const speed = 1;

    const scroll = () => {
      scrollContainer.scrollLeft += speed;
      const maxScroll = scrollContainer.scrollWidth / 3;
      if (scrollContainer.scrollLeft >= maxScroll * 2) {
        scrollContainer.scrollLeft -= maxScroll;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full min-h-screen bg-purple-200 text-white flex flex-col justify-center items-center p-4 sm:p-6 select-none relative overflow-hidden">
      <div className="text-center mb-6 px-2">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-purple-800 via-pink-900 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] py-1">
          Beautiful moments we've shared together
        </h1>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-6 max-w-7xl w-full"
      >
        {infiniteData.map((item, index) => (
          <div
            key={index}
            className="min-w-65 sm:min-w-[320px] shrink-0 bg-purple-50 p-4 pb-6 rounded-md shadow-2xl border border-purple-200 flex flex-col justify-between relative transform hover:-rotate-1 transition-transform duration-300"
          >
            <div className="flex justify-between items-center mb-3 px-1">
              <div className="w-3 h-3 bg-purple-200 rounded-full border border-purple-300"></div>
              <span className="text-[10px] tracking-widest text-purple-400 font-mono uppercase">
                MEMORY STRIP
              </span>
              <div className="w-3 h-3 bg-purple-200 rounded-full border border-purple-300"></div>
            </div>

            <div className="w-full h-72 sm:h-80 overflow-hidden rounded-sm bg-[#2e163c] p-1 border border-purple-200 shadow-inner">
              <img
                src={item.img}
                alt={`Memory ${item.id}`}
                className="w-full h-full object-cover contrast-[1.05] brightness-95"
              />
            </div>

            <div className="mt-4 pt-2 flex flex-col items-center justify-center font-serif text-gray-700">
              <p className="text-sm italic font-medium tracking-wide">
                Our Special Moment
              </p>
              <span className="text-[11px] text-purple-900/60 font-mono mt-1">
                ♥ PHOTO BOOTH ♥
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <Link
          to="/home#countTime"
          className="px-6 py-2 bg-purple-900/80 border-2 border-purple-800 text-purple-200 rounded-2xl hover:bg-purple-200 hover:text-purple-900 transition-all duration-300 shadow-lg text-sm font-semibold cursor-pointer"
        >
          ← Back to Home 🏠
        </Link>
        <Link
          to="/loveLetter"
          className="px-6 py-2 bg-purple-900/80 border-2 border-purple-800 text-purple-200 rounded-2xl hover:bg-purple-200 hover:text-purple-900 transition-all duration-300 shadow-lg text-sm font-semibold cursor-pointer"
        >
          Love Letter 💌
        </Link>
      </div>
    </div>
  );
};

export default Memory;
