const initialState = {}
const tokenReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SAVETOKEN':
      return {...state, token: action.payload}
    default:
      return state
  }
}

export default tokenReducer