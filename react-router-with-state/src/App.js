import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { PropsRoute } from 'react-router-with-props'
import List from './components/List'
import Single from './components/Single'
import AddItem from './components/AddItem'
import data from './data/data'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: data.seeds
    }
  }

  // Call this via `this.props.updateAppState(state)` whenever we want to make changes
  // See `AddItem.js` for how to update state properly
  updateAppState = (state) => {
    this.setState(state)
  }

  render() {
    return (
      <Router>
        <main>
          <PropsRoute path="/" component={List} items={this.state.items} updateAppState={this.updateAppState} />
          <PropsRoute path="/" component={AddItem} items={this.state.items} updateAppState={this.updateAppState} />
          <PropsRoute exact path="/items/:id" component={Single} items={this.state.items} updateAppState={this.updateAppState} />
        </main>
      </Router>
    );
  }
}

export default App
