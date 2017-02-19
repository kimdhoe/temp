import React from 'react'
import ReactDOM from 'react-dom' 
import { AppContainer } from 'react-hot-loader'

import { Provider } from 'react-redux'

import configureStore from './store'
import reducer from './reducer'
import MyApp from './MyApp'

const store = configureStore(reducer)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <MyApp />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(MyApp)

if (module.hot) {
  module.hot.accept('./MyApp', () => {
    render(MyApp)
  })
}
