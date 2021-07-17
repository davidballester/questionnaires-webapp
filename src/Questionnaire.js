import React from 'react'
import { Question } from './Question'
import { Summary } from './Summary'
import {
  useCurrentQuestion,
  useQuestionnaire,
  useCurrentQuestionIndex,
  useQuestionsCount,
} from './QuestionnaireContext'
import { Layout } from './Layout'

export const Questionnaire = () => {
  const questionnaire = useQuestionnaire()
  const currentQuestion = useCurrentQuestion()
  const counter = useCounter()
  return (
    <Layout title={questionnaire.name} subtitle={counter}>
      {!currentQuestion && <Summary />}
      {!!currentQuestion && <Question question={currentQuestion} />}
    </Layout>
  )
}

const useCounter = () => {
  const questionsCount = useQuestionsCount()
  const currentQuestionIndex = useCurrentQuestionIndex()
  if (!questionsCount) {
    return ''
  }
  return currentQuestionIndex < questionsCount
    ? `(${currentQuestionIndex + 1}/${questionsCount})`
    : ''
}
