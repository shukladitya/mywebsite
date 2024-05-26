loadScript("https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js")
  .then(() => {
    document.fonts.load("600 228px 'Hanken Grotesk'").then(() => {
      const fontSizeFactory = (canvasWidth, canvasHeight) => {
        if (canvasWidth <= 400) return 114;
        else if (canvasWidth <= 430 || canvasWidth < canvasHeight) return 140;
        else return 228;
      };
      const canvas = document.querySelector("#sandCanvas");
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // You can also add an event listener to update the canvas dimensions if the window is resized
      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      ctx.fillStyle = "white";
      ctx.font = `600 ${fontSizeFactory(
        canvas.width,
        canvas.height
      )}px 'Hanken Grotesk'`;
      ctx.textAlign = "center";
      ctx.fillText("aditya", canvas.width / 2, canvas.height / 2 + 100);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

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
        // Adjust mouse position with scroll offset
        mouse.x = e.pageX - window.scrollX + 5;
        mouse.y = e.pageY - window.scrollY + 60;

        console.log(canvasLocation.center);

        // Find distance between mouse pointer and canvas center
        let dx = mouse.x - canvasLocation.center.x;
        let dy = mouse.y - canvasLocation.center.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        farAway = distance > 500;
      }
      function onTouchMove(e) {
        const touch = e.touches[0]; // Get the first touch point

        // Adjust touch position with scroll offset
        mouse.x = touch.pageX - window.scrollX + 5;
        mouse.y = touch.pageY - window.scrollY + 60;

        console.log(canvasLocation.center);

        // Find distance between touch point and canvas center
        let dx = mouse.x - canvasLocation.center.x;
        let dy = mouse.y - canvasLocation.center.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        farAway = distance > 500;
      }

      function onScroll() {
        const currentScrollPosition = window.pageYOffset;
        if (currentScrollPosition !== lastScrollPosition) {
          farAway = true;
        }
        lastScrollPosition = currentScrollPosition;
      }

      canvas.addEventListener("mousemove", _.throttle(onMouseMove, 16)); // Call every 16ms (approximately 60 FPS)
      canvas.addEventListener("touchstart", onTouchMove);
      canvas.addEventListener("touchmove", _.throttle(onTouchMove, 16));
      window.addEventListener("scroll", onScroll);

      let farAway = false;
      let lastScrollPosition = window.pageYOffset;

      class Particle {
        constructor(x, y, density, radius, retreatingSpeed) {
          this.x = x;
          this.y = y;
          this.baseX = this.x;
          this.baseY = this.y;
          this.radius = radius;
          this.density = density;
          this.retreatingSpeed = retreatingSpeed;
        }
        draw() {
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
        update() {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else if (farAway) {
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
              // Adjust 0.1 to change particle density
              let positionX = x;
              let positionY = y;
              particleArray.push(
                new Particle(
                  positionX,
                  positionY,
                  Math.random() * 200 + 30,
                  0.5 + Math.random() * 2.5,
                  40 + Math.random() * 140
                )
              );
            }
          }
        }
      }

      init();

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particleArray.length; i++) {
          particleArray[i].draw();
          particleArray[i].update();
        }
        requestAnimationFrame(animate);
      }

      animate();

      // definition
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
    });
  })
  .catch(() => {
    console.error("Script loading failed! Handle this error");
  });
