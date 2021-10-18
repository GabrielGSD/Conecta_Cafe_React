import React from 'react';
import { USER_LOGIN, USER_GET, USER_CREATE } from '../Api/api';
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
    setData(json);
    console.log(data);
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
      console.log(data);
      window.localStorage.setItem('token', data.access_token);
      await getUser(data.access_token);
      navigate('/fazendas');
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
      const { data } = await response.json();
      console.log(data);
      navigate('/login');
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
          // const { url, options } = TOKEN_VALIDATE_POST(token);
          // const response = await fetch(url, options);
          // if (!response.ok) throw new Error('Token inválido');
          // await getUser(token);
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
      value={{ userLogin, userCreate, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
}
