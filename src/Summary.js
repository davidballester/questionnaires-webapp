import { Typography, Button, Box } from '@material-ui/core'
import React from 'react'
import { Question } from './Question'
import {
  useCorrectQuestionsCount,
  useQuestionsCount,
  useFailedQuestions,
} from './QuestionnaireContext'
import { useSetPhase } from './SessionContext'

export const Summary = () => {
  const questionsCount = useQuestionsCount()
  const correctQuestionsCount = useCorrectQuestionsCount()
  const failedQuestions = useFailedQuestions()
  const setPhase = useSetPhase()
  return (
    <section>
      <Typography variant="h2" component="h1">
        Resumen
      </Typography>
      <Typography variant="h5" component="p">
        Has acertado
        <Typography variant="h4" component="span" color="primary">
          {` ${correctQuestionsCount} `}
        </Typography>
        de
        <Typography variant="h4" component="span" color="secondary">
          {` ${questionsCount} `}
        </Typography>
      </Typography>
      <Typography variant="h5" component="p">
        Estas son las preguntas que has fallado
      </Typography>
      <FailedQuestions questions={failedQuestions} />
      <Box paddingTop={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth={true}
          onClick={() => setPhase('chooseQuestionnaire')}
        >
          Selecciona un nuevo cuestionario
        </Button>
      </Box>
    </section>
  )
}

const FailedQuestions = ({ questions }) => (
  <>
    {questions.map(({ question, selectedOption }, index) => (
      <Question
        key={index}
        question={question}
        selectedOption={selectedOption}
      />
    ))}
  </>
)
