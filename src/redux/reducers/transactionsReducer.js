import * as types from '../../types'


const initialState = {
    records: [],
    error: null,
    loading: false
}
export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TRANSACTIONS_REQUESTED:
            return { ...state, loading: true }
        case types.GET_TRANSACTIONS_SUCCESS:
            return { ...state, loading: false, records: action.records }
        case types.GET_TRANSACTIONS_FAILED:
            return { ...state, loading: false, error: action.error ,records:action.records}
        default:
            return { ...state };

    }

}