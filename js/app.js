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
const newGameButton = document.querySelector('#new-game')

const playerOneMarker = "url('https://cdn.pixabay.com/photo/2020/09/13/19/08/letter-x-5569116_960_720.png')"
const playerTwoMarker = "url('https://cdn.pixabay.com/photo/2020/09/13/19/13/letter-5569138_960_720.png')"
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
    document.querySelector('#change-first').style.backgroundColor = 'grey'
    newGameButton.style.backgroundColor = 'yellow'
    moveCounter++
    if (moveCounter % 2 === (0 + playerOffset)) {
        event.target.style.backgroundImage = playerTwoMarker
        event.target.style.backgroundSize = '80%'
        event.target.classList.add('played')
        playerTwoMoves.push(event.target.id)
        document.querySelector('#p1-indicator').style.fontWeight = 'bolder'
        document.querySelector('#p2-indicator').style.fontWeight = 'normal'
    } else {
        event.target.style.backgroundImage = playerOneMarker
        event.target.classList.add('played')
        playerOneMoves.push(event.target.id)
        document.querySelector('#p2-indicator').style.fontWeight = 'bolder'
        document.querySelector('#p1-indicator').style.fontWeight = 'normal'
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
            resultBox.style.color = 'magenta'
            playerOneScore += 1
            gameOver()
        } else if (result === false) {
            resultBox.textContent = "Player Two Wins!"
            resultBox.style.color = 'blue'
            playerTwoScore += 1
            gameOver()
        } else if (moveCounter === 9 && result === null) {
            resultBox.textContent = "It's a Tie!"
            resultBox.style.color = 'red'
            tieScore += 1
            gameOver()
        }
        divResult.appendChild(resultBox)
    }
}  

const gameOver = () => {
    for (let i = 0; i < move.length; i++) {
        move[i].classList.add('played')
    }
    document.querySelector('#player-one').textContent = `${playerOneScore}`
    document.querySelector('#player-two').textContent = `${playerTwoScore}`
    document.querySelector('#tie').textContent = `${tieScore}`
    newGameButton.style.backgroundColor = 'green'
}

const resetGame = () => {
    newGame()
    playerOneScore = 0
    playerTwoScore = 0
    tieScore = 0
    playerOffset = 0
    document.querySelector('#player-one').textContent = `${playerOneScore}`
    document.querySelector('#player-two').textContent = `${playerTwoScore}`
    document.querySelector('#tie').textContent = `${tieScore}`
}

const newGame = () => {
    newGameButton.style.backgroundColor = 'grey'
    for (let i = 0; i < move.length; i++) {
        move[i].classList.remove('played')
        move[i].style.backgroundImage = 'none'
        move[i].style.backgroundColor = 'pink'
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
    document.querySelector('#change-first').style.backgroundColor = 'green'
    if (playerOffset === 0) {
        document.querySelector('#p1-indicator').style.fontWeight = 'bolder'
    } else {
        document.querySelector('#p2-indicator').style.fontWeight = 'bolder'
    }
}

const changeFirstPlayer = () => {

    if (moveCounter === 0) {
        if (playerOffset === 0) {
            playerOffset = 1
            document.querySelector('#change-first').textContent = 'Change First to: Player 1'
            document.querySelector('#p1-indicator').style.fontWeight = 'normal'
            document.querySelector('#p2-indicator').style.fontWeight = 'bolder'

        } else if (playerOffset === 1) {
            playerOffset = 0
            document.querySelector('#change-first').textContent = 'Change First to: Player 2'
            document.querySelector('#p1-indicator').style.fontWeight = 'bolder'
            document.querySelector('#p2-indicator').style.fontWeight = 'normal'
        }
    }
    console.log(playerOffset)
}

document.querySelector('#change-first').addEventListener('click', changeFirstPlayer)

document.querySelector('#reset').addEventListener('click', resetGame)

newGameButton.addEventListener('click', newGame)


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
