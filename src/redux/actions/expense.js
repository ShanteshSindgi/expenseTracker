import {ADD_EXPENSE_REQUESTED, RESET_EXPENSE} from '../../types'
export const AddExpense=(payload)=>{
    return({
        type:ADD_EXPENSE_REQUESTED,
        payload:payload
    })
}

export const ResetExpense=()=>{
    return({
        type:RESET_EXPENSE,
    })
}