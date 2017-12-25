import React, { Component } from 'react'
import DATA from './data'
import store from './data/store'
import Entry from './data/entry'
import MoodPicker from './MoodPicker'
import MoodIcon from './MoodIcon'
import TagInput from './TagInput'
import moment from 'moment'
import moods from './data/static/moods'

// DEBUG: Seeding
const SEED = false

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      newEntry: {
        mood: moods.default
      }
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
        entries: store.filter(name, { orderBy: [[`timestamp`, `DESC`]] })
      })
    })
  }

  delete(e, entry) {
    e.preventDefault()
    if (window.confirm(`Are you sure?`)) {
      Entry.destroy(entry.id)
    }
  }

  onSave = (e) => {
    e.preventDefault()

    Entry.create({
      ...this.state.newEntry,
      mood: this.state.newEntry.mood.name,
      description: this.refs.description.value,
      timestamp: moment().valueOf()
    }).then(newEntry => {
      this.setState({
        newEntry: {
          mood: moods.default,
          tags: [],
          tagsRaw: '',
          description: ''
        }
      })
    })
  }

  updatePost = (updatedPost) => {
    Entry.update(updatedPost.id, updatedPost).then(updatedEntry => {
      this.closeMoodChanger()
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

  getTime = ({ timestamp }) => {
    return moment(timestamp, 'x').calendar().replace(` at `, `\n`)
  }

  launchMoodChanger(entry) {
    this.setState({
      moodChangingOnId: entry.id
    })
  }

  closeMoodChanger() {
    this.setState({
      moodChangingOnId: null
    })
  }

  updateMood = (entry, mood) => {
    entry.mood = mood.name
    this.updatePost(entry)
  }

  render() {
    return (
      <section className="timeline">
        <article className="timeline-item timeline-item--add">
          <time className="timeline-item__time">Now</time>
          <a className="timeline-item__mood">
            <MoodIcon mood={this.state.newEntry.mood} />
          </a>
          <section className="timeline-item__content">
            <MoodPicker onClick={this.chooseMood} value={this.state.newEntry.mood}></MoodPicker>
            {/* <a href="" className="link-list__item" data-location>Add Location</a><br/> */}
            <TagInput onChange={this.setTags} value={this.state.newEntry.tags} valueRaw={this.state.newEntry.tagsRaw}></TagInput>
            <section>
              <h2 className="section-title">Description</h2>
              <textarea ref="description" className="full-input" value={this.state.newEntry.description}></textarea>
            </section>
            <button className="button button--submit" onClick={this.onSave}>SAVE</button>
          </section>
        </article>

        {this.state.entries.map((entry) => {
          let moodChanger = null

          if (this.state.moodChangingOnId && this.state.moodChangingOnId === entry.id) {
            moodChanger = <MoodPicker onClick={(mood) => this.updateMood(entry, mood)} value={entry.mood}></MoodPicker>
          }

          return (
            <article key={entry.id} className="timeline-item">

              <time className="timeline-item__time">{this.getTime(entry)}</time>
              <a className="timeline-item__mood" onDoubleClick={() => this.launchMoodChanger(entry)}>
                <MoodIcon name={entry.mood} />
              </a>
              <section className="timeline-item__content">
                {moodChanger}
                {entry.tags.map(tag => {
                  return (
                    <a href="" key={tag} className="timeline-item__tag">{tag}</a>
                  )
                })}
                <a href="" className="timeline-item__tag" onClick={(e) => this.delete(e, entry)}>X</a>
                <p className="timeline-item__location">{entry.location}</p>
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
