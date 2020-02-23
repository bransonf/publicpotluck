import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

// initializes the redux store for app
export const configureStore = () => {
  
  const store = createStore(
    reducers,
    compose (
      applyMiddleware(thunk),
      // this code enables redux devtools
   //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  return store
}
