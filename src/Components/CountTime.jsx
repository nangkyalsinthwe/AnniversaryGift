import { motion } from "framer-motion";
import calendar from "../assets/calendar.png";
import { Link } from "react-router-dom";
import purple from "../assets/purple.jpg";

const CountTime = () => {
  const startDateStr = "2023-10-19";
  const startDate = new Date(startDateStr);
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const daysCount = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="relative flex flex-col justify-center items-center select-none w-full h-screen overflow-hidden bg-[#281629]">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-30"
        style={{ backgroundImage: `url(${purple})` }}
      />
      {/* Soft Glow Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-600/20 rounded-full blur-[120px]" />

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="z-10 w-full max-w-xl bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-center shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-500 flex flex-col items-center justify-center space-y-4"
      >
        <div className="p-3 rounded-2xl mb-1 bg-white/10 backdrop-blur-md">
          <img src={calendar} alt="calendar" className="w-10 h-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif text-purple-100 font-medium tracking-wide">
          Days Together
        </h2>

        {/* Big Number */}
        <p className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">
          {daysCount.toLocaleString()}
        </p>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-purple-200/80 font-light tracking-wide">
          Beautiful days since October 19, 2023
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="z-10 flex flex-row gap-4 mt-8">
        <Link
          to="/memory"
          className="text-lg sm:text-xl font-serif text-white bg-purple-900/60 border border-purple-400/30 backdrop-blur-md hover:bg-purple-300 hover:text-purple-950 transition-all duration-300 px-6 py-2.5 rounded-2xl shadow-lg cursor-pointer"
        >
          Our Memory 💜
        </Link>

        <Link
          to="/loveLetter"
          className="text-lg sm:text-xl font-serif text-white bg-purple-900/60 border border-purple-400/30 backdrop-blur-md hover:bg-purple-300 hover:text-purple-950 transition-all duration-300 px-6 py-2.5 rounded-2xl shadow-lg cursor-pointer"
        >
          Love Letter 💌
        </Link>
      </div>
    </div>
  );
};

export default CountTime;
