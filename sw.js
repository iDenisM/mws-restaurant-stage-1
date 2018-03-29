if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./swcontroller.js')
    .then((registration) => {

    })
    .catch((err) => {
      console.log('SW failed to register', err);
    })
}
