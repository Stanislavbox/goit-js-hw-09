
function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      startBtn.disabled = true;
      stopBtn.disabled = false;
      timerId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
});


stopBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      clearInterval(timerId);
      startBtn.disabled = false;
      stopBtn.disabled = true;
});
