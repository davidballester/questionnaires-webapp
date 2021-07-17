import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
})

export const Layout = ({ title, subtitle, children }) => {
  const styles = useStyles()
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box paddingTop={2} paddingBottom={2}>
          {children}
        </Box>
      </Container>
    </>
  )
}
