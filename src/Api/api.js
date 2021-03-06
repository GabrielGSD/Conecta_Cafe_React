export const API_URL = 'https://d0b9-189-126-233-210.ngrok.io';

// Funcao Login
export function USER_LOGIN(body) {
  return {
    url: API_URL + '/auth/login',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}

// Funcao Cadastrar usuario
export function USER_CREATE(body) {
  return {
    url: API_URL + '/coffee-grower',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}

// Funcao listar os dados do usuario
export function USER_GET(token) {
  return {
    url: API_URL + '/coffee-grower',
    options: {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    },
  };
}

// Funcao editar usuario
export function USER_EDIT(body) {
  return {
    url: API_URL + '/coffee-grower',
    options: {
      method: 'PUT',
      headers: { Authorization: 'Bearer ' + window.localStorage.getItem("token") },
      body: JSON.stringify(body),
    },
  };
}

// Funcao deletar usuario
export function USER_DELETE() {
  return {
    url: API_URL + '/coffee-grower',
    options: {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + window.localStorage.getItem("token") },
    },
  };
}

// Funcao Cadastrar Fazenda
export function FARM_CREATE(body) {
  return {
    url: API_URL + '/farm',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    },
  };
}

// Funcao busca Fazenda
export function FARM_GET(id) {
  return {
    url: API_URL + `/farm/${id}`,
    options: {
      method: 'GET'
    }
  };
}

// Funcao Editar Fazenda
export function FARM_EDIT(id, body) {
  return {
    url: API_URL + `/farm/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    },
  };
}

// Funcao listar caf??s
export function COFFEES_GET(id) {
  return {
    url: `${API_URL}/coffee/${id}`,
    options: {
      method: 'GET'
    },
  };
}

// Funcao Cadastrar Caf??
export function COFFEE_CREATE(id, body) {
  return {
    url: `${API_URL}/coffee/${id}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    },
  };
}

// Funcao Atualizar Caf??
export function COFFEE_EDIT(id, body) {
  return {
    url: API_URL + `/coffee/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    },
  };
}

// Funcao de Remover Caf??
export function COFFEE_DELETE(id, body) {
  return {
    url: API_URL + `/coffee/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    },
  };
}

//Funcao listar fazendas cadastradas 
export function FARMER_GET_ALL() {
  return {
    url: `${API_URL}/farm/all`,
    options: {
      method: 'GET'
    },
  };
}

// Funcao listar caf??s
export function COFFEE_GET_ALL() {
  return {
    url: `${API_URL}/coffee/all`,
    options: {
      method: 'GET'
    },
  };
}
