import React from 'react'
import data from '../data/data'

class AddItem extends React.Component {

  onSubmit = (e) => {
    e.preventDefault()

    const newItem = {
      id: data.uid(),
      name: this.refs.name.value
    }

    this.props.updateAppState({
      items: this.props.items.concat(newItem)
    })

    this.refs.name.value = ``
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Add Item</legend>
          <input ref="name" type="text" />
          <button>Add Item</button>
        </fieldset>
      </form>
    )
  }

}

export default AddItem
