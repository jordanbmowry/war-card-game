let deckId = null;
const baseURL = 'https://apis.scrimba.com/deckofcards/api/deck/';
const $drawDeckBtn = document.querySelector('.new-deck-btn');
const $drawTwoCardsBtn = document.querySelector('.draw-two-cards-btn');
const $cardSlot1 = document.querySelectorAll('.card-slot')[0];
const $cardSlot2 = document.querySelectorAll('.card-slot')[1];
const $header = document.querySelector('.header');
const $remainingCards = document.querySelector('.remaining-cards');
const $computerScore = document.querySelector('.computer-score');
const $playerScore = document.querySelector('.player-score');
let computerScore = 0;
let playerScore = 0;

function newDeckHandler() {
  $drawTwoCardsBtn.disabled = false;
  fetch(`${baseURL}/new/shuffle/`)
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      displayRemainingCards(data);
    });
}

function displayScore(computerScore, playerScore) {
  $computerScore.textContent = `Computer score: ${computerScore}`;
  $playerScore.textContent = `Player score: ${playerScore}`;
}

function displayRemainingCards({ remaining }) {
  $remainingCards.textContent = `Remaining cards : ${remaining}`;
  if (!remaining) {
    $drawTwoCardsBtn.disabled = true;
    if (playerScore > computerScore) {
      $header.textContent = 'You win the game 🏆';
    } else if (computerScore > playerScore) {
      $header.textContent = 'Computer wins the game 🖥️';
    } else {
      $header.textContent = `It's a tie 🪢`;
    }
  }
}

function drawTwoCardsHandler() {
  fetch(`${baseURL}${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      $cardSlot1.innerHTML = `<img src=${data.cards[0].image} alt=${data.cards[0].code}>`;
      $cardSlot2.innerHTML = `<img src=${data.cards[1].image} alt=${data.cards[1].code}>`;

      $header.textContent = determineWinningCard(data.cards[0], data.cards[1]);
      displayRemainingCards(data);
      displayScore(computerScore, playerScore);
    });
}

function determineWinningCard(card1, card2) {
  const availableValue = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
    'ACE',
  ];
  const card1Index = availableValue.indexOf(card1.value);
  const card2Index = availableValue.indexOf(card2.value);

  if (card1Index > card2Index) {
    computerScore++;
    return 'Computer wins!';
  } else if (card1Index < card2Index) {
    playerScore++;
    return 'You win!';
  } else {
    return 'War!';
  }
}

$drawDeckBtn.addEventListener('click', newDeckHandler);
$drawTwoCardsBtn.addEventListener('click', drawTwoCardsHandler);
