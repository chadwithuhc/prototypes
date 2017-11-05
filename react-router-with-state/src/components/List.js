import React from 'react'
import { Link } from 'react-router-dom'

class List extends React.Component {

  render() {
    return (
      <section>
        <ul>
          {this.props.items.map(item => {
            return (
              <li key={item.id}><Link to={`/items/${item.id}`}>{item.name}</Link></li>
            )
          })}
        </ul>
      </section>
    )
  }
}

List.defaultProps = {
  items: []
}

export default List
