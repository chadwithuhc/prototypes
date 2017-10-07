import React from 'react'
import moods from './data/static/moods'

function MoodIcon(props) {
  const mood = props.mood || moods.all.find(mood => mood.name === props.name) || { name: `unknown`, emoji: `❔` }

  return (
    <span className={`mood mood--${mood.name}`}>{mood.emoji}<span className="mood__label">{mood.name}</span></span>
  )
}

export default MoodIcon
