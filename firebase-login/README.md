# Firebase Login App

## To connect to Firebase


### Create local app and add keys
- `create-react-app app-name`
- create `.env` with following contents
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
```
- create `.env.production` with same or new keys


### Create firebase app and update keys
- create new firebase app
- choose "Add Firebase to Web App"
- copy over keys to `.env` files
- add script to `index.html`

### Add firebase to packages
- `yarn add js-data js-data-firebase`

### Create new data files
- create `src/data` folder
- create `src/data/static` folder
- create `src/data/store.js` file with
```
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
```

- create `src/data/modelname.js` with contents
```
import store from './store'

export default store.defineMapper('modelname')
```

### Allow read / write access
- if a development project, open writing for all in Firebase
- Go to `Develop > Database`
- switch to `Rules` tab
- update permissions
