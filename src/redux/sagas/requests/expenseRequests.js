const URL = "https://expense-tracker77.herokuapp.com/user/addexpense";
export const addExpenseCall = (payload) => {
    console.log("yoooooooooooooooooooo",payload);
    return fetch(
        URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(payload)

        },
    ).then((res) => {
        return res;
    }).catch((e) => {
        console.log("e", e);
        throw e;
    })
}