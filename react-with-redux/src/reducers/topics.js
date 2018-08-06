const reducer = (state = [], action) => {
  switch (action.type) {
    case reducer.FETCH_DATA:
      return [
        { name: 'CSS' },
        { name: 'AJAX' }
      ]
    case reducer.FETCH_NEW_DATA:
      return [
        ...state,
        { name: 'HTML' },
        { name: 'GraphQL' }
      ]
    case reducer.SET_DATA:
      return action.payload
    default:
      return state
  }
}

reducer.FETCH_DATA = 'FETCH_DATA'
reducer.FETCH_NEW_DATA = 'FETCH_NEW_DATA'
reducer.fetchNewData = () => ({
  type: reducer.FETCH_NEW_DATA
})
reducer.fetch = () => {
  return (dispatch) => {
    fetch(`https://galvanize-definitions-api.herokuapp.com/topics`)
      .then(res => res.json())
      .then(topics => dispatch(reducer.setData(topics)))
  }
}
reducer.SET_DATA = 'SET_DATA'
reducer.setData = (payload) => ({
  type: reducer.SET_DATA,
  payload
})

export default reducer
