/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let card = document.getElementsByClassName('card');
let cards = [...card];
const deck = document.getElementById('deck-card');
let count = 0;
let move = document.querySelector('.moves');
let rating = document.querySelectorAll('.fa-star');
let opened = [];
let model = document.getElementById('result');
let section = document.querySelector('.up');
let s = 0, m = 0, h = 0;
let time = document.querySelector('.time');
let duration;
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

document.body.onload = start();

function start() {
  cards = shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, (item) => {
      deck.appendChild(item);
    });
    cards[i].classList.remove('open', 'show', 'match', 'over');
  }
  count = 0;
  move.innerHTML = count;
  for (let i = 0; i < rating.length; i++) {
    rating[i].style.visibility = 'visible';
  }
}

function flip() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('over');
}

function open() {
  opened.push(this);
  const length = opened.length;
  if (length === 2) {
    counter();
    if (opened[0].type === opened[1].type) {
      match();
    }
    else {
      unmatched();
    }
  }
}

function match() {
  opened[0].classList.add('match', 'over');
  opened[1].classList.add('match', 'over');
  opened[0].classList.remove('open', 'show');
  opened[1].classList.remove('open', 'show');
  opened = [];
}

function unmatched() {
  opened[0].classList.add('unmatched');
  opened[1].classList.add('unmatched');
  over();
  setTimeout(() => {
    opened[0].classList.remove('open', 'show', 'unmatched');
    opened[1].classList.remove('open', 'show', 'unmatched');
    enable();
    opened = [];
  }, 1000);
}

function over() {
  Array.prototype.filter.call(cards, (card) => {
    card.classList.add('over');
  });
}

const matched = document.getElementsByClassName('match');

function enable() {
  Array.prototype.filter.call(cards, (card) => {
    card.classList.remove('over');
    for (let i = 0; i < matched.length; i++) {
      matched[i].classList.add('over');
    }
  });
}

function counter() {
  count++;
  move.innerHTML = count;
  if (count == 1) {
    s = 0;
    m = 0;
    h = 0;
    timer();
  }
  if (count > 8 && count < 12) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        rating[i].style.visibility = 'collapse';
      }
    }
  }
  else if (count > 13) {
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        rating[i].style.visibility = 'collapse';
      }
    }
  }
}

function result() {
  if (matched.length == 16) {
    model.classList.add('show');
    const stars = document.querySelector('.stars').innerHTML;
    document.getElementById('last').innerHTML = count;
    document.getElementById('rating').innerHTML = stars;
    close();
  }
}

function close() {
  section.addEventListener('click', (e) => {
    model.classList.remove('show');
    start();
  })
}
function replay() {
  model.classList.remove('show');
  start();
}
function timer() {
  duration = setInterval(() => {
    time.innerHTML = `${h}hours ${m}minutes ${s}seconds`;
    s++;
    if (s == 60) {
      m++;
      s = 0;
    }
    if (m == 60) {
      h++;
      m = 0;
    }
  }, 1000);
}
for (let i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener('click', flip);
  card.addEventListener('click', open);
  card.addEventListener('click', result);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
