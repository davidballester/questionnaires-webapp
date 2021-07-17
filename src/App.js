import React from 'react'
import { SessionProvider } from './SessionContext'
import { Phase } from './Phase'

const App = () => (
  <SessionProvider>
    <Phase />
  </SessionProvider>
)

export default App
