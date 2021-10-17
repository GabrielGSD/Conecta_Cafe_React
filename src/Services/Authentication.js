import API from '../Services/Api.js';


const dataAuthentication = {
    "email": "moises@teste.com.br",
    "password": "12345"
};

function Authentication() {
    // const [user, setUser] = useState();
    API.post("auth/login", dataAuthentication).then(
        async response => {
            await localStorage.setItem('token', response.data.data.access_token)
        }, error => {
            console.log(error)
        })


    if (localStorage.getItem('token')) {
        API.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }

    // Requisição de teste 
    // API
    //     .get("/farm/c43ecfab-69f0-46bd-aa38-4af3796350cf")
    //     .then((response) => console.log(response.data.data.farm_name))
    //     .catch((err) => {
    //         console.error("ops! ocorreu um erro" + err);
    //     });
}

export default Authentication