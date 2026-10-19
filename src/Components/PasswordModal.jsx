import { useState } from "react";
import { motion } from "framer-motion";

const PasswordModal = ({ onCorrectPassword }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const CORRECT_PIN = "101923";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      sessionStorage.setItem("isAuth", "true");
      onCorrectPassword();
    } else {
      setError("Password is wrong.Try Again!");
      setPin("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#210D26] border border-purple-500/30 p-8 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(168,85,247,0.2)] text-white text-center"
      >
        <div className="text-4xl mb-3">🔒</div>
        <h3 className="text-xl font-serif text-purple-200 mb-1">
          Private Memory
        </h3>
        <p className="text-xs text-purple-300/70 mb-6">
          Enter our special date to enter
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="****"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-3 bg-purple-950/60 border border-purple-400/30 rounded-2xl text-white text-center text-lg tracking-widest focus:outline-none focus:border-purple-400 transition-all"
            autoFocus
          />

          {error && <p className="text-pink-400 text-xs">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl text-sm font-semibold transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            Unlock 💜
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PasswordModal;
