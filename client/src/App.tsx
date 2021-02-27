import { FC } from 'react'

import AppRouter from './Router'
import Navigation from './components/Navigation'

const App: FC = () => {
  return (
    <Navigation>
      <AppRouter />
    </Navigation>
  )
}

export default App
