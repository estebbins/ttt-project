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

// const switchPlayer = () =>

const makeMove = (event) => {
    // add player1 class to the box
    // move[i].classList.add('player1')
    event.target.style.backgroundColor = playerOneMarker

}

for (let i = 0; i < move.length; i++) {

        move[i].addEventListener('click', makeMove)

}

// move.addEventListener('click', makeMove)