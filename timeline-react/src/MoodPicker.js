import React from 'react'

const moods = [
  'happy', 'sad', 'whatever', 'tired'
]

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
        {moods.map(mood => {
          return <a key={mood} href="" className={`mood--${mood}`} onClick={(e) => this.onClick(e, mood)}><span className="mood__label">{mood}</span></a>
        })}
      </section>
    )
  }

}

export default MoodPicker
