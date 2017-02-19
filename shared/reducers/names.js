const STATE = [
  'aaa',
  'bbb',
  'ccc'
]

const names = (state = STATE, action) => {
  switch (action.type) {
    case 'RECEIVE_NAMES':
      return action.names
    case 'ADD_NAME':
      return [ ...state, action.name ]
    case 'REMOVE_NAME':
      return state.filter((name, i) => i !== action.id)
    default:
      return state
  }
}

export default names
