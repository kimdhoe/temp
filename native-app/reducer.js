import { combineReducers } from 'redux'

import { reducers } from '../shared/reducers'

const { names } = reducers

const reducer = combineReducers({ names })

export default reducer
