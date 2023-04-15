import Notiflix from "notiflix";

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        } else {
        reject({ position, delay });
        }
      }, delay);
    });
  }

function handleSubmit(event) {
  event.preventDefault();
  
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);
    
  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const currentDelay = delay + i * step;
    createPromise(position, currentDelay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}