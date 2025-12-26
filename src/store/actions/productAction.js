import { RSAA } from 'redux-api-middleware'
import { getProducts } from '../../service/api'
import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
} from './types'

export const fetchProducts = () => ({
    [RSAA]: {
        endpoint: getProducts(),
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
            FETCH_PRODUCTS_REQUEST,
            FETCH_PRODUCTS_SUCCESS,
            FETCH_PRODUCTS_FAILURE,
        ],
    },
})
