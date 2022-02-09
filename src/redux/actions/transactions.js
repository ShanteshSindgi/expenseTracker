import * as types from '../../types'

export const getTransactions=(payload)=>{
    return ({
        type:types.GET_TRANSACTIONS_REQUESTED,
        payload:payload
    })
}