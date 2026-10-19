import React from "react";
import { Link } from "react-router-dom";
import marquise from "../assets/marquise.png";
import bow from "../assets/bow.png";

const LoveLetter = () => {
  return (
    <div className="w-full min-h-screen bg-purple-200 flex flex-col justify-center items-center p-4 sm:p-8 select-none">
      <div className="max-w-3xl w-full bg-[#fdf8f5] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-purple-300 relative overflow-hidden my-6">
        {/* Top Left Bow */}
        <div className="absolute top-0 left-0 z-10">
          <img
            className="w-16 h-16 transform -rotate-12 -skew-x-6 object-contain drop-shadow-[0_10px_10px_rgba(219,39,119,0.5)]"
            src={bow}
            alt="bow letter"
          />
        </div>

        {/* Top Right Bow */}
        <div className="absolute top-0 right-0 z-10">
          <img
            className="w-16 h-16 transform rotate-12 skew-x-6 object-contain drop-shadow-[0_10px_10px_rgba(219,39,119,0.5)]"
            src={bow}
            alt="bow letter"
          />
        </div>

        {/* Header Section */}
        <div className="text-center mb-8 border-dashed border-pink-200 pb-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-purple-900 mt-2">
            𝒜 ℒℯ𝓉𝓉ℯ𝓇 ℱ𝓇ℴ𝓂 ℳ𝓎 ℋℯ𝒶𝓇𝓉
          </h1>
          <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-rose-400 to-transparent mx-auto my-4"></div>
          <img
            src={marquise}
            alt="Marquise"
            className="w-10 max-w-xs mx-auto mb-2"
          />
          <p className="text-xs sm:text-sm text-pink-600 font-mono tracking-wide">
            "3 Years of Pure Love & Togetherness"
          </p>
        </div>

        {/* Letter Body */}
        <div className="space-y-6 text-gray-700 font-serif leading-relaxed text-sm sm:text-base">
          <p className="font-bold text-xl text-purple-900 italic">
            My Sweetest KO KO 🧸💜,
          </p>

          <p className="text-gray-600 text-sm sm:text-base block">
            Can you believe we've been making beautiful memories together for 3
            whole years? Time flies so fast, but every single day with you still
            gives me butterflies!
          </p>

          {/* Gratitude Box */}
          <div className="bg-linear-to-r from-purple-50 to-pink-50 p-4 sm:p-5 rounded-3xl border border-purple-200/50 space-y-3">
            <p className="text-purple-950 font-bold text-sm sm:text-base italic">
              "Reasons why you're my favorite human..." 🎀
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-gray-700 pl-1">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
                <span>
                  <strong className="text-purple-900 font-serif">
                    Your Patience:
                  </strong>{" "}
                  Always comforting me with warm hugs.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0"></span>
                <span>
                  <strong className="text-purple-900 font-serif">
                    Your Strength:
                  </strong>{" "}
                  Being my solid rock whenever I feel down.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
                <span>
                  <strong className="text-purple-900 font-serif">
                    Your Pure Heart:
                  </strong>{" "}
                  Loving me whole-heartedly every single day.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-gray-600 text-sm sm:text-base block">
            Thank you for being my anchor, my best friend, and my safest home. I
            want to keep walking this hand-in-hand journey with you, creating a
            million more sweet memories and loving you deeper with every passing
            day.
          </p>

          <p className="text-purple-900/90 italic font-medium text-sm sm:text-base leading-relaxed bg-pink-50/50 p-3 rounded-xl border border-pink-100 text-center">
            "No matter where life takes us, as long as I have your hand to hold,
            I know everything will be magical." ✨💖
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-purple-900 font-semibold text-center pt-2">
            Here’s to a lifetime of late-night talks and warm hugs. 🥂🧸
          </p>

          {/* Signature */}
          <div className="pt-6 text-right font-sans border-t border-dashed border-pink-200 mt-6">
            <p className="text-xs text-pink-600 tracking-widest uppercase font-semibold">
              With all my love & heart,
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-purple-900 font-serif mt-1">
              Nang Kyal Sin Thwe 💖
            </h2>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-2">
        <Link
          to="/memory"
          className="px-6 py-2 bg-purple-900/80 border-2 border-purple-800 text-purple-200 rounded-2xl hover:bg-purple-200 hover:text-purple-900 transition-all duration-300 shadow-lg text-sm font-semibold"
        >
          ← Back to Memories 💜
        </Link>
        <Link
          to="/home#countTime"
          className="px-6 py-2 bg-purple-900/80 border-2 border-purple-800 text-purple-200 rounded-2xl hover:bg-purple-200 hover:text-purple-900 transition-all duration-300 shadow-lg text-sm font-semibold"
        >
          Back to Home 🏠
        </Link>
      </div>
    </div>
  );
};

export default LoveLetter;
