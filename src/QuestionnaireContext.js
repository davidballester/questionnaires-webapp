import React, { useReducer, useContext, createContext } from 'react'

const initialState = {
  questionnaire: undefined,
  questionIndex: 0,
  failedQuestions: [],
}
const Context = createContext()
const Dispatch = createContext()
const reducer = (state, action) => {
  switch (action.type) {
    case 'markAsSuccessful': {
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
      }
    }
    case 'markAsFailed': {
      const failedQuestion = {
        question: state.questionnaire.content[state.questionIndex],
        selectedOption: action.payload,
      }
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        failedQuestions: [...state.failedQuestions, failedQuestion],
      }
    }
    default: {
      return state
    }
  }
}

export const QuestionnaireProvider = ({ questionnaire, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    questionnaire,
  })
  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  )
}

const useState = () => {
  const state = useContext(Context)
  if (state === undefined) {
    throw new Error('function called outside of a QuestionnaireProvider')
  }
  return state
}

export const useQuestionnaire = () => {
  const state = useState()
  return state.questionnaire
}

export const useCurrentQuestionIndex = () => {
  const state = useState()
  return state.questionIndex
}

export const useCurrentQuestion = () => {
  const state = useState()
  return state.questionnaire.content[state.questionIndex]
}

export const useCorrectQuestionsCount = () => {
  const questionsCount = useQuestionsCount()
  const failedQuestions = useFailedQuestions()
  return questionsCount - failedQuestions.length
}

export const useQuestionsCount = () => {
  const state = useState()
  const questionnaire = state.questionnaire
  if (!questionnaire) {
    return 0
  }
  return questionnaire.content.length
}

export const useFailedQuestions = () => {
  const state = useState()
  return state.failedQuestions
}

const useDispatch = () => {
  const dispatch = useContext(Dispatch)
  if (dispatch === undefined) {
    throw new Error('function called outside of a QuestionnaireProvider')
  }
  return dispatch
}

export const useMarkAsSuccesful = () => {
  const dispatch = useDispatch()
  return () => {
    dispatch({
      type: 'markAsSuccessful',
    })
  }
}

export const useMarkAsFailed = () => {
  const dispatch = useDispatch()
  return (selectedOption) => {
    dispatch({
      type: 'markAsFailed',
      payload: selectedOption,
    })
  }
}
