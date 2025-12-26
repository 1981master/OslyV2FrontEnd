import { productState } from '../states/productState'

export default function productReducer(state = productState, action) {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true, check: 'is Checking' }

        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                loading: false,
                data: action.payload,
                error: null,
                check: 'Check is done Products has been loaded...',
            }

        case 'FETCH_PRODUCTS_FAILURE':
            return { loading: false, data: [], error: action.payload }

        default:
            return state
    }
}
