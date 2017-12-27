import React, { Component } from 'react'
import DATA from './data'
import store from './data/store'
import Entry from './data/entry'
import MoodPicker from './MoodPicker'
import MoodIcon from './MoodIcon'
import TagInput from './TagInput'
import TagChanger from './TagChanger'
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
    if (window.confirm(`This will delete the post`)) {
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
    return Entry.update(updatedPost.id, updatedPost)
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

  toggleMoodChanger(entry) {
    if (this.state.moodChangingOnId) {
      this.closeMoodChanger()
      return
    }

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
    this.updatePost(entry).then(x => {
      this.closeMoodChanger()
    })
  }

  launchTagChanger(entry, tag, i) {
    this.setState({
      tagChanging: {
        entry,
        tag,
        i
      }
    })
  }

  closeTagChanger() {
    this.setState({
      tagChanging: null
    })
  }

  previewUpdateTags(tags, tagsRaw) {
    // Nothing for now, thanks
    // this.setState({
    //   tagChanging: {
    //     ...this.state.tagChanging,
    //     entry: {
    //       ...this.state.tagChanging.entry,
    //       tags,
    //       tagsRaw
    //     }
    //   }
    // })
  }

  updateTags = (entry, tags, tagsRaw) => {
    entry.tags = tags
    entry.tagsRaw = tagsRaw
    this.updatePost(entry).then(x => {
      this.closeTagChanger()
    })
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
          let tagChanger = null

          if (this.state.moodChangingOnId && this.state.moodChangingOnId === entry.id) {
            moodChanger = <MoodPicker onClick={(mood) => this.updateMood(entry, mood)} value={entry.mood}></MoodPicker>
          }

          if (!!this.state.tagChanging && this.state.tagChanging.entry.id === entry.id) {
            tagChanger = <TagChanger {...this.state.tagChanging} onChange={(tags, rawTags) => this.previewUpdateTags(tags, rawTags)} onSave={(tags, tagsRaw) => this.updateTags(entry, tags, tagsRaw)} onCancel={() => this.closeTagChanger()} />
          }

          return (
            <article key={entry.id} className="timeline-item">

              <time className="timeline-item__time">{this.getTime(entry)}</time>
              <a className="timeline-item__mood" onDoubleClick={() => this.toggleMoodChanger(entry)} onTouchStart={() => this.toggleMoodChanger(entry)}>
                <MoodIcon name={entry.mood} />
              </a>
              <section className="timeline-item__content">
                {moodChanger}
                {!tagChanger && entry.tags.map((tag, i) => {
                  return (
                    <button key={tag} className="timeline-item__tag button" onDoubleClick={(e) => this.launchTagChanger(entry, tag, i)} onTouchStart={(e) => this.launchTagChanger(entry, tag, i)}>{tag}</button>
                  )
                })}
                {tagChanger}
                <button className="timeline-item__tag button button--delete" onClick={(e) => this.delete(e, entry)}> <div className="fa fa-times"></div></button>
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
