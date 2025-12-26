import { applyMiddleware, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { thunk } from 'redux-thunk'
import { rootReducer } from './reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk, apiMiddleware))

export default store
