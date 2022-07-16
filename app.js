console.log("Memory Card Game - Can You Name Five Women Artist?");

const allCards = document.querySelectorAll(".memory-card");
const card = document.querySelector(".img");
const frontImages = document.querySelectorAll("img.front-face");
const imgArray = Array.from(frontImages, image => image.src);
const chosenCards = [];

// console.log("imgArray Length", imgArray.length);
// console.log("type of imgArray check", typeof imgArray);
// console.log(Object.values(imgArray));
// console.log("frontImages access:", frontImages[0].className);
// console.log("title check", frontImages[0].title);

// *flip card functionality and push title of chosen card into an empty array
function flipCard() {
  this.classList.toggle("flip");
  let cardId = this.title;
  chosenCards.push(cardId);
  if (chosenCards.length === 2) {
    setTimeout(checkForMatch, 500);
  }
  console.log(chosenCards);
}
allCards.forEach(card => card.addEventListener("click", flipCard));

// * this function checks to see if the cards pushed into the chosen cards array when flipped match
function checkForMatch() {
  if (chosenCards[0].title === chosenCards[1].title) {
    console.log("this is a match");
  } else {
    console.log("better luck next time");
  }
}

// * lets me know how many cards I have
// const count = selector => {
//   return document.querySelectorAll(selector).length;
// };
// console.log(count("img.front-face"))
