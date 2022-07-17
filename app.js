console.log("Memory Card Game - Can You Name Five Women Artist?");

const allCards = document.querySelectorAll(".memory-card");
const card = document.querySelector(".img");
const frontImages = document.querySelectorAll("img.front-face");
const imgArray = Array.from(frontImages, image => image.src);
const displayResult = document.querySelector("#result");
const chosenCards = [];
// console.log("imgArray Length", imgArray.length);
// console.log("type of imgArray check", typeof imgArray);
// console.log(Object.values(imgArray));
// console.log("frontImages access:", frontImages[0].className);
// console.log("title check", frontImages[0].title);

let hasFlippedCard = false;
let firstCard, secondCard;
let score = 0;

// *flip card functionality and stores value of the first 2 cards chosen
function flipCard() {
  this.classList.add("flip");
  console.log("this card", this.classList);

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    console.log("first-card", this);
    return;
  }

  secondCard = this;
  console.log("second-card:", this);
  hasFlippedCard = false;

  checkForMatch();
}

// this function checks the titles on the first and second cards choosen in the function flipCard - if they match the pair of cards is "disabled" (the cards staying permenantly flipped) - they are disabled through function disableCards
// if the cards are not a match then they flip over again
function checkForMatch() {
  console.log("firstCard", firstCard);
  console.log("secondCard", secondCard);
  if (firstCard.title === secondCard.title) {
    //console.log("this is a match");
    disableCards();
    scoreKeeper();
    return;
  }

  unflipCards();
}
// this function is displaying the score results on the screen
function scoreKeeper() {
  score += 10;
  console.log(score);
  return (displayResult.innerHTML = score);
  //return;
}
//this function removes the event listener from the matching cards, not allowing them to be clicked again
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

//this function flips the cards that did not pair up back over again
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
  }, 1000);
}

//since the cards are in a flex box they are organized in order, so to shuffle them Math.floor with Math.random can be used. would used their position in the flex to assign them new positions.
function shuffle() {
  allCards.forEach(card => {
    let randomize = Math.floor(Math.random() * 12);
    card.style.order = randomize;
  });
}
shuffle();

allCards.forEach(card => card.addEventListener("click", flipCard));

// _____________________________________
// * attempting an alternative method of possibly pushing matched cards into this array. pushign cards into array and comparing cards there. this function checks to see if the cards pushed into the chosen cards array when flipped match
//let cardId = this.title;
//chosenCards.push(cardId);
//return;

// if (chosenCards.length === 2) {
//   setTimeout(checkForMatch, 500);
// }
// console.log(chosenCards);

// * lets me know how many cards I have
// const count = selector => {
//   return document.querySelectorAll(selector).length;
// };
// console.log(count("img.front-face"))
