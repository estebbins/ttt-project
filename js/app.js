// Need to respond to a click on a box and add a symbol to indicate a move
// once this has occurred, it should automatically switch to the next player
// Need to start with player1 and after they click on a box, it goes to player 2
// Need to establish which symbol is player 1 and which is player 2
// Need to switch symbols from player 1 to player 2
// Evaluate if a player wins loses or ties

// Researched how to compare arrays: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

const divResult = document.querySelector('#messages')
const move = document.querySelectorAll('.box')
const game = document.querySelector('#game')
const playableBoxes = document.querySelectorAll('.box')
const playerOneMarker = 'pink'
const playerTwoMarker = 'green'
const playerOneMoves = []
const playerTwoMoves = []
let playerOneScore = 0
let playerTwoScore = 0
let tieScore = 0
let playerOffset = 0
let moveCounter = 0
const winOne = ['box-1', 'box-2', 'box-3']
const winTwo = ['box-4', 'box-5', 'box-6']
const winThree = ['box-7', 'box-8', 'box-9']
const winFour = ['box-1', 'box-4', 'box-7']
const winFive = ['box-2', 'box-5', 'box-8']
const winSix = ['box-3', 'box-6', 'box-9']
const winSeven = ['box-1', 'box-5', 'box-9']
const winEight = ['box-3', 'box-5', 'box-7']
const winConditions = [winOne, winTwo, winThree, winFour, winFive, winSix, winSeven, winEight]

// put win conditions in an array and then loop over the array using the is in combo in check win.
const isInCombo = (array1, array2) => {
    const checkFor = (box) => {
        return array1.includes(box)
    }
    return array2.every(checkFor) 
}

const makeMove = (event) => {
    // add player1 class to the box
    // move[i].classList.add('player1')

    moveCounter++
    if (moveCounter % 2 === (0 + playerOffset)) {
        event.target.style.backgroundColor = playerTwoMarker
        event.target.classList.add('played')
        playerTwoMoves.push(event.target.id)
    } else {
        event.target.style.backgroundColor = playerOneMarker
        event.target.classList.add('played')
        playerOneMoves.push(event.target.id)
    }
    printWin(moveCounter, checkWin())

}

// Researched array includes method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

const checkWin = () => {
    for(i = 0; i < winConditions.length; i++) {
        if(isInCombo(playerOneMoves, winConditions[i]) === true) {
            return true
        } else if (isInCombo(playerTwoMoves, winConditions[i]) === true) {
            return false
        } 
    }
    return null
}
    // if (playerOneMoves.includes('box-1') && playerOneMoves.includes('box-2') && playerOneMoves.includes('box-3')){
    //     console.log('player one wins!')
    // } else if (playerOneMoves.includes('box-4'))
    // }

const printWin = (moveCounter, result) => {
    if (result === true | result === false | (result === null && moveCounter === 9)) {
        const resultBox = document.createElement('div')
        resultBox.id = 'result'
        if (result === true) {
            resultBox.textContent = "Player One Wins!"
            resultBox.style.color = playerOneMarker
            gameOver()
            playerOneScore += 1
        } else if (result === false) {
            resultBox.textContent = "Player Two Wins!"
            resultBox.style.color = playerTwoMarker
            gameOver()
            playerTwoScore += 1
        } else if (moveCounter === 9 && result === null) {
            resultBox.textContent = "It's a Tie!"
            resultBox.style.color = playerTwoMarker
            gameOver()
            tieScore += 1
        }
        divResult.appendChild(resultBox)
    }
}  

const gameOver = () => {
    for (let i = 0; i < move.length; i++) {
        move[i].classList.add('played')
    }
}

const resetGame = () => {
    newGame()
    playerOneScore = 0
    playerTwoScore = 0
    tieScore = 0
    playerOffset = 0
}

const newGame = () => {
    for (let i = 0; i < move.length; i++) {
        move[i].classList.remove('played')
        move[i].style.backgroundColor = 'white'
    }
    for (let i = 0; i < 9; i++) {
        playerOneMoves.pop()
    }
    for (let i = 0; i < 9; i++) {
        playerTwoMoves.pop()
    }
    moveCounter = 0
    const resultBox = document.getElementById('result')
    if(divResult.contains(resultBox)) {
        divResult.removeChild(resultBox)
    }

}

const changeFirstPlayer = () => {
    if (moveCounter === 0) {
        if (playerOffset === 0) {
            playerOffset = 1
        } else if (playerOffset === 1) {
            playerOffset = 0
        }
    }
}

document.querySelector('#change-first').addEventListener('click', changeFirstPlayer)

document.querySelector('#reset').addEventListener('click', resetGame)

document.querySelector('#new-game').addEventListener('click', newGame)


// To understand how to use contains method: https://www.javascripttutorial.net/dom/css/check-if-an-element-contains-a-class/

const checkPlayed = () => {
    for (let i = 0; i < move.length; i++) {
        move[i].addEventListener('click', makeMove)
    }

}
// can add "once" after makeMove and the box can only be selected once - right now, have it in the style as a pointer-event.

checkPlayed()
// move.addEventListener('click', makeMove)

// reset - remove played class, style background color back to default, reset counter to 0
