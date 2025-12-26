import { RSAA } from 'redux-api-middleware'

export const fetchProducts = () => ({
    [RSAA]: {
        endpoint: 'http://localhost:8080/api/products',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
            'FETCH_PRODUCTS_REQUEST',
            'FETCH_PRODUCTS_SUCCESS',
            'FETCH_PRODUCTS_FAILURE',
        ],
    },
})
