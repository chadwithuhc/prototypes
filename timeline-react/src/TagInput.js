import React from 'react'

class TagInput extends React.Component {

  onChange = (e) => {
    const tagsRaw = this.refs.input.value
    const tagsArray = tagsRaw.split(',').map(tag => tag.trim()).filter(tag => tag !== '')

    if (typeof this.props.onChange === `function`) {
      this.props.onChange(tagsArray, tagsRaw)
    }
  }

  render() {
    return (
      <section>
        <h2 className="section-title">Tags</h2>
        <textarea ref="input" onChange={this.onChange} className="full-input" value={this.props.valueRaw}></textarea>
      </section>
    )
  }

}

TagInput.defaultProps = {
  value: [],
  valueRaw: ``
}

export default TagInput
