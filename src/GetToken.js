export const GetToken=()=>{
    if(localStorage.getItem('token'))
    {
        return true;
    }
    else
    {
        return false;
    }
}