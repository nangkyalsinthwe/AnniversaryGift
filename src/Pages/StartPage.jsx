import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// --- Helper Point Class ---
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  length(length) {
    if (typeof length === "undefined")
      return Math.sqrt(this.x * this.x + this.y * this.y);
    this.normalize();
    this.x *= length;
    this.y *= length;
    return this;
  }
  normalize() {
    const length = this.length();
    if (length !== 0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  }
}

const settings = {
  particles: {
    length: 500,
    duration: 2,
    velocity: 100,
    effect: -0.75,
    size: 13,
  },
};

export default function StartPage() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    class Particle {
      constructor() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
      }
      pointOnHeart(t) {
        return new Point(
          160 * Math.pow(Math.sin(t), 3),
          130 * Math.cos(t) -
            50 * Math.cos(2 * t) -
            20 * Math.cos(3 * t) -
            10 * Math.cos(4 * t) +
            25,
        );
      }
      initialize(x, y, dx, dy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
      }
      update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
      }
      draw(context, image) {
        function ease(t) {
          return --t * t * t + 1;
        }
        const size = image.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(
          image,
          this.position.x - size / 2,
          this.position.y - size / 2,
          size,
          size,
        );
      }
    }

    class ParticlePool {
      constructor(length) {
        this.particles = new Array(length);
        for (let i = 0; i < this.particles.length; i++)
          this.particles[i] = new Particle();
        this.firstActive = 0;
        this.firstFree = 0;
        this.duration = settings.particles.duration;
      }
      add(x, y, dx, dy) {
        this.particles[this.firstFree].initialize(x, y, dx, dy);
        this.firstFree++;
        if (this.firstFree === this.particles.length) this.firstFree = 0;
        if (this.firstActive === this.firstFree) this.firstActive++;
        if (this.firstActive === this.particles.length) this.firstActive = 0;
      }
      update(deltaTime) {
        let i;
        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++)
            this.particles[i].update(deltaTime);
        }
        if (this.firstFree < this.firstActive) {
          for (i = this.firstActive; i < this.particles.length; i++)
            this.particles[i].update(deltaTime);
          for (i = 0; i < this.firstFree; i++)
            this.particles[i].update(deltaTime);
        }
        while (
          this.particles[this.firstActive].age >= this.duration &&
          this.firstActive !== this.firstFree
        ) {
          this.firstActive++;
          if (this.firstActive === this.particles.length) this.firstActive = 0;
        }
      }
      draw(context, image) {
        let i;
        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++)
            this.particles[i].draw(context, image);
        }
        if (this.firstFree < this.firstActive) {
          for (i = this.firstActive; i < this.particles.length; i++)
            this.particles[i].draw(context, image);
          for (i = 0; i < this.firstFree; i++)
            this.particles[i].draw(context, image);
        }
      }
    }

    const createHeartImage = () => {
      const imageCanvas = document.createElement("canvas");
      const imageCtx = imageCanvas.getContext("2d");
      imageCanvas.width = settings.particles.size;
      imageCanvas.height = settings.particles.size;
      function to(t) {
        const point = new Particle().pointOnHeart(t);
        point.x =
          settings.particles.size / 2 +
          (point.x * settings.particles.size) / 350;
        point.y =
          settings.particles.size / 2 -
          (point.y * settings.particles.size) / 350;
        return point;
      }
      imageCtx.beginPath();
      let t = -Math.PI;
      let point = to(t);
      imageCtx.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01;
        point = to(t);
        imageCtx.lineTo(point.x, point.y);
      }
      imageCtx.closePath();
      imageCtx.fillStyle = "#a855f7";
      imageCtx.fill();
      const image = new Image();
      image.src = imageCanvas.toDataURL();
      return image;
    };

    const image = createHeartImage();
    const particles = new ParticlePool(settings.particles.length);
    const particleRate =
      settings.particles.length / settings.particles.duration;
    let time;

    const onResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const newTime = new Date().getTime() / 1000;
      const deltaTime = newTime - (time || newTime);
      time = newTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = new Particle().pointOnHeart(
          Math.PI - 2 * Math.PI * Math.random(),
        );
        const dir = pos.clone().length(settings.particles.velocity);
        particles.add(
          canvas.width / 2 + pos.x,
          canvas.height / 2 - pos.y,
          dir.x,
          -dir.y,
        );
      }

      particles.update(deltaTime);
      particles.draw(ctx, image);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleHeartClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    // 3 စက္ကန့်ပြည့်ပါက /home URL သို့ Route ပြောင်းမည်
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  return (
    <div className="relative w-full h-screen bg-[#160B18] overflow-hidden flex items-center justify-center select-none">
      <motion.div
        key="intro"
        onClick={handleHeartClick}
        initial={{ opacity: 1, scale: 1 }}
        animate={
          isClicked
            ? {
                scale: [1, 1.2, 2, 5, 15, 40, 100],
                opacity: [1, 1, 0.9, 0.8, 0.5, 0.2, 0],
              }
            : { scale: [1, 1.05, 1] }
        }
        transition={
          isClicked
            ? { duration: 5, ease: "easeInOut" }
            : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="w-full h-full bg-[#160B18] cursor-pointer flex items-center justify-center relative"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {!isClicked && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 text-purple-300 text-sm tracking-widest font-light pointer-events-none"
          >
            TOUCH THE HEART
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
