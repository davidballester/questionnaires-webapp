import React from 'react'
import { usePhase } from './SessionContext'
import { ChooseQuestionnairePhase } from './ChooseQuestionnairePhase'
import { QuestionnairePhase } from './QuestionnairePhase'

export const Phase = () => {
  const phase = usePhase()
  switch (phase) {
    case 'chooseQuestionnaire': {
      return <ChooseQuestionnairePhase />
    }
    case 'questionnaire': {
      return <QuestionnairePhase />
    }
    default: {
      return <h1>TODO</h1>
    }
  }
}
