console.log("Memory Card Game - Can You Name Five Women Artist?");

// adding as a safeguard but not really needed as elements are being appended from JS
document.addEventListener("DOMContentLoaded", () => {
  // ELEMENT SELECTORS
  const section = document.querySelector("section");
  const card1 = document.querySelector("#artist1");
  const card2 = document.querySelector("#artist2");
  const gameBoard = document.querySelector(".gameBoard");

  const timerCount = document.querySelector("#innerTimer");
  let flippedCardsArray = [];
  const playerLivesCount = document.querySelector(".lives");
  const scoreCount = document.querySelector("#score");
  let playerLives = 6;
  let score = 0;
  let scoreArray = [];
  let timer = 10;
  // linking text
  playerLivesCount.textContent = playerLives;
  scoreCount.textContent = score;
  timerCount.textContent = timer;

  // GENERATING CARD DATA
  const getData = () => [
    { imgSrc: "imgs/barbara-kruger-crop.jpg", name: "Barbara Kruger" },
    { imgSrc: "imgs/hayv-kahraman-crop.jpg", name: "Havy Kahraman" },
    { imgSrc: "imgs/frida-kahlo-crop.jpg", name: "Frida Kahlo" },
    { imgSrc: "imgs/tamara-de-lempicka-crop.jpg", name: "Tamara de Lempicka" },
    { imgSrc: "imgs/zaha-hadid-crop.jpg", name: "Zaha Hadid" },
    { imgSrc: "imgs/alma-thomas-crop.jpg", name: "Alma Thomas" },
    {
      imgSrc: "imgs/artemisia-gentileschi-crop.jpg",
      name: "Artemisia Gentileschi",
    },
    { imgSrc: "imgs/yayoi-kusama-crop.jpg", name: "Yayoi Kusama" },
    { imgSrc: "imgs/barbara-kruger-crop.jpg", name: "Barbara Kruger" },
    { imgSrc: "imgs/hayv-kahraman-crop.jpg", name: "Havy Kahraman" },
    { imgSrc: "imgs/frida-kahlo-crop.jpg", name: "Frida Kahlo" },
    { imgSrc: "imgs/tamara-de-lempicka-crop.jpg", name: "Tamara de Lempicka" },
    { imgSrc: "imgs/zaha-hadid-crop.jpg", name: "Zaha Hadid" },
    { imgSrc: "imgs/alma-thomas-crop.jpg", name: "Alma Thomas" },
    {
      imgSrc: "imgs/artemisia-gentileschi-crop.jpg",
      name: "Artemisia Gentileschi",
    },
    { imgSrc: "imgs/yayoi-kusama-crop.jpg", name: "Yayoi Kusama" },
  ];
  console.log(getData());
  console.log(typeof getData());

  // randomize
  const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
  };

  //============================
  //CARD GENERATOR FUNCTION
  //============================
  const cardGenerator = () => {
    const startGame = () => {
      const onePlayer = document.querySelector("#playerOneBtn");
      const twoPlayer = document.querySelector("#playerTwoBtn");
      const p2stats = document.querySelector("#playerTwo");
      const introScreen = document.querySelector(".intro");
      const match = document.querySelector(".match-container");

      onePlayer.addEventListener("click", () => {
        setTimeout(() => {
          console.log("fadeOut happened");
          introScreen.classList.add("fadeOut");
          p2stats.classList.add("p2FadeOut");
        }, 500);
      });

      twoPlayer.addEventListener("click", () => {
        setTimeout(() => {
          console.log("fadeOut happened, clicked on 2 player");
          introScreen.classList.add("fadeOut");
          const p2Lives = document.querySelector("#p2Lives");
          const p2Score = document.querySelector("#p2Score");
          p2Lives.textContent = playerLives;
          p2Score.textContent = score;
        }, 500);
      });
    };
    // calling inner function startGame
    startGame();

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
      gameBoard.appendChild(card);
      card.appendChild(face);
      card.appendChild(back);

      card.addEventListener("click", e => {
        card.classList.toggle("toggleCard");
        checkCards(e);
      });
    });
  }; // END OF CARD GENERATOR FUNCTION

  //============================
  // CHECK CARDS FUNCTION
  //============================
  const checkCards = e => {
    const clickedCard = e.target;
    flippedCardsArray.push(clickedCard);
    console.log("flipped Cards Array", flippedCardsArray);
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    console.log("clicked card", clickedCard);
    console.log("toggle on", toggleCard);

    setInterval(() => {
      timer--;
      timerCount.textContent = timer;
      console.log("timer");
      return timer;
    }, 60000);

    //Logic
    if (flippedCards.length === 2) {
      card1.textContent = flippedCardsArray[0].getAttribute("name");
      card2.textContent = flippedCardsArray[1].getAttribute("name");

      const lockCards = document.querySelectorAll(".card");
      const gameBoard = document.querySelector(".gameBoard");
      gameBoard.classList.toggle("lock");

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
          gameBoard.classList.remove("lock");
          // card1.textContent = "";
          // card2.textContent = "";
        } else {
          console.log("not a match");
          console.log("not a match - player lives", playerLives);
          flippedCards.forEach(card => {
            card.classList.remove("flipped");
            setTimeout(() => {
              card.classList.remove("toggleCard");
              gameBoard.classList.remove("lock");
            }, 800);
          });
          // card1.textContent = "";
          // card2.textContent = "";

          playerLives--;
          console.log("subtraction happened", playerLives);
          playerLivesCount.textContent = playerLives;

          console.log("right before restart", playerLives);
          if (playerLives === 0) {
            scoreArray.push(score);
            console.log("Score Array", scoreArray);
            setTimeout(() => {
              restart("🫠...try again");
            }, 800);
          }
        }
        // ! should this go here? Or further below test
        // if (toggleCard.length === 16) {
        //   restart("You're a champ 🏆");
        // }
        //===========THIS FUNCTIO IS CLEARING OUT THE FLIPPED CARDS ARRAY=============
        setTimeout(() => {
          console.log("clearing flipped cards array");
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
    }
    // Run a check to see if we won the game
    if (toggleCard.length === 16) {
      scoreArray.push(score);
      console.log("Score Array", scoreArray);
      restart("You're a champ 🏆");
    }
  }; //END OF CHECK CARDS FUNCTION

  //============================
  //RESTART FUNCTION
  //============================
  const restart = text => {
    console.log("Restart Happening");
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    gameBoard.classList.toggle("lock");

    cardData.forEach((item, index) => {
      cards[index].classList.remove("toggleCard");
      //cards.classList.toggle("lock");
      //Randomize
      setTimeout(() => {
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        gameBoard.classList.remove("lock");
      }, 1000);
    });

    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    score = 0;
    scoreCount.textContent = score;
    setTimeout(() => window.alert(text), 850);
  }; // END OF RESTART FUNCTION

  cardGenerator();
}); // this belongs to the DOM CONTENT LOADED AT VERY TOP

//section.style.pointerEvents = none;
