const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      //console.log(state.good)
      //const goodValue = state.good + 1
      const chengedStateGood = {
        ...state,
        good: state.good + 1,
      }
      return chengedStateGood
    case 'OK':
      const chengedStateOk = {
        ...state,
        ok: state.good + 1,
      }
      return chengedStateOk
    case 'BAD':
      const chengedStateBad = {
        ...state,
        bad: state.good + 1,
      }
      return chengedStateBad
    case 'ZERO':
      const chengedStateZero = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return chengedStateZero
    default: return state
  }
  
}

export default counterReducer