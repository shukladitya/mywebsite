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

function onMouseMove(e) {
  if (!maganatizedPosition) {
    TweenMax.to($bigBall, tweenSpeed, {
      x: e.pageX - 15,
      y: e.pageY - 12,
      onComplete: () => {
        if (maganatizedPosition) {
          TweenMax.to($bigBall, 0.3, {
            x: maganatizedPosition.left + maganatizedPosition.width / 2 - 21,
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
        (e.clientX - maganatizedPosition.left) * 0.2,
      y:
        maganatizedPosition.top +
        maganatizedPosition.height / 2 -
        6 +
        (e.clientY - maganatizedPosition.top) * 0.2,
    });
    if (
      e.clientX < maganatizedPosition.left - 50 ||
      e.clientX > maganatizedPosition.right + 50 ||
      e.clientY < maganatizedPosition.top - 50 ||
      e.clientY > maganatizedPosition.bottom + 50
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
    x: e.pageX,
    y: e.pageY - 1,
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
