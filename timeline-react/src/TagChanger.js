import React from 'react'

class TagChanger extends React.Component {

  componentDidMount() {
    this.refs.input.focus()
  }

  onChange = (e) => {
    if (typeof this.props.onChange === `function`) {
      const tagsRaw = this.refs.input.value
      const tagsArray = this.generateTagsArray(tagsRaw)

      this.props.onChange(tagsArray, tagsRaw)
    }
  }

  onSave = (e) => {
    e.preventDefault()

    if (typeof this.props.onSave === `function`) {
      const tagsRaw = this.refs.input.value
      const tagsArray = this.generateTagsArray(tagsRaw)

      this.props.onSave(tagsArray, tagsRaw)
    }
  }

  onInputFocus = (e) => {
    // If it doesn't end with a comma space, add it
    if (!/,\s+$/.test(this.refs.input.value)) {
      this.refs.input.value += `, `
    }
  }

  onKeyPress = (e) => {
    // Enter
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault()
      this.refs.saveBtn.click()
      return
    }
  }

  onKeyUp = (e) => {
    // Esc (only works on keyUp)
    if (e.keyCode === 27 || e.which === 27) {
      e.preventDefault()
      this.onCancel()
      return
    }
  }

  onCancel = (e) => {
    if (typeof this.props.onCancel === `function`) {
      this.props.onCancel()
    }
  }

  generateTagsArray(tagsRaw) {
    return tagsRaw.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
  }

  toggleTag(tag, i) {
    const tagsRaw = this.refs.input.value
    const newTags = this.generateTagsArray(tagsRaw)

    // Remove tag if match exists
    if (newTags[i] === tag) {
      newTags.splice(i, 1)
      this.refs.input.value = newTags.join(', ')
    }
    // Add tag back if no match exists
    else {
      newTags.splice(i, 0, tag)
      this.refs.input.value = newTags.join(', ')
    }

    this.onChange()
  }

  render() {
    const { entry } = this.props

    return (
      <form ref="form" onSubmit={this.onSave}>
        {entry.tags.map((tag, i) => {
          return (
            <button type="button" key={tag} className="timeline-item__tag button" onClick={() => this.toggleTag(tag, i)}>{tag}</button>
          )
        })}
        <h2 className="section-title">Tags</h2>
        <textarea ref="input" onChange={this.onChange} className="full-input" defaultValue={entry.tagsRaw} onFocus={this.onInputFocus} onKeyUp={this.onKeyUp} onKeyPress={this.onKeyPress}></textarea>
        <button type="button" className="button button--cancel" onClick={this.onCancel}>Cancel</button>
        <button ref="saveBtn" type="submit" className="button button--submit">SAVE</button>
      </form>
    )
  }

}

TagChanger.defaultProps = {
  entry: {},
  tag: ``,
  i: -1,
  onChange: null,
  onSave: null,
  onCancel: null
}

export default TagChanger
