if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      console.log('Service Worker has been registered', registration.scope);
    }, function (err) {
      console.log('Service Worker registration failed', err);
    })
}
