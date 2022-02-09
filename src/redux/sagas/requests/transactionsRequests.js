const URL = "https://expense-tracker77.herokuapp.com/user/getExpense"

export const fetchTransactions = (query) => {
    return fetch(
        URL+query,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        },
    ).then((res) => {
        console.log("Res",res.status);
        if(res.status===404)
        {
            throw {message:"404"}
        }
        return res.json();
    }).catch(e => {
        console.log("e",e);
        throw e;
    })
}