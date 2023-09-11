import { setTypeClass } from './shared.js';
import { openModal } from './modal.js';
import moment from 'moment';

let offset = 0;
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const dateContainer = document.querySelector('#date-container');

setInterval(() => {
  const date = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  dateContainer.innerHTML = date;
}, 1000);

nextButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (offset < 1127) {
    offset += 16;
    getPokemons();
  }
});

prevButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (offset > 0) {
    offset -= 16;
    getPokemons();
  }
});

function getPokemons() {
  nextButton.disabled = true;
  prevButton.disabled = true;

  const pokeListaPromesa = fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offset}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data.results;
    })
    .catch((error) => {
      console.log(error);
    });

  // console.log(pokeListaPromesa);

  pokeListaPromesa.then((lista) => {
    Promise.all(
      lista.map(async (pokemon) => {
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then((response) => response.json())
          .then((detallesPokemon) => {
            return detallesPokemon;
          });
      })
    )
      .then((listaCompleta) => {
        // console.log(listaCompleta);
        const htmlList = document.querySelector('#pokeList');
        htmlList.innerHTML = '';
        listaCompleta.forEach((pokemon) => {
          const { name, sprites, types } = pokemon;
          const pokemonType = types[0].type.name;
          const htmlPokemon = `
          <li class='${setTypeClass(pokemonType)} fadeIn 'id=${name}>
            <img src="${sprites.front_default}" alt="${name}">
            <h4>${name}</h4>
          </li>
          `;
          htmlList.innerHTML += htmlPokemon;
          // console.log(pokemon);
        });
        const pokemonsAvatars = document.querySelectorAll('li');
        pokemonsAvatars.forEach((avatar) => {
          avatar.addEventListener('click', (event) => {
            openModal(event.currentTarget.id);
          });
        });
        nextButton.disabled = false;
        prevButton.disabled = false;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

getPokemons();
