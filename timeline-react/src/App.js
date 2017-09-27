import React, { Component } from 'react'
import DATA from './data'
import store from './data/store'
import Entry from './data/entry'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: []
    }
    this.loadData()
  }

  async loadData() {
    // await Entry.create({
    //   time: '4:20a',
    //   tags: ['foobar']
    // })
    this.setState({
      entries: await store.findAll(Entry.name)
    })
  }

  componentDidMount() {
    Entry.on('all', (action, name, data) => {
      console.log(action, name, data)
      console.log(Entry)
      console.log(this.state.entries)
      console.log(store.getAll(Entry.name))
      // this.setState({
      //   entries: store.getAll(Entry.name)
      // })
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
