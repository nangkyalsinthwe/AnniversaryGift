import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Footer = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Firestore မှ မူလ ပေးထားခဲ့သော Rating ရှိမရှိ ယူဆောင်ခြင်း
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const docRef = doc(db, "ratings", "koko_rating");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRating(data.stars);
          setComment(data.comment || "");
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, []);

  // Rating Submit/Save လုပ်သည့် Function
  const handleSubmitRating = async (selectedStars) => {
    setRating(selectedStars);
    try {
      await setDoc(doc(db, "ratings", "koko_rating"), {
        stars: selectedStars,
        comment: comment,
        updatedAt: new Date(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

  // Comment ပြန်ပြင်/ထပ်သိမ်းသည့် Function
  const handleSaveComment = async () => {
    if (!rating) return;
    try {
      await setDoc(doc(db, "ratings", "koko_rating"), {
        stars: rating,
        comment: comment,
        updatedAt: new Date(),
      });
      alert("Thank you for your rating, Ko Ko! 💜");
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <footer className="text-center items-center justify-between gap-4 sm:gap-6 flex flex-col py-10 px-4 select-none border-t border-purple-900/20 mt-10">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-relaxed text-purple-700">
        <span className="animate-pulse inline-block">💜 </span>
        Made with love by Baby
        <span className="animate-pulse inline-block"> 💜</span>
      </h1>

      <p className="text-base sm:text-xl font-medium text-gray-600">
        Thank you for being a part of my life
      </p>

      <div className="w-32 sm:w-48 border-b-2 border-pink-900/30 my-2"></div>

      <p className="text-sm sm:text-lg font-medium text-purple-800/80">
        Celebrating 3 beautiful years together
      </p>

      {/* 🌟 Interactive Rating Box for Ko Ko */}
      <div className="bg-purple-900/30 backdrop-blur-md p-6 rounded-3xl border border-purple-500/30 max-w-md w-full shadow-xl my-4 space-y-4">
        <p className="text-purple-200 font-semibold text-sm sm:text-base">
          {isSubmitted
            ? "💖 Ko Ko's Rating for this Gift Site 💖"
            : "Rate my gift project, Ko Ko! ⭐️"}
        </p>

        {/* Interactive Stars */}
        <div className="flex justify-center items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="text-3xl sm:text-4xl transition-transform duration-200 hover:scale-125 focus:outline-hidden"
              onClick={() => handleSubmitRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <span
                className={
                  star <= (hover || rating)
                    ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                    : "text-gray-500/50"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        {rating > 0 && (
          <div className="space-y-3 pt-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a sweet message for Baby... ✍️"
              className="w-full bg-purple-950/50 border border-purple-400/30 rounded-2xl p-3 text-xs sm:text-sm text-purple-100 placeholder-purple-300/50 focus:outline-hidden focus:border-pink-400 transition-all resize-none"
              rows="3"
            />
            <button
              onClick={handleSaveComment}
              className="px-5 py-2 bg-pink-600/80 hover:bg-pink-500 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              Save Review 💌
            </button>
          </div>
        )}
      </div>

      <p className="text-lg">✨✨✨</p>
    </footer>
  );
};

export default Footer;
