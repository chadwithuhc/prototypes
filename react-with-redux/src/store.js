import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import topics from './reducers/topics'

const reducers = combineReducers({
  topics
})

export default createStore(reducers, applyMiddleware(thunk))
