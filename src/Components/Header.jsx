import cats from "../assets/catsLove.png";
import headerImg from "../assets/headerpic.jpg";

const Header = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto text-center py-6 px-4 space-y-4 select-none">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-400/70 rounded-full blur-lg" />
        <img
          src={cats}
          alt="Love Cats"
          loading="eager"
          fetchpriority="high"
          className="relative w-28 h-28 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-transform duration-300"
        />
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight whitespace-nowrap bg-linear-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] py-1">
        Happy 3 Years Anniversary! ❤️
      </h1>

      <p className="text-sm sm:text-lg md:text-xl font-light text-purple-400/90 tracking-wider whitespace-nowrap drop-shadow">
        Three years, a thousand memories. I love you KOKO ❤️
      </p>

      <img
        src={headerImg}
        loading="eager"
        fetchpriority="high"
        alt="kokoBaby"
        className="w-80 h-80 mt-4 rounded-full object-cover drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default Header;
