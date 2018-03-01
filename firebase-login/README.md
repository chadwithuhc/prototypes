# Firebase Login App

> A sample React app using Firebase AuthUI and js-data

No live demo. Feel free to look around [le source](https://github.com/chadwithuhc/prototypes/tree/master/firebase-login)

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

### Add authentication
- Enable Google auth in firebase
- Add firebase UI https://github.com/firebase/FirebaseUI-Web#installation
- Update firebase database rules

```
{
  "rules": {
    ".read": "false || auth != null",
    ".write": "false || auth != null",
    "entry": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Next

- TRY https://stackoverflow.com/questions/30910704/how-do-i-link-each-user-to-their-data-in-firebase
