/**
* @describe Registering a serviceWorker
*/
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then((reg) => console.log(`Service Worker's Registration was successful! :)`))
  .catch(err => console.log(`Registration failed due to ${err} :(`));
}
