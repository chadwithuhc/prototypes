/* globals firebase, firebaseui */
import React, { Component } from 'react'
import { seeds } from './data/seeds'
import store from './data/store'
import Entry from './data/entry'

// DEBUG: Seeding
const SEED = false

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: []
    }

    this.loadData()
  }

  async loadData() {
    // Seed data
    if (SEED) {
      await seeds.map(entry => {
        return Entry.create(entry)
      })
    }

    await store.findAll(Entry.name)
  }

  componentDidMount() {
    // FirebaseUI config.
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig)
    ////////////////////////////////////////////////

    firebase.auth().onAuthStateChanged(function(user) {
      console.log({ user })
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
              // document.getElementById('sign-in-status').textContent = 'Signed in';
              // document.getElementById('sign-in').textContent = 'Sign out';
              // document.getElementById('account-details').textContent = JSON.stringify({
              //   displayName: displayName,
              //   email: email,
              //   emailVerified: emailVerified,
              //   phoneNumber: phoneNumber,
              //   photoURL: photoURL,
              //   uid: uid,
              //   accessToken: accessToken,
              //   providerData: providerData
              // }, null, '  ');
            });
          } else {
            // User is signed out.
            // document.getElementById('sign-in-status').textContent = 'Signed out';
            // document.getElementById('sign-in').textContent = 'Sign in';
            // document.getElementById('account-details').textContent = 'null';
          }
        }, function(error) {
          console.log(error);
        });

    store.on('all', (action, name, data) => {

      if (action === `afterDestroy`) {
        store.getCollection(name).remove(data)
      }
      if (action === `afterCreate`) {
        store.getCollection(name).add(data)
      }

      console.log(action, name, data)
      console.log(store.getAll(name))
      this.setState({
        entries: store.filter(name, { orderBy: [[`name`, `DESC`]] })
      })
    })
  }

  onSave = (e) => {
    e.preventDefault()

    Entry.create({
      name: this.refs.name.value
      // timestamp: moment().valueOf()
    }).then(newEntry => {
      this.setState({
        //
      })
    })
  }

  render() {
    return (
      <main>
        <h1>Entries</h1>
        <ul>
          {this.state.entries.map(entry => {
            return <li key={entry.name}>{entry.name}</li>
          })}
        </ul>
        <form onSubmit={this.onSave}>
          <input ref="name" type="text" />
          <button>Add</button>
        </form>
      </main>
    )
  }
}

export default App
