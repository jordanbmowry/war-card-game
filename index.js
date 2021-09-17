const $drawCardsBtn = document.querySelector('.draw-cards-btn');

const drawCardsHandler = (event) => {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((response) => response.json())
    .then((data) => console.log(data));
};

$drawCardsBtn.addEventListener('click', drawCardsHandler);
