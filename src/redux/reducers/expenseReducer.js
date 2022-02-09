import * as types from './../../types'


const initialState={
    expenseStatus:null,
    loading:false,
    error:null

}
export const expenseReducer=(state=initialState,action)=>{
       switch(action.type)
       {
           case types.ADD_EXPENSE_REQUESTED:
               return {...state,loading:true,expenseStatus:null}
           case types.ADD_EXPENSE_SUCCESS:
               return {...state,loading:false,expenseStatus:action.expenseStatus}
           case types.ADD_EXPENSE_FAILED:
               return {...state,loading:false,error:action.message,expenseStatus:action.expenseStatus}
            case types.RESET_EXPENSE:
                state=undefined
           default:
               return {...state}
       }
}