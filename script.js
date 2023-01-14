function main() {
  const gameContainer = document.getElementById("game");

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

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

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      newDiv.innerHTML = '<i class="fa-solid fa-question"></i>';

      newDiv.style.backgroundColor = 'white';

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // TODO: Implement this function!
  let count = 0;
  let firstClick = "";
  let secondClick = "";
  let moves = 0;
  let sucess = 0;

  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    let movesElement = document.getElementById("moves");
    let mainContainer = document.querySelector('.main-container');
    let sucessElement = document.querySelector('.success-container');
    let click = event.target;
    if (count < 2) {
      if (click.style.backgroundColor === "white") {
        moves++;
        movesElement.textContent = `Moves: ${moves}`;
        if (count === 0) {
          firstClick = event.target;
          count++;
        } else {
          secondClick = event.target;
          count++;
        }
        if (firstClick.className === secondClick.className) {
          firstClick.style.backgroundColor = event.target.className;
          firstClick.innerHTML = "";
          secondClick.style.backgroundColor = event.target.className;
          secondClick.innerHTML = "";
          sucess++;
          count = 0;
        } else {
          click.innerHTML = "";
          click.style.backgroundColor = event.target.className;
          if (count === 2) {
            setTimeout(() => {
              click.style.backgroundColor = 'white';
              click.innerHTML = '<i class="fa-solid fa-question"></i>';
              firstClick.style.backgroundColor = 'white';
              firstClick.innerHTML = '<i class="fa-solid fa-question"></i>';
              count = 0;
            }, 1 * 1000);
            secondClick = "";
          }
        }
        if (sucess === 5) {
          mainContainer.style.display = 'none';
          sucessElement.style.display = 'block';
        }
      }
    }
  }
  // when the DOM loads
  createDivsForColors(shuffledColors);
}

main();
