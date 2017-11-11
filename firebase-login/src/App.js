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
