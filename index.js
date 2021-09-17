let deckId;
const baseURL = 'https://apis.scrimba.com/deckofcards/api/deck/';
const $drawCardsBtn = document.querySelector('.new-deck-btn');
const $drawTwoCardsBtn = document.querySelector('.draw-two-cards-btn');
const $cardSlot1 = document.querySelectorAll('.card-slot')[0];
const $cardSlot2 = document.querySelectorAll('.card-slot')[1];

function newDeckHandler() {
  fetch(`${baseURL}/new/shuffle/`)
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log(deckId);
    });
  $drawTwoCardsBtn.classList.remove('hidden');
}

function drawTwoCardsHandler() {
  fetch(`${baseURL}${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      $cardSlot1.innerHTML = `<img src=${data.cards[0].image} alt=${data.cards[0].code}>`;
      $cardSlot2.innerHTML = `<img src=${data.cards[1].image} alt=${data.cards[1].code}>`;
    });
}

$drawCardsBtn.addEventListener('click', newDeckHandler);
$drawTwoCardsBtn.addEventListener('click', drawTwoCardsHandler);
