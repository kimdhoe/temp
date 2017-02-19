import { createStore } from 'redux'

const configureStore = reducer =>
  createStore(reducer)

export default configureStore
