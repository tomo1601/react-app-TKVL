import axios from "axios";

const SetAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['Authortization'] = `Beaner ${token}`
    }
    else {
        delete  axios.defaults.headers.common['Authortization']
    }
}

export default SetAuthToken