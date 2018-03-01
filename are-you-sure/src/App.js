import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <main>
        <fieldset className="button-revealer">
          <button name="submit" className="button-revealer__button">Delete</button>
          <label htmlFor="submit" className="button-revealer__label">Are you sure?</label>
        </fieldset>

        <fieldset className="button-revealer button-revealer--grow">
          <button name="submit" className="button-revealer__button">Delete</button>
          <label htmlFor="submit" className="button-revealer__label">Are you sure?</label>
        </fieldset>

        <fieldset className="button-revealer button-revealer--verbose hidden">
          <button name="submit" className="button-revealer__button"><span className="button-revealer__verbose-text">Yes</span><span className="button-revealer__verbose-text-start">Delete</span></button>
          <label htmlFor="submit" className="button-revealer__label">Are you sure?</label>
        </fieldset>
      </main>
    );
  }
}

export default App;
