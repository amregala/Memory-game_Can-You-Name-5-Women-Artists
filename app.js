console.log("Memory Card Game - Can You Name Five Women Artist?");

const cards = document.querySelectorAll(".memory-card");

function flipCard() {
  this.classList.toggle("flip");
}

cards.forEach(card => card.addEventListener("click", flipCard));
