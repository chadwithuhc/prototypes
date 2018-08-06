import React from 'react'
import { connect } from 'react-redux'
import Topic from './Topic'
import reducer from './reducers/topics'

const mapStateToProps = (state) => {
  return {
    topics: state.topics
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    fetchData() {
      dispatch({ type: reducer.FETCH_DATA })
    },
    fetchNewData() {
      dispatch(reducer.fetchNewData())
    },
    fetch() {
      dispatch(reducer.fetch())
    }
  }
}

class Topics extends React.Component {
  componentDidMount() {
    this.props.fetchData()
    this.props.fetchNewData()
    this.props.fetch()
  }
  render() {
    return (
      <section>
        <h2>Topics: {this.props.topics.length}</h2>
        <nav>
          {this.props.topics.map(topic => <Topic {...topic} />)}
        </nav>
      </section>
    )
  }
}

Topics.defaultProps = {
  topics: []
}

export default connect(mapStateToProps, mapActionsToProps)(Topics)
