import { setTypeClass } from './shared.js';
import Chart from 'chart.js/auto';

const modalElement = document.querySelector('#modal');
const habilidades = [
  'Hp',
  'Attack',
  'Defense',
  'Special Attack',
  'Special Defense',
  'Speed',
];

export const openModal = async (pokemonName) => {
  modalElement.innerHTML = '';
  document.querySelector('#modal-content').classList.add('active');
  await fetchData(pokemonName).then((data) => {
    console.log(data);
    buildDetails(data);
  });

  const closeModalButton = document.querySelector('#close-button');
  closeModalButton.addEventListener('click', closeModal);
};

const closeModal = () => {
  console.log('closeModal');
  document.querySelector('#modal-content').classList.remove('active');
};

const fetchData = async (pokemonName) => {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const buildDetails = async (data) => {
  const { name, types, sprites, stats, weight, height } = data;
  const { front_default } = sprites;
  const hp = stats[0].base_stat;
  const attack = stats[1].base_stat;
  const defense = stats[2].base_stat;
  const specialAttack = stats[3].base_stat;
  const specialDefense = stats[4].base_stat;
  const speed = stats[5].base_stat;
  const pokemonType = types[0].type.name;
  modalElement.innerHTML =
    modalElement.innerHTML +
    `<div id="modal-header" class="${setTypeClass(pokemonType)} modal-header">
        <button class="close-button" id="close-button">X</button>
        <img src="${front_default}" alt="${name}" class='image-detail'>
    </div>
    <div class="modal-body">
          <span class='pokemon-name'>${name}</span>
          <ul id='pokemon-types' class='pokemon-types'></ul>
          <div class="weight-height-container">
            <div class="weight-item">
              <h3 class='pokemon-stats'>Peso</h3>
              <span class='pokemon-stats'>${weight} Kg</span>
            </div>
            <div class="weight-item">
              <h3 class='pokemon-stats'>Altura</h3>
              <span class='pokemon-stats'>${height} M</span>
            </div>
          </div>
          <div class='chart-container'>
          <canvas id="myChart"></canvas>
        </div>
    </div>
    `;
  const pokemonTypes = document.querySelector('#pokemon-types');

  await types.forEach((type) => {
    const {
      type: { name },
    } = type;
    const htmlType = `<li class='${setTypeClass(name)} pokeType'>${name}</li>`;
    pokemonTypes.innerHTML += htmlType;
  });
  createChart(hp, attack, defense, specialAttack, specialDefense, speed);
};

const createChart = (
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed
) => {
  const data = {
    labels: habilidades,
    datasets: [
      {
        label: 'Habilidades',
        backgroundColor: [
          'rgb(18, 223, 114)',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          'rgb(214, 82, 82)',
          'rgb(173, 87, 195)',
        ],
        data: [hp, attack, defense, specialAttack, specialDefense, speed],
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      color: '#fff',
    },
  };
  const myChart = new Chart(document.querySelector('#myChart'), config);
};
