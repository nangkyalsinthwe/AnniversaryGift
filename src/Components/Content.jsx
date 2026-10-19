import React from "react";
import swan from "../assets/swanPurple.jpg";

const Content = () => {
  return (
    <div className="relative flex flex-col justify-center items-center select-none w-full h-screen overflow-hidden bg-black px-4">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-30"
        style={{ backgroundImage: `url(${swan})` }}
      />
      <div className="z-10 w-full max-w-3xl text-center flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-purple-300 font-serif leading-tight">
          You Have All My Heart 💌
        </h1>
        <p className="text-base sm:text-xl md:text-2xl leading-relaxed text-pink-200 font-light max-w-lg">
          Every little memory with you is my treasure. I love you more than
          yesterday, but not as much as tomorrow! 🥰
        </p>
        <p className="text-xl">🌷🐰🍓🐰🌷</p>
      </div>
    </div>
  );
};

export default Content;
