import React, { useReducer, useContext, createContext } from 'react'

const initialState = {
  phase: 'chooseQuestionnaire',
  questionnaire: undefined,
}
const Context = createContext()
const Dispatch = createContext()
const reducer = (state, action) => {
  switch (action.type) {
    case 'setPhase': {
      return {
        ...state,
        phase: action.payload,
      }
    }
    case 'setQuestionnaire': {
      return {
        ...state,
        questionnaire: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  )
}

const useState = () => {
  const state = useContext(Context)
  if (state === undefined) {
    throw new Error('function called outside of a SessionProvider')
  }
  return state
}

export const usePhase = () => {
  const state = useState()
  return state.phase
}

const useDispatch = () => {
  const dispatch = useContext(Dispatch)
  if (dispatch === undefined) {
    throw new Error('function called outside of a SessionProvider')
  }
  return dispatch
}

export const useSetPhase = () => {
  const dispatch = useDispatch()
  return (newPhase) => {
    dispatch({
      type: 'setPhase',
      payload: newPhase,
    })
  }
}

export const useChooseQuestionnaire = () => {
  const dispatch = useDispatch()
  const setPhase = useSetPhase()
  return (questionnaire) => {
    dispatch({
      type: 'setQuestionnaire',
      payload: questionnaire,
    })
    setPhase('questionnaire')
  }
}

export const useQuestionnaire = () => {
  const state = useState()
  return state.questionnaire
}
