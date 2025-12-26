const initialState = {
    loading: false,
    data: [],
    error: null,
}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true }

        case 'FETCH_PRODUCTS_SUCCESS':
            return { loading: false, data: action.payload, error: null }

        case 'FETCH_PRODUCTS_FAILURE':
            return { loading: false, data: [], error: action.payload }

        default:
            return state
    }
}
