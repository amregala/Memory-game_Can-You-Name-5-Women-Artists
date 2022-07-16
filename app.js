console.log("Memory Card Game - Can You Name Five Women Artist?");

const allCards = document.querySelectorAll(".memory-card");
const card = document.querySelector(".img");
const frontImages = document.querySelectorAll("img.front-face");
const imgArray = Array.from(frontImages, image => image.src);

const chosenCards = [];

console.log("imgArray Length", imgArray.length);
console.log("type of imgArray check", typeof imgArray);
console.log(Object.values(imgArray));

console.log("frontImages access:", frontImages[0].className);
console.log("title check", frontImages[0].title);

// *flip card functionality - done
function flipCard() {
  this.classList.toggle("flip");
  let cardId = this.title;
  chosenCards.push(cardId);
  console.log(chosenCards);
}
allCards.forEach(card => card.addEventListener("click", flipCard));

// * lets me know how many cards I have
// const count = selector => {
//   return document.querySelectorAll(selector).length;
// };
// console.log(count("img.front-face"));
