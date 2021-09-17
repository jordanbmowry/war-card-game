const $drawCardsBtn = document.querySelector('.new-deck-btn');
let deckId;
const $drawTwoCardsBtn = document.querySelector('.draw-two-cards-btn');
const baseURL = 'https://apis.scrimba.com/deckofcards/api/deck/';

function newDeckHandler(event) {
  fetch(`${baseURL}/new/shuffle/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      console.log(deckId);
    });
  $drawTwoCardsBtn.classList.remove('hidden');
}

function drawTwoCardsHandler(event) {
  fetch(`${baseURL}${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector('.cards-container').innerHTML = `
      <img src=${data.cards[0].image} alt=${data.cards[0].code}>
      <img src=${data.cards[1].image} alt=${data.cards[1].code}>
      `;
    });
}

$drawCardsBtn.addEventListener('click', newDeckHandler);
$drawTwoCardsBtn.addEventListener('click', drawTwoCardsHandler);
