import React from "react";

const Footer = () => {
  return (
    <footer className="text-center items-center justify-between gap-4 sm:gap-6 flex flex-col py-10 px-4 select-none">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-relaxed text-purple-700">
        <span className="animate-pulse inline-block">💜 </span>
        Made with love by Baby
        <span className="animate-pulse inline-block"> 💜</span>
      </h1>

      <p className="text-base sm:text-xl font-medium text-gray-600">
        Thank you for being a part of my life
      </p>

      {/* Border Line Fix */}
      <div className="w-32 sm:w-48 border-b-2 border-pink-900 my-2"></div>

      <p className="text-sm sm:text-lg font-medium text-purple-800/80">
        Celebrating 3 beautiful years together
      </p>

      <p className="text-lg">✨✨✨</p>
    </footer>
  );
};

export default Footer;
