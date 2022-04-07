import axios from 'axios';

const mockApiUrl =
  'https://624e87fe53326d0cfe5c0055.mockapi.io/api/test1/users';

function getUsers() {
  axios
    .get(mockApiUrl)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
}

// getUsers();

function addUser() {
  const nuevoUsuario = {
    name: 'Juan Magos',
    avatar: 'tester',
    phone: '5566778899',
  };
  axios
    .post(mockApiUrl, nuevoUsuario)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
}
// addUser();

const pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';

function getPokemons() {
  axios
    .get(pokeUrl)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
}

// getPokemons()
