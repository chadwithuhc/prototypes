import React, { Component } from 'react'
import DATA from './data'
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
      await DATA.entries.map(entry => {
        return Entry.create(entry)
      })
    }

    this.setState({
      entries: await store.findAll(Entry.name)
    })
  }

  componentDidMount() {
    store.on('all', (action, name, data) => {

      if (action === `afterDestroy`) {
        store.getCollection(name).remove(data)
      }

      console.log(action, name, data)
      console.log(store.getAll(name))
      this.setState({
        entries: store.getAll(name)
      })
    })
  }

  delete(e, entry) {
    e.preventDefault()
    Entry.destroy(entry.id)
  }

  render() {
    return (
      <section className="timeline">
        <article className="timeline-item timeline-item--add">
          <time className="timeline-item__time">Now</time>
          <section className="timeline-item__content">
            <a href="" className="link-list__item" data-location>Add Location</a><br/>
            <a href="" className="link-list__item">Add Tags</a><br/>
            <a href="" className="link-list__item">Add Description</a>
          </section>
        </article>

        {this.state.entries.map((entry) => {
          return (
            <article key={entry.id} className={`timeline-item timeline-item--mood-${entry.mood}`}>

              <time className="timeline-item__time">{entry.time}</time>
              <section className="timeline-item__content">
                <p className="timeline-item__location">{entry.location}</p>
                <a href="" className="timeline-item__tag" onClick={(e) => this.delete(e, entry)}>X</a>
                {entry.tags.map(tag => {
                  return (
                    <a href="" key={tag} className="timeline-item__tag">{tag}</a>
                  )
                })}
                <p className="timeline-item__description">
                  {entry.description}
                </p>
              </section>
            </article>
          )
        })}
      </section>
    )
  }
}

export default App
