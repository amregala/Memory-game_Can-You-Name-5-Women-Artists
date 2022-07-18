console.log("Memory Card Game - Can You Name Five Women Artist?");

// adding as a safeguard but not really needed as elements are being appended from JS
document.addEventListener("DOMContentLoaded", () => {
  //grab a couple of things
  const section = document.querySelector("section");
  const playerLivesCount = document.querySelector("#lives");
  const scoreCount = document.querySelector("#score");
  let playerLives = 6;
  let score = 0;
  // link text
  playerLivesCount.textContent = playerLives;
  scoreCount.textContent = score;

  // generate the data
  const getData = () => [
    { imgSrc: "imgs/barbara-kruger.jpeg", name: "barbara-kruger" },
    { imgSrc: "imgs/hayv-kahraman.jpeg", name: "havy-kahraman" },
    { imgSrc: "imgs/mary-weatherford.WebP", name: "mary-weatherford" },
    { imgSrc: "imgs/tamara-de-lempicka.png", name: "tamara-de-lempicka" },
    { imgSrc: "imgs/zaha-hadid-2.jpeg", name: "zaha-hadid" },
    { imgSrc: "imgs/alma-thomas.jpeg", name: "alma-thomas" },
    {
      imgSrc: "imgs/artemisia-gentileschi.webp",
      name: "artemisia-gentileschi",
    },
    { imgSrc: "imgs/yayoi-kusama.png", name: "yayoi-kusama" },
    { imgSrc: "imgs/barbara-kruger.jpeg", name: "barbara-kruger" },
    { imgSrc: "imgs/hayv-kahraman.jpeg", name: "havy-kahraman" },
    { imgSrc: "imgs/mary-weatherford.WebP", name: "mary-weatherford" },
    { imgSrc: "imgs/tamara-de-lempicka.png", name: "tamara-de-lempicka" },
    { imgSrc: "imgs/zaha-hadid-2.jpeg", name: "zaha-hadid" },
    { imgSrc: "imgs/alma-thomas.jpeg", name: "alma-thomas" },
    {
      imgSrc: "imgs/artemisia-gentileschi.webp",
      name: "artemisia-gentileschi",
    },
    { imgSrc: "imgs/yayoi-kusama.png", name: "yayoi-kusama" },
  ];
  console.log(getData());
  console.log(typeof getData());

  // randomize
  const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
  };

  // Card Generator Function
  const cardGenerator = () => {
    const cardData = randomize();
    //console.log(cardData);
    // Generate the HTML

    cardData.forEach(item => {
      // console.log(item);
      const card = document.createElement("div");
      const face = document.createElement("img");
      const back = document.createElement("div");
      card.classList = "card";
      face.classList = "face";
      back.classList = "back";
      // Attach the info to the cards
      face.src = item.imgSrc;
      card.setAttribute("name", item.name);

      // Attach the cards to the section
      section.appendChild(card);
      card.appendChild(face);
      card.appendChild(back);

      card.addEventListener("click", e => {
        card.classList.toggle("toggleCard");
        checkCards(e);
      });
    });
  }; // CardGenerator function ends

  // Check Cards
  const checkCards = e => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    console.log(clickedCard);

    //Logic

    if (flippedCards.length === 2) {
      if (
        flippedCards[0].getAttribute("name") ===
        flippedCards[1].getAttribute("name")
      ) {
        console.log("match");
        scoreKeeper();
        flippedCards.forEach(card => {
          card.classList.remove("flipped");
          card.style.pointerEvents = "none";
        });
      } else {
        console.log("wrong");
        console.log(playerLives);
        flippedCards.forEach(card => {
          card.classList.remove("flipped");
          setTimeout(() => card.classList.remove("toggleCard"), 1500);
        });
        playerLives--;
        console.log("subtraction happened", playerLives);
        playerLivesCount.textContent = playerLives;

        console.log("right before restart", playerLives);
        if (playerLives === 0) {
          setTimeout(() => {
            restart("🫠...try again");
          }, 800);
        }
      }
    }
    function scoreKeeper() {
      score += 10;
      console.log("score function scoreKeeper", score);
      return (scoreCount.textContent = score);
      //   return;
    }
    // Run a check to see if we won the game
    if (toggleCard.length === 16) {
      restart("You're a champ 🏆");
    }
  };

  // Restart
  const restart = text => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
      cards[index].classList.remove("toggleCard");
      //Randomize
      setTimeout(() => {
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
      }, 1000);
    });

    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    score = 0;
    scoreCount.textContent = score;
    setTimeout(() => window.alert(text), 850);
  };

  cardGenerator();
}); // this belongs to the DOM CONTENT LOADED AT VERY TOP

// ! ANOTHER VERION THAT WAS BASED OFF OF DIVS IN HTML AND USING FLEX-BOX ORDER TO RANDOMIZE. BUT DIFFICULT TO MOVE THROUGH AND CLUNKY IF I WANTED TO ADD MORE CARDS OR CHANGE OTHER ELEMENTS
// const allCards = document.querySelectorAll(".memory-card");
// const card = document.querySelector(".img");
// const frontImages = document.querySelectorAll("img.front-face");
// const imgArray = Array.from(frontImages, image => image.src);
// const displayResult = document.querySelector("#score");
// const playerLivesCount = document.querySelector("#lives");
// let playerLives = 6;

// // link text
// playerLivesCount.textContent = playerLives;
// const chosenCards = [];
// console.log("Image Array", imgArray);
// // console.log("imgArray Length", imgArray.length);
// // console.log("type of imgArray check", typeof imgArray);
// // console.log(Object.values(imgArray));
// // console.log("frontImages access:", frontImages[0].className);
// // console.log("title check", frontImages[0].title);

// //since the cards are in a flex box they are organized in order, so to shuffle them Math.floor with Math.random can be used. would used their position in the flex to assign them new positions.
// function shuffle() {
//   allCards.forEach(card => {
//     let randomize = Math.floor(Math.random() * 12);
//     card.style.order = randomize;
//   });
// }
// shuffle();

// let hasFlippedCard = false;
// let firstCard, secondCard;
// let score = 0;

// // *flip card functionality and stores value of the first 2 cards chosen
// function flipCard() {
//   this.classList.add("flip");
//   console.log("this card", this.classList);

//   if (!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = this;
//     console.log("first-card", this);
//     return;
//   }

//   secondCard = this;
//   console.log("second-card:", this);
//   hasFlippedCard = false;

//   checkForMatch();
// }

// // this function checks the titles on the first and second cards choosen in the function flipCard - if they match the pair of cards is "disabled" (the cards staying permenantly flipped) - they are disabled through function disableCards
// // if the cards are not a match then they flip over again
// function checkForMatch() {
//   console.log("firstCard", firstCard);
//   console.log("secondCard", secondCard);
//   if (firstCard.title === secondCard.title) {
//console.log("this is a match");
//     disableCards();
//     scoreKeeper();
// ! trying to remove pointer events in a simpler way
//      chosenCards.push(firstCard, secondCard);
//      console.log("choosenCards Array", chosenCards);
//      chosenCards.style.pointerEvents = "none";
//     return;
//   } else {
//     playerLives--;
//     playerLivesCount.textContent = playerLives;
//     if (playerLives === 0) {
// ! - Create restart logic
//       console.log("restart...try again");
//       restart("...try again");
//     }
//   }

//   unflipCards();
// }

// this function is displaying the score results on the screen
// function scoreKeeper() {
//   score += 10;
//   console.log("score function scoreKeeper", score);
//   return (displayResult.innerHTML = score);
//   return;
// }
// this function removes the event listener from the matching cards, not allowing them to be clicked again
// function disableCards() {
//   firstCard.removeEventListener("click", flipCard);
//   secondCard.removeEventListener("click", flipCard);
// }
// function enableCards() {
//    chosenCards.classList.addEventListener("click", flipCard);
//   chosenCards.classList.add("flip");
//   console.log("choosenCards at enable cards", chosenCards);
// }

// this function flips the cards that did not pair up back over again
// function unflipCards() {
//   setTimeout(() => {
//     firstCard.classList.remove("flip");
//     secondCard.classList.remove("flip");
//   }, 1000);
// }

// const restart = text => {
//   shuffle();
//   enableCards();
//   playerLives = 6;
//   playerLivesCount.textContent = playerLives;
//   score = 0;
//   displayResult.textContent = score;
//   setTimeout(() => window.alert(text), 50);
// };

// allCards.forEach(card => card.addEventListener("click", flipCard));

// _____________________________________
//  attempting an alternative method of possibly pushing matched cards into this array. pushign cards into array and comparing cards there. this function checks to see if the cards pushed into the chosen cards array when flipped match
//let cardId = this.title;
//chosenCards.push(cardId);
//return;

// if (chosenCards.length === 2) {
//   setTimeout(checkForMatch, 500);
// }
// console.log(chosenCards);
//______________________________________
// * lets me know how many cards I have
// const count = selector => {
//   return document.querySelectorAll(selector).length;
// };
// console.log(count("img.front-face"))
