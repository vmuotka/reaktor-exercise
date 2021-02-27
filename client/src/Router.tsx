import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import Category from './pages/Category'

const Router: FC = () => {
  return (
    <Switch>
      <Route component={Category} path='/category/:category' />
    </Switch>
  )
}

export default Router