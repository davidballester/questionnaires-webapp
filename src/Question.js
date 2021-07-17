import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Button,
  Box,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useMarkAsSuccesful, useMarkAsFailed } from './QuestionnaireContext'

export const Question = ({ question, selectedOption: selectedOptionProp }) => {
  const isReviewMode = selectedOptionProp != null
  const [selectedOption, setSelectedOption] = useState(selectedOptionProp)
  const markAsSuccessful = useMarkAsSuccesful()
  const markAsFailed = useMarkAsFailed()
  const isDone = selectedOption != null
  const isCorrect = isDone && selectedOption === question.correctOption
  const onNextClick = () => {
    setSelectedOption(null)
    isCorrect ? markAsSuccessful() : markAsFailed(selectedOption)
  }
  return (
    <Box paddingTop={2}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="p">
            {question.text}
          </Typography>
          <List aria-label="opciones">
            {question.options.map((option, index) => (
              <Option
                key={option}
                text={option}
                index={index}
                highlight={(() => {
                  if (!isDone) {
                    return undefined
                  }
                  const isSelected = selectedOption === index
                  const isCorrect = question.correctOption === index
                  if (isSelected) {
                    return isCorrect ? 'success' : 'failed'
                  }
                  if (isCorrect) {
                    return 'success'
                  }
                  return undefined
                })()}
                onClick={!isDone ? () => setSelectedOption(index) : () => {}}
              />
            ))}
          </List>
        </CardContent>
      </Card>
      {!isReviewMode && (
        <Box paddingTop={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={!isDone}
            size="large"
            fullWidth={true}
            onClick={onNextClick}
          >
            Siguiente
          </Button>
        </Box>
      )}
    </Box>
  )
}

const Option = ({ text, index, highlight, onClick }) => {
  const optionStyles = useSelectedOptionStyles(highlight)
  return (
    <ListItem button onClick={onClick} className={optionStyles.root}>
      <ListItemIcon>
        <OptionLetter index={index} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

const useCorrectOptionStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.light,
    },
  },
}))
const useIncorrectOptionStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.error.main,
    '&:hover': {
      background: theme.palette.error.light,
    },
  },
}))
const useDefaultOptionStyles = makeStyles({ root: {} })

const useSelectedOptionStyles = (highlight) => {
  const correctOptionStyles = useCorrectOptionStyles()
  const incorrectOptionStyles = useIncorrectOptionStyles()
  const defaultOptionStyles = useDefaultOptionStyles()
  if (!highlight) {
    return defaultOptionStyles
  }
  return highlight === 'success' ? correctOptionStyles : incorrectOptionStyles
}

const OptionLetter = ({ index }) => {
  const letter = useLetter(index)
  return (
    <Typography variant="h5" component="span">
      {letter}
    </Typography>
  )
}

const useLetter = (index) => {
  return ['A', 'B', 'C', 'D'][index]
}
