# React Router with State

> Using React Router and `react-router-with-props` as a simple state management / replacement for Redux

No live demo. Feel free to look around [le source](https://github.com/chadwithuhc/prototypes/tree/master/react-router-with-state)

## Intro

If you don't know Redux yet, it's worthwhile to set up at least once to understand the flow. If you want to put up a quick project, this project is to demo how you can accomplish it with `react-router-with-props`.

## How

We're going to set our state in the top-level component (`App.js`) and pass it down to all components through `<PropsRoute someProp={this.state.someProp} />`.

This could also be structured using anonymous functions for the `component` attribute.
