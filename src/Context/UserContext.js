import React from 'react';
import { USER_LOGIN, USER_GET, USER_CREATE, FARM_CREATE, FARM_GET, FARM_EDIT, COFFEE_CREATE, COFFEE_EDIT, COFFEE_DELETE} from '../Api/api';
import { useNavigate } from 'react-router';

export const UserContext = React.createContext();

export function UserStorage({ children }) {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    if(json.data.farm.length > 0) {
      getFarm(json.data.farm[0].id);
    }
    setLogin(true);
  }

  async function getFarm(id) {
    const { url, options } = FARM_GET(id);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = USER_LOGIN({ email, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Erro ao entrar');
      const { data } = await response.json();
      window.localStorage.setItem('token', data.access_token);
      await getUser(data.access_token);
      navigate('/conta/fazenda');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function userCreate(name, email, password) {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = USER_CREATE({ name, email, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Erro ao cadastrar usuário');
      navigate('/login');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function farmCreate(body) {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = FARM_CREATE(body);
      const response = await fetch(url, options);
      const { data } = await response.json();
      if (!response.ok) throw new Error('Erro ao salvar fazenda');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function farmEdit(id, body) {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = FARM_EDIT(id, body);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Erro ao salvar fazenda');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function coffeeCreate(id, body) {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = COFFEE_CREATE(id, body);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Erro ao salvar café');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function coffeeEdit(id, body) {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = COFFEE_EDIT(id, body);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Erro ao salvar fazenda');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }


  async function coffeeDelete(id, body) {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = COFFEE_DELETE(id, body);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Erro ao salvar fazenda');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);   
          await getUser(token);
          const { url, options } = USER_GET(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userCreate, userLogout, farmCreate, farmEdit, coffeeCreate, coffeeEdit, coffeeDelete, getFarm, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
}
