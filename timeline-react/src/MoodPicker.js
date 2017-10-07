import React from 'react'
import moods from './data/static/moods'
import MoodIcon from './MoodIcon'

class MoodPicker extends React.Component {

  onClick(e, mood) {
    e.preventDefault()
    if (typeof this.props.onClick === `function`) {
      this.props.onClick(mood)
    }
  }

  render() {
    return (
      <section className="mood-grid">
        <h2 className="section-title">Mood</h2>
        {moods.all.map(mood => {
          return <a key={mood.name} href="" className="mood-link" onClick={(e) => this.onClick(e, mood)}>
            <MoodIcon mood={mood} />
          </a>
        })}
      </section>
    )
  }

}

export default MoodPicker
