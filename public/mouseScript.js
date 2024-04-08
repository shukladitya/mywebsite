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

// use
loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js")
  .then(() => {
    const $bigBall = document.querySelector(".cursor__ball--big");
    const $smallBall = document.querySelector(".cursor__ball--small");
    const $hoverables = document.querySelectorAll(".hoverable");
    // Listeners
    document.body.addEventListener("mousemove", onMouseMove);

    for (let i = 0; i < $hoverables.length; i++) {
      $hoverables[i].addEventListener("mouseenter", () =>
        onMouseHover($hoverables[i].getBoundingClientRect(), $hoverables[i])
      );
    }

    // Move the cursor
    let tweenSpeed = 0.3;
    let maganatizedPosition = null;
    let hoverableActiveElement = null;
    let isCursorInitialized = false;
    TweenMax.set($bigBall, { visibility: "hidden" });
    TweenMax.set($smallBall, { visibility: "hidden" });

    function onMouseMove(e) {
      const cursorX = e.pageX - window.scrollX;
      const cursorY = e.pageY - window.scrollY;

      if (!isCursorInitialized) {
        TweenMax.set($bigBall, {
          x: cursorX - 15,
          y: cursorY - 12,
          visibility: "visible",
        });
        TweenMax.set($smallBall, {
          x: cursorX,
          y: cursorY - 1,
          visibility: "visible",
        });
        isCursorInitialized = true;
      }

      if (!maganatizedPosition) {
        TweenMax.to($bigBall, tweenSpeed, {
          x: cursorX - 15,
          y: cursorY - 12,
          onComplete: () => {
            if (maganatizedPosition) {
              TweenMax.to($bigBall, 0.3, {
                x:
                  maganatizedPosition.left + maganatizedPosition.width / 2 - 21,
                y: maganatizedPosition.top + maganatizedPosition.height / 2 - 6,
              });
            }
          },
        });
      } else {
        TweenMax.to($bigBall, 0.3, {
          x:
            maganatizedPosition.left +
            maganatizedPosition.width / 2 -
            21 +
            (cursorX - maganatizedPosition.left) * 0.2,
          y:
            maganatizedPosition.top +
            maganatizedPosition.height / 2 -
            6 +
            (cursorY - maganatizedPosition.top) * 0.2,
        });
        if (
          cursorX < maganatizedPosition.left - 50 ||
          cursorX > maganatizedPosition.right + 50 ||
          cursorY < maganatizedPosition.top - 50 ||
          cursorY > maganatizedPosition.bottom + 50
        ) {
          maganatizedPosition = null;
          hoverableActiveElement.classList.remove("underlineHover");
          hoverableActiveElement = null;
          TweenMax.to($bigBall, 0.15, {
            scale: 1,
          });
        }
      }

      TweenMax.to($smallBall, 0.1, {
        x: cursorX,
        y: cursorY - 1,
      });
    }

    // Hover an element

    function onMouseHover(elementPos, element) {
      TweenMax.to($bigBall, 0.15, {
        scale: 4,
      });
      maganatizedPosition = elementPos;
      hoverableActiveElement = element;
      element.classList.add("underlineHover");
    }

    //ripple effect
    let animatingRipple = false;
    document.addEventListener("click", () => {
      if (!maganatizedPosition && !animatingRipple) {
        animatingRipple = true;
        TweenMax.to($bigBall, 0.3, {
          scale: 0.2,
          onComplete: () => {
            TweenMax.to($bigBall, 0.15, {
              scale: 2.3,
              onComplete: () => {
                TweenMax.to($bigBall, 0.15, {
                  scale: 1,
                });
                animatingRipple = false;
              },
            });
          },
        });
      } else if (maganatizedPosition) {
        hoverableActiveElement.click();
      }
    });
  })
  .catch(() => {
    console.error("Script loading failed! Handle this error");
  });
