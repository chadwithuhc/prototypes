import React, { Component } from 'react'
import DATA from './data'
import store from './data/store'
import Entry from './data/entry'
import MoodPicker from './MoodPicker'
import TagInput from './TagInput'

// DEBUG: Seeding
const SEED = false

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      newEntry: {}
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
      if (action === `afterCreate`) {
        store.getCollection(name).add(data)
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

  onSave = (e) => {
    e.preventDefault()

    Entry.create({
      ...this.state.newEntry,
      description: this.refs.description.value
    }).then(newEntry => {
      this.setState({
        newEntry: {
          mood: '',
          tags: [],
          tagsRaw: '',
          description: ''
        }
      })
    })
  }

  chooseMood = (mood) => {
    this.setState({
      newEntry: {
        ...this.state.newEntry,
        mood
      }
    })
  }

  setTags = (tags, tagsRaw) => {
    this.setState({
      newEntry: {
        ...this.state.newEntry,
        tags,
        tagsRaw
      }
    })
  }

  render() {
    return (
      <section className="timeline">
        <article className="timeline-item timeline-item--add">
          <time className="timeline-item__time">Now</time>
          <section className="timeline-item__content">
            <MoodPicker onClick={this.chooseMood} value={this.state.newEntry.mood}></MoodPicker>
            {/* <a href="" className="link-list__item" data-location>Add Location</a><br/> */}
            <TagInput onChange={this.setTags} value={this.state.newEntry.tags} valueRaw={this.state.newEntry.tagsRaw}></TagInput>
            <section>
              <h2 className="section-title">Description</h2>
              <textarea ref="description" className="full-input" value={this.state.newEntry.description}></textarea>
            </section>
            <a href="" className="link-list__item" onClick={this.onSave}>SAVE</a>
          </section>
        </article>

        {this.state.entries.map((entry) => {
          return (
            <article key={entry.id} className="timeline-item">

              <time className={`timeline-item__time mood--${entry.mood}`}>{entry.time}</time>
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
