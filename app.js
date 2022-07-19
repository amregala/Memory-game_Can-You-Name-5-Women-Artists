console.log("Memory Card Game - Can You Name Five Women Artist?");

// adding as a safeguard but not really needed as elements are being appended from JS
document.addEventListener("DOMContentLoaded", () => {
  // class Player {
  //   constructor(name, finalScore) {
  //     this.name = name;
  //     this.score = finalScore;
  //   }

  // }

  // const player1 = new Player ("Player 1")
  // const player2 = new Player ("Player 2")

  //grab a couple of things
  const section = document.querySelector("section");
  const card1 = document.querySelector("#artist1");
  const card2 = document.querySelector("#artist2");
  let flippedCardsArray = [];
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
    flippedCardsArray.push(clickedCard);
    console.log("flipped Cards Array", flippedCardsArray);
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    console.log("clicked card", clickedCard);
    console.log("toggle on", toggleCard);

    // card1.textContent = flippedCards[0].getAttribute("name");
    // card2.textContent = flippedCards[1].getAttribute("name");

    //Logic
    if (flippedCards.length === 2) {
      card1.textContent = flippedCardsArray[0].getAttribute("name");
      card2.textContent = flippedCardsArray[1].getAttribute("name");

      setTimeout(() => {
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
          // card1.textContent = "";
          // card2.textContent = "";
        } else {
          console.log("wrong");
          console.log(playerLives);
          flippedCards.forEach(card => {
            card.classList.remove("flipped");
            setTimeout(() => card.classList.remove("toggleCard"), 800);
          });
          // card1.textContent = "";
          // card2.textContent = "";
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
        // ! should this go here? Or further below test
        // if (toggleCard.length === 16) {
        //   restart("You're a champ 🏆");
        // }

        setTimeout(() => {
          console.log("clearing artist content");
          card1.textContent = "";
          card2.textContent = "";
          flippedCardsArray.length = 0;
        }, 750);
      }, 2700);
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
  }; //end of checkCards function

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
