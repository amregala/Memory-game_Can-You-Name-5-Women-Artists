console.log("Memory Card Game - Can You Name Five Women Artist?");

document.addEventListener("DOMContentLoaded", () => {
  // ELEMENT SELECTORS
  // const section = document.querySelector("section");
  const card1 = document.querySelector("#artist1");
  const card2 = document.querySelector("#artist2");
  const gameBoard = document.querySelector(".gameBoard");
  const timerCount = document.querySelector("#innerTimer");
  let flippedCardsArray = [];
  const playerLivesCount = document.querySelector(".lives");
  let scoreCount = document.querySelector("#score");
  let playerLives = 6;
  let score = 0;
  let playerLives2 = 6;
  let score2 = 0;
  const p2Lives = document.querySelector("#p2Lives");
  const p2Score = document.querySelector("#p2Score");
  let scoreArray = [];
  let twoPlayerGame = false;
  let onePlayerGame = true;
  // LINKED ELEMENTS
  playerLivesCount.textContent = playerLives;
  scoreCount.textContent = `SCORE: ${score}`;

  // ! Link below to 2 player round?
  // playerLivesCount.textContent = playerLives2;
  // scoreCount.textContent = `SCORE: ${score2}`;

  //============================
  // GENERATING CARD DATA
  //============================
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
  ]; // END OF GETDATA
  // console.log(getData());
  // console.log(typeof getData());

  //============================
  // START GAME FUNCTION
  //============================
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
        p2stats.classList.add("p2FadeOut"); //fades out the player 2 stats since p1 was selected
      }, 500);
    });

    // twoPlayer.addEventListener("click", () => {
    //   setTimeout(() => {
    //     console.log("fadeOut happened, clicked on 2 player");
    //     onePlayerGame = false;
    //     twoPlayerGame = true;
    //     console.log("1p", onePlayerGame);
    //     console.log("2p", twoPlayerGame);
    //     introScreen.classList.add("fadeOut");
    //     const p2Lives = document.querySelector("#p2Lives");
    //     const p2Score = document.querySelector("#p2Score");
    //     p2Lives.textContent = playerLives;
    //     p2Score.textContent = score;
    //   }, 500);
    // });
    cardGenerator();
  };

  //====FUNCTION KEEPS TRACK OF SCORE===============
  function scoreKeeper() {
    score += 10;
    console.log("score function scoreKeeper", score);
    return (scoreCount.textContent = `SCORE: ${score}`);
  } // END OF SCOREKEEPER FUNCTION

  //============================
  // RANDOMIZE FUNCTION
  //============================
  const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
  }; // END OF RANDOMIZE FUNCTION

  //============================
  //CARD GENERATOR FUNCTION
  //============================
  const cardGenerator = () => {
    const cardData = randomize();

    // Generate the HTML
    cardData.forEach(item => {
      console.log(item);
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
        card.classList.toggle("matchedCard");
        const clickedCard = e.target;
        flippedCardsArray.push(clickedCard);
        const firstCard = flippedCardsArray[0];
        const secondCard = flippedCardsArray[1];

        if (flippedCardsArray.length === 1) {
          card1.textContent = firstCard.getAttribute("name");
        }
        if (flippedCardsArray.length === 2) {
          card1.textContent = firstCard.getAttribute("name");
          card2.textContent = secondCard.getAttribute("name");
          checkCards(e);
        }
      });
    });
  }; // END OF CARD GENERATOR FUNCTION

  //============================
  // CLEARING OUT FUNCTION - EMPTIES ARRAY AFTER EACH TURN
  //============================
  const clearOut = () => {
    console.log("clearing flipped cards array");
    card1.textContent = "";
    card2.textContent = "";
    flippedCardsArray = [];
    gameBoard.classList.toggle("lock");
  }; // END OF CLEARING OUT FUNCTION

  const matchCheck = () => {
    const matched = document.querySelectorAll(".matchedCard");
    if (matched.length === 16) {
      console.log("Score Array", scoreArray);
      restart("You're a champ 🏆");
    }
  };

  //============================
  // CHECK CARDS FUNCTION
  //============================
  const checkCards = e => {
    console.log("flipped Cards ARRAY", flippedCardsArray);
    gameBoard.classList.toggle("lock");

    setTimeout(() => {
      if (card1.textContent === card2.textContent) {
        console.log("match");
        scoreKeeper();
        flippedCardsArray.forEach(card => {
          card.style.pointerEvents = "none";
        });
      } else {
        console.log("not a match");
        flippedCardsArray.forEach(card => {
          card.classList.toggle("matchedCard");
        });
        playerLives--;
        playerLivesCount.textContent = playerLives;
      }

      clearOut();

      // CONDITIONAL CHECKING TO SEE IF GAME WAS WON
      // if (matched.length === 16) {
      //   console.log("Score Array", scoreArray);
      //   restart("You're a champ 🏆");
      // }

      setTimeout(() => {
        if (playerLives === 0) {
          scoreArray.push(score);
          console.log("Score Array", scoreArray);
          console.log("two player?", twoPlayerGame);
          if (twoPlayerGame === true) {
            setTimeout(() => {
              restart("🫠 You are out of lives...Player two's turn!");
              console.log("checking score array", scoreArray);
              scoreCount.textContent = `FINAL: ${scoreArray[0]}`;
            }, 200);
            // ! RUN ANOTHER 2 PLAYER FUNCTION IN HERE?? LINKED AS INNER FUNCTION
          } else {
            restart("🫠 You are out of lives...try again");
          }
        }
      }, 100);

      matchCheck();
    }, 1200);
  }; //END OF CHECK CARDS FUNCTION

  //============================
  //RESTART FUNCTION
  //============================
  const restart = text => {
    console.log("Restart Happening");

    window.alert(text);

    if (onePlayerGame === true) {
      playerLives = 6;
      playerLivesCount.textContent = playerLives;
      score = 0;
      scoreCount.textContent = `SCORE: ${score}`;
    }

    let cardData = randomize();

    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    // gameBoard.classList.remove("lock");

    cardData.forEach((card, index) => {
      cards[index].classList.remove("matchedCard");
      cards[index].style.pointerEvents = "all";
      faces[index].src = card.imgSrc;
      cards[index].setAttribute("name", card.name);
    });
    console.log(cardData);

    gameBoard.classList.remove("lock");
  }; // END OF RESTART FUNCTION

  // INVOKING MAIN GAME FUNCTION
  startGame();
}); // this belongs to the DOM CONTENT LOADED AT VERY TOP

//section.style.pointerEvents = none;
