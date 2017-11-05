import React from 'react'

class Single extends React.Component {

  render() {
    const item = this.props.items.find(item => item.id === +this.props.match.params.id) || {}

    return (
      <section>
        {item.name}
      </section>
    )
  }
}

export default Single
