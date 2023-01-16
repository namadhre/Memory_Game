const pathImage1 = 'gifs/1.gif';
const pathImage2 = 'gifs/2.gif';
const pathImage3 = 'gifs/3.gif';
const pathImage4 = 'gifs/4.gif';
const pathImage5 = 'gifs/5.gif';
const pathImage6 = 'gifs/6.gif';
const pathImage7 = 'gifs/7.gif';
const pathImage8 = 'gifs/8.gif';
const pathImage9 = 'gifs/9.gif';
const pathImage10 = 'gifs/10.gif';
const pathImage11 = 'gifs/11.gif';
const pathImage12 = 'gifs/12.gif';
const QuestionMarkImagePath = 'gifs/images.png';

const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start-button");
const mainContainer = document.querySelector('.main-container');
const selectLevel = document.querySelector('.select-level');
const easyButton = document.getElementById('easy-level');
const mediumLevel = document.getElementById('medium-level');
const hardLevel = document.getElementById('hard-level');

let count = 0;
let firstClick = "";
let secondClick = "";
let moves = 0;
let maxSuccess;
let success = 0;


function handleSrart(event) {
  event.target.parentElement.style.display = 'none';
  selectLevel.style.display = 'flex';
}

startButton.addEventListener('click', handleSrart);

function handleEasyLevel(event) {
  event.target.parentElement.style.display = 'none';
  mainContainer.style.display = 'flex';
  IMAGES = [
    pathImage1,
    pathImage1,
    pathImage2,
    pathImage2,
    pathImage3,
    pathImage3,
    pathImage4,
    pathImage4,
    pathImage5,
    pathImage5,
    pathImage6,
    pathImage6
  ];
  maxSuccess = 6;
  let shuffledImages = shuffle(IMAGES);
  createDivsForColors(shuffledImages);
}

easyButton.addEventListener('click', handleEasyLevel);

function handleMediumLevel(event) {
  event.target.parentElement.style.display = 'none';
  mainContainer.style.display = 'flex';
  const IMAGES = [
    pathImage1,
    pathImage1,
    pathImage2,
    pathImage2,
    pathImage3,
    pathImage3,
    pathImage4,
    pathImage4,
    pathImage5,
    pathImage5,
    pathImage6,
    pathImage6,
    pathImage7,
    pathImage7,
    pathImage8,
    pathImage8
  ];
  maxSuccess = 8
  let shuffledImages = shuffle(IMAGES);
  createDivsForColors(shuffledImages);
}

mediumLevel.addEventListener('click', handleMediumLevel);

function handleHardLevel(event) {
  event.target.parentElement.style.display = 'none';
  mainContainer.style.display = 'flex';
  const IMAGES = [
    pathImage1,
    pathImage1,
    pathImage2,
    pathImage2,
    pathImage3,
    pathImage3,
    pathImage4,
    pathImage4,
    pathImage5,
    pathImage5,
    pathImage6,
    pathImage6,
    pathImage7,
    pathImage7,
    pathImage8,
    pathImage8,
    pathImage9,
    pathImage9,
    pathImage10,
    pathImage10,
    pathImage11,
    pathImage11,
    pathImage12,
    pathImage12
  ];
  maxSuccess = 12;
  let shuffledImages = shuffle(IMAGES);
  createDivsForColors(shuffledImages);
}

hardLevel.addEventListener('click', handleHardLevel);


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(imagesArray) {


  for (let image of imagesArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const forntFace = document.createElement("img");
    const backFace = document.createElement("img");

    forntFace.classList.add("front-face");
    backFace.classList.add("back-face");

    forntFace.src = image;
    backFace.src = QuestionMarkImagePath;


    // give it a class attribute for the value we are looping over
    newDiv.classList.add(image.slice(0, 7).replace('/', '-').replace('.', ''));
    newDiv.classList.add("memory-card");
    newDiv.dataset.imageId = 0;
    newDiv.append(forntFace, backFace);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

function handleCardClick() {
  let highScore = document.getElementById('high-score');
  let movesElement = document.getElementById("moves");
  let successElement = document.querySelector('.success-container');
  let scoreCard = document.getElementById("score");
  let totalScore = document.getElementById('total-score');
  if (count < 2) {
    if (this.dataset.imageId == 0) {
      moves++;
      this.classList.toggle("flip");
      this.dataset.imageId = 1;
      movesElement.textContent = `Moves: ${moves}`;
      if (count === 0) {
        firstClick = this;
        count++;
      } else {
        secondClick = this;
        count++;
      }
      if (secondClick) {
        if (firstClick.classList[0] === secondClick.classList[0]) {
          success++;
          count = 0;
        } else {
          firstClick.dataset.imageId = 1;
          if (count === 2) {
            setTimeout(() => {
              firstClick.dataset.imageId = 0;
              secondClick.dataset.imageId = 0;
              firstClick.classList.remove('flip');
              secondClick.classList.remove('flip');
              count = 0;
              secondClick = "";
            }, 1 * 1000);
          }
        }
      }
      scoreCard.textContent = `Score: ${Math.round((success / (moves / 2)) * 100)}`;
      if (success === maxSuccess) {
        mainContainer.style.display = 'none';
        successElement.style.display = 'block';
        let finalScore = Math.round((success / (moves / 2)) * 100);
        totalScore.textContent = `Total Score: ${finalScore}`;
        let newHighScore = updateLocalStorage(finalScore);
        highScore.textContent = `High Score: ${newHighScore}`;
      }
    }
  }
}

function updateLocalStorage(finalScore) {
  let newHighScore;
  if (localStorage.getItem('high_score') === null) {
    localStorage.setItem('high_score', finalScore);
    newHighScore = finalScore;
  } else {
    newHighScore = localStorage.getItem('high_score');
    if (newHighScore < finalScore) {
      localStorage.setItem('high_score', newHighScore);
    }
  }
  return newHighScore;
}