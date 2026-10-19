import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import CountTime from "../Components/CountTime";
import Content from "../Components/Content";
import Footer from "../Components/Footer";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  return (
    <motion.div
      key="main-content"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full h-screen text-white relative z-10 overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      <section className="w-full h-screen flex flex-col justify-center items-center snap-start">
        <Header />
      </section>

      <section
        id="countTime"
        className="w-full h-screen flex flex-col justify-center items-center snap-start"
      >
        <CountTime />
      </section>

      <section className="w-full h-screen flex flex-col justify-center items-center snap-start">
        <Content />
      </section>

      <section className="w-full max-h-200 flex flex-col justify-center items-center snap-start">
        <Footer />
      </section>
    </motion.div>
  );
};

export default Home;
