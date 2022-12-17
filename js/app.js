// Need to respond to a click on a box and add a symbol to indicate a move
// once this has occurred, it should automatically switch to the next player
// Need to start with player1 and after they click on a box, it goes to player 2
// Need to establish which symbol is player 1 and which is player 2
// Need to switch symbols from player 1 to player 2
// Evaluate if a player wins loses or ties

const move = document.querySelectorAll('.box')
const game = document.querySelector('#game')
const playableBoxes = document.querySelectorAll('.box')
const playerOneMarker = 'pink'
const playerTwoMarker = 'green'
let moveCounter = 0

// const switchPlayer = () =>

const makeMove = (event) => {
    // add player1 class to the box
    // move[i].classList.add('player1')
    moveCounter++
    if (moveCounter % 2 === 0) {
        event.target.style.backgroundColor = playerTwoMarker
        event.target.classList.add('played')
    } else {
        event.target.style.backgroundColor = playerOneMarker
        event.target.classList.add('played')
        console.log(event.target.classList.contains('played'))
    }
}



// To understand how to use contains method: https://www.javascripttutorial.net/dom/css/check-if-an-element-contains-a-class/
const checkPlayed = () => {
    for (let i = 0; i < move.length; i++) {
        move[i].addEventListener('click', makeMove)
    }
}


checkPlayed()
// move.addEventListener('click', makeMove)