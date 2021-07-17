import React from 'react'
import { useQuestionnaire } from './SessionContext'
import { QuestionnaireProvider } from './QuestionnaireContext'
import { Questionnaire } from './Questionnaire'

export const QuestionnairePhase = () => {
  const questionnaire = useQuestionnaire()
  if (!questionnaire) {
    return <React.Fragment />
  }
  return (
    <QuestionnaireProvider questionnaire={questionnaire}>
      <Questionnaire />
    </QuestionnaireProvider>
  )
}
