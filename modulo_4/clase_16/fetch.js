//No se necesita instalar ninguna librería para usar fetch en una aplicación web.
import fetch from 'node-fetch';
//No se necesita instalar ninguna librería para usar fetch en una aplicación web.

const nuevoUsuarioEditado = {
  name: 'Juan Mago',
  avatar: 'tester',
  phone: '5566778899',
};

function updateUser() {
  fetch('https://624e87fe53326d0cfe5c0055.mockapi.io/api/test1/users/19', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoUsuarioEditado),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

// updateUser();

function deleteUser() {
  fetch('https://624e87fe53326d0cfe5c0055.mockapi.io/api/test1/users/19', {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

// deleteUser();

function getPokemons() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

getPokemons();

//https://es.acervolima.com/diferencia-entre-fetch-y-axios-js-para-realizar-requests-http/#:~:text=Diferencias%20entre%20Axios%20y%20Fetch%3A&text=Axios%20tiene%20una%20URL%20en,se%20requiere%20instalaci%C3%B3n%20como%20tal.
