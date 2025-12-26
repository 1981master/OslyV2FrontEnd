import { applyMiddleware, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { thunk } from 'redux-thunk'
import logger from '../middleware/logger'
import { rootReducer } from './reducers/rootReducer'

/* ------------------ STORE ------------------ */

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk, // async logic
        apiMiddleware, // RSAA
        logger, // debug logger
    ),
)

const middlewares = [thunk, apiMiddleware]
// Enable logger only in development
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

export default store
