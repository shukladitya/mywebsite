function loadScript(scriptUrl) {
  const script = document.createElement("script");
  script.src = scriptUrl;
  document.body.appendChild(script);

  return new Promise((res, rej) => {
    script.onload = function () {
      res();
    };
    script.onerror = function () {
      rej();
    };
  });
}

loadScript("https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js")
  .then(() => {
    return document.fonts.load("600 228px 'Hanken Grotesk'");
  })
  .then(() => {
    const fontSizeFactory = (canvasWidth, canvasHeight) => {
      if (canvasWidth <= 400) return 114;
      else if (canvasWidth <= 430 || canvasWidth < canvasHeight) return 140;
      else return 228;
    };

    function updateMousePosition(pageX, pageY) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = pageX - rect.left - window.scrollX;
      mouse.y = pageY - rect.top - window.scrollY;
      mouse.isInCanvas =
        mouse.x >= 0 &&
        mouse.x <= canvas.width &&
        mouse.y >= 0 &&
        mouse.y <= canvas.height;

      if (mouse.isInCanvas) {
        let dx = mouse.x - canvas.width / 2;
        let dy = mouse.y - canvas.height / 2;
        let distance = Math.sqrt(dx * dx + dy * dy);
        farAway = distance > 500;
      } else {
        farAway = true;
      }
    }

    const canvas = document.querySelector("#sandCanvas");
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    let particleArray = [];
    let isInitialAnimationComplete = false;

    function updateCanvasSize() {
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = "white";
      ctx.font = `600 ${fontSizeFactory(
        canvas.width,
        canvas.height
      )}px 'Hanken Grotesk'`;
      ctx.textAlign = "center";
      ctx.fillText("aditya", canvas.width / 2, canvas.height / 2 + 100);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (isInitialAnimationComplete && particleArray.length > 0) {
        const scaleX = canvas.width / oldWidth;
        const scaleY = canvas.height / oldHeight;

        particleArray.forEach((particle) => {
          particle.x *= scaleX;
          particle.y *= scaleY;
          particle.baseX *= scaleX;
          particle.baseY *= scaleY;
          particle.targetX *= scaleX;
          particle.targetY *= scaleY;
        });
      }

      return data;
    }

    window.addEventListener("resize", () => {
      updateCanvasSize();
    });

    const data = updateCanvasSize();

    const mouse = {
      x: 0,
      y: 0,
      radius: 20,
    };

    const canvasRect = canvas.getBoundingClientRect();

    const canvasLocation = {
      top: canvasRect.top + window.scrollY,
      left: canvasRect.left + window.scrollX,
      center: {
        x: canvasRect.left + window.scrollX + canvasRect.width / 2,
        y: canvasRect.top + window.scrollY + canvasRect.height / 2,
      },
    };

    function onMouseMove(e) {
      updateMousePosition(e.pageX, e.pageY);
    }

    function onTouchMove(e) {
      const touch = e.touches[0];
      updateMousePosition(touch.pageX, touch.pageY);
    }

    function onScroll() {
      if (lastMouseEvent) {
        updateMousePosition(lastMouseEvent.pageX, lastMouseEvent.pageY);
      }
      farAway = true;
    }

    let lastMouseEvent = null;
    canvas.addEventListener("mousemove", (e) => {
      lastMouseEvent = e;
      _.throttle(onMouseMove, 16)(e);
    });
    canvas.addEventListener("mouseleave", () => {
      mouse.isInCanvas = false;
      farAway = true;
    });
    canvas.addEventListener("touchstart", onTouchMove);
    canvas.addEventListener("touchmove", _.throttle(onTouchMove, 16));
    window.addEventListener("scroll", _.throttle(onScroll, 16));

    let farAway = false;
    let lastScrollPosition = window.pageYOffset;

    class Particle {
      constructor(targetX, targetY, density, radius, retreatingSpeed) {
        // Determine if this particle should start close to target (70% chance)
        const startNearTarget = Math.random() < 0.9;

        if (startNearTarget) {
          // Start within a radius of 100-200 pixels from target
          const angle = Math.random() * Math.PI * 2;
          const distance = 20 + Math.random() * 100;
          this.x = targetX + Math.cos(angle) * distance;
          this.y = targetY + Math.sin(angle) * distance;
        } else {
          // Random starting position anywhere on canvas
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }

        this.targetX = targetX;
        this.targetY = targetY;
        this.baseX = targetX;
        this.baseY = targetY;
        this.radius = radius;
        this.density = density;
        this.retreatingSpeed = retreatingSpeed;

        // Create different speed groups
        const speedGroup = Math.random();
        if (speedGroup < 0.1) {
          // Very slow particles (10% chance)
          this.initialSpeed = 0.002 + Math.random() * 0.003;
        } else if (speedGroup < 0.3) {
          // Slow particles (20% chance)
          this.initialSpeed = 0.005 + Math.random() * 0.005;
        } else if (speedGroup < 0.8) {
          // Medium speed particles (50% chance)
          this.initialSpeed = 0.01 + Math.random() * 0.01;
        } else {
          // Fast particles (20% chance)
          this.initialSpeed = 0.015 + Math.random() * 0.015;
        }

        this.hasReachedTarget = false;
      }

      draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (!this.hasReachedTarget) {
          let dx = this.targetX - this.x;
          let dy = this.targetY - this.y;

          this.x += dx * this.initialSpeed;
          this.y += dy * this.initialSpeed;

          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            this.hasReachedTarget = true;
            const allParticlesReached = particleArray.every(
              (p) => p.hasReachedTarget
            );
            if (allParticlesReached) {
              isInitialAnimationComplete = true;
            }
          }
          return;
        }

        if (mouse.isInCanvas) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
          }
        }

        if (farAway || !mouse.isInCanvas) {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / this.retreatingSpeed;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / this.retreatingSpeed;
          }
        }
      }
    }

    function init() {
      particleArray = [];

      for (let y = 0, y2 = data.height; y < y2; y++) {
        for (let x = 0, x2 = data.width; x < x2; x++) {
          if (
            data.data[y * 4 * data.width + x * 4 + 3] > 128 &&
            Math.random() < 0.2
          ) {
            particleArray.push(
              new Particle(
                x,
                y,
                Math.random() * 200 + 30,
                0.5 + Math.random() * 2.5,
                40 + Math.random() * 140
              )
            );
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();
  })
  .catch((error) => {
    console.error("Script loading failed:", error);
  });
