import API from '../Services/Api.js';
import { useState } from 'react'


const article = {
    "email": "moises@teste.com.br",
    "password": "12345"
};

function Authentication() {
    const [user, setUser] = useState();
    API.post("auth/login", article).then((response) => setUser(response.data))
    
    console.log(user?.data.access_token)
}

export default Authentication()