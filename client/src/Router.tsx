import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import Category from './pages/Category'
import Home from './pages/Home'

const Router: FC = () => {
  return (
    <Switch>
      <Route component={Category} path='/category/:category' />
      <Route component={Home} path='/' />
    </Switch>
  )
}

export default Router