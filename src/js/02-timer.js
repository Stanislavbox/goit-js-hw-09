import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const input = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]')
let flatpickrTime = null;

startBtn.disabled = true;
startBtn.addEventListener('click', onClick)

flatpickr(input, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
            flatpickrTime = selectedDates[0]
            if(flatpickrTime- Date.now() < 0){
                  Notiflix.Notify.failure("Please choose a date in the future");
                  return;
            }
            startBtn.disabled = false;
      },
});

function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
}

function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
      // Remaining days
      const days = addLeadingZero(Math.floor(ms / day));
      // Remaining hours
      const hours = addLeadingZero(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));


      return { days, hours, minutes, seconds };
}

function onClick(evt){
      evt.preventDefault();
      input.disabled = true;
      let intervalId = setInterval(() => {
            let currentTime = convertMs(flatpickrTime-Date.now());
            let timer = flatpickrTime-Date.now()

            let day = document.querySelector('[data-days]');
            let hour = document.querySelector('[data-hours]');
            let minute = document.querySelector('[data-minutes]');
            let second = document.querySelector('[data-seconds]');

            if (timer <= 0) {
                  clearInterval(intervalId);
                  startBtn.disabled = true;
                  input.disabled = false;
                  return;
            }
            day.textContent = currentTime.days;
            hour.textContent = currentTime.hours;
            minute.textContent = currentTime.minutes;
            second.textContent = currentTime.seconds;

      }, 1000)
}