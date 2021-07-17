import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { questionnaires } from './questionnaires'
import { useChooseQuestionnaire } from './SessionContext'

export const ChooseQuestionnaire = () => {
  const chooseQuestionnaire = useChooseQuestionnaire()
  return (
    <List component="nav" aria-label="cuestionarios">
      {questionnaires.map((questionnaire) => (
        <ListItem
          button
          key={questionnaire.name}
          onClick={() => chooseQuestionnaire(questionnaire)}
        >
          <ListItemText primary={questionnaire.name} />
        </ListItem>
      ))}
    </List>
  )
}
