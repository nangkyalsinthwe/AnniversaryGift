import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StartPage from "./Pages/StartPage";
import Home from "./Pages/Home";
import Memory from "./Pages/Memory";
import LoveLetter from "./Pages/LoveLetter";
import PasswordModal from "./Components/PasswordModal";
import bgMusic from "./assets/TakeMeToYourHeart.mp3";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    handlePlayAudio();
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.addEventListener("click", handlePlayAudio, { once: true });
      window.addEventListener("touchstart", handlePlayAudio, { once: true });

      return () => {
        window.removeEventListener("click", handlePlayAudio);
        window.removeEventListener("touchstart", handlePlayAudio);
      };
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="w-full min-h-screen bg-[#1D0B1F] overflow-hidden">
        <audio ref={audioRef} src={bgMusic} loop />

        {!isAuthenticated ? (
          <PasswordModal onCorrectPassword={handlePasswordSuccess} />
        ) : (
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/loveLetter" element={<LoveLetter />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
