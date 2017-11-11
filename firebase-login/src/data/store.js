import { DataStore } from 'js-data'
// import { LocalStorageAdapter } from 'js-data-localstorage'
import { FirebaseAdapter } from 'js-data-firebase'

window.firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
})

const store = new DataStore()
const adapter = new FirebaseAdapter({
  db: window.firebase.database()
})

store.registerAdapter('firebase', adapter, { default: true })

export default store
