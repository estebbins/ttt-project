// Researched how to compare arrays: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

// Create DOM constants
const divMessages = document.querySelector('#messages')
const divGame = document.querySelectorAll('.box')
const newGameButton = document.querySelector('#new-game')
const changeFirstButton = document.querySelector('#change-first')
const resetButton = document.querySelector('#reset')

// Style Player Markers
const playerXMarker = "url('https://cdn.pixabay.com/photo/2020/09/13/19/08/letter-x-5569116_960_720.png')"
const playerOMarker = "url('https://cdn.pixabay.com/photo/2020/09/13/19/13/letter-5569138_960_720.png')"

// Create game statistics
const playerXMoves = []
const playerOMoves = []
let playerXScore = 0
let playerOScore = 0
let tieScore = 0
let playerOffset = 0
let moveCounter = 0

// Create win conditions & combine into array
const winOne = ['box-1', 'box-2', 'box-3']
const winTwo = ['box-4', 'box-5', 'box-6']
const winThree = ['box-7', 'box-8', 'box-9']
const winFour = ['box-1', 'box-4', 'box-7']
const winFive = ['box-2', 'box-5', 'box-8']
const winSix = ['box-3', 'box-6', 'box-9']
const winSeven = ['box-1', 'box-5', 'box-9']
const winEight = ['box-3', 'box-5', 'box-7']
const winConditions = [winOne, winTwo, winThree, winFour, winFive, winSix, winSeven, winEight]

const makeMove = (event) => {
    // Grey out change-first button 
    changeFirstButton.style.backgroundColor = 'grey'
    // Change new game button to apricot
    newGameButton.style.backgroundColor = '#e6a176'
    // Increase move counter
    moveCounter++
    // Identify which player's move it is based on move counter & player offset
    if (moveCounter % 2 === (0 + playerOffset)) {
        // Style player selection
        event.target.style.backgroundImage = playerOMarker
        event.target.style.backgroundSize = '80%'
        // Add class to div to deactivate click in CSS
        event.target.classList.add('played')
        // Push move into Player's game array
        playerOMoves.push(event.target.id)
        // Style the indicators in the stats div to indicate which player is next
        document.querySelector('#pX-indicator').style.fontWeight = 'bolder'
        document.querySelector('#pO-indicator').style.fontWeight = 'normal'
    } else {
        // Style player selection
        event.target.style.backgroundImage = playerXMarker
        // Add class to div to deactivate click in CSS
        event.target.classList.add('played')
        // Push move into Player's game array
        playerXMoves.push(event.target.id)
        // Style the indicators in the stats div to indicate which player is next
        document.querySelector('#pO-indicator').style.fontWeight = 'bolder'
        document.querySelector('#pX-indicator').style.fontWeight = 'normal'
    }
    // Call print win function to determine if win result and assess move counter
    // in the case of a tie, which should not be assessed until all 9 moves have been made
    // and evaluated
    printWin(moveCounter, checkWin())

}

// Function to display results
const printWin = (moveCounter, result) => {
    // If checkWin results in true or false, or if all moves have been made and no win is foung
    if (result === true | result === false | (result === null && moveCounter === 9)) {
        // Create div to display the results of the game & apply an id of result
        const resultBox = document.createElement('div')
        resultBox.id = 'result'
        if (result === true) {
            // If player X wins, add & style the text in the result div, increase the score counter and end the game
            resultBox.textContent = "Player X Wins!"
            resultBox.style.color = 'rgb(51, 201, 206)'
            playerXScore += 1
            gameOver()
        } else if (result === false) {
            // If player O wins, add & style the text in the result div, increase the score counter and end the game
            resultBox.textContent = "Player O Wins!"
            resultBox.style.color = '#cdcdcd'
            playerOScore += 1
            gameOver()
        } else if (moveCounter === 9 && result === null) {
            // If neither player wins, add & style the text in the result div, increase the score counter and end the game. Apply complimentary textShadow to override default
            resultBox.textContent = "It's a Tie!"
            resultBox.style.color = '#e6a176'
            resultBox.style.textShadow = '1px 1px 2px #984464'
            tieScore += 1
            gameOver()
        }
        // Append the result div to the messages div
        divMessages.appendChild(resultBox)
    }
}  

// function to compare two arrays
const findWinCombo = (array1, array2) => {
    const checkFor = (box) => {
        return array1.includes(box)
    }
    return array2.every(checkFor) 
}

// Function to compare player arrays to win combos. 
const checkWin = () => {
    // Return unique values based on results - X win = true, O win = false
    for(i = 0; i < winConditions.length; i++) {
        if(findWinCombo(playerXMoves, winConditions[i]) === true) {
            return true
        } else if (findWinCombo(playerOMoves, winConditions[i]) === true) {
            return false
        } 
    }
    // No win returns null
    return null
}

const gameOver = () => {
    // When the game ends in win/lose/tie, deactivate clicks on remaining boxes
    for (let i = 0; i < divGame.length; i++) {
        divGame[i].classList.add('played')
    }
    // Show the updated scores in the stats divs
    document.querySelector('#player-X').textContent = `${playerXScore}`
    document.querySelector('#player-O').textContent = `${playerOScore}`
    document.querySelector('#tie').textContent = `${tieScore}`
    // Style the new game button to indicate to user they should click it
    newGameButton.style.backgroundColor = '#82981e'
}

const newGame = () => {
    // Once clicked, the new game button turns grey since a new game already started, though can still be used
    newGameButton.style.backgroundColor = 'grey'
    // Remove played tags & images from all boxes & return to default color
    for (let i = 0; i < divGame.length; i++) {
        divGame[i].classList.remove('played')
        divGame[i].style.backgroundImage = 'none'
    }
    // Empty player arrays 
    for (let i = 0; i < 9; i++) {
        playerXMoves.pop()
        playerOMoves.pop()
    }
    // reset move counter to 0
    moveCounter = 0
    // Remove resultBox from the messages div
    const resultBox = document.getElementById('result')
    if(divMessages.contains(resultBox)) {
        divMessages.removeChild(resultBox)
    }
    // Style change first button to indicate it can be selected
    changeFirstButton.style.backgroundColor = '#82981e'
    // Bold the first player based on whether there is an offset or not
    if (playerOffset === 0) {
        document.querySelector('#pX-indicator').style.fontWeight = 'bolder'
        document.querySelector('#pO-indicator').style.fontWeight = 'normal'
    } else {
        document.querySelector('#pO-indicator').style.fontWeight = 'bolder'
        document.querySelector('#pX-indicator').style.fontWeight = 'normal'
    }
}

// Function to restart statistic tracking
const resetGame = () => {
    // Call new game function
    newGame()
    // Reset remaining statistics
    playerXScore = 0
    playerOScore = 0
    tieScore = 0
    // Reset player offset to default
    playerOffset = 0
    // Reset statistics displayed on the screen
    document.querySelector('#player-X').textContent = `${playerXScore}`
    document.querySelector('#player-O').textContent = `${playerOScore}`
    document.querySelector('#tie').textContent = `${tieScore}`
}

// Function to change which player X or O will start the game
const changeFirstPlayer = () => {
    // This can only be used when the game is new (move counter = 0)
    if (moveCounter === 0) {
        // Alternate between the players using the offset of 0 or 1
        if (playerOffset === 0) {
            // Change to player O
            playerOffset = 1
            // Change button text to alternate player to indicate what the button will do
            changeFirstButton.textContent = 'Change First to: X'
            // Style the next player in bold in the stats div
            document.querySelector('#pX-indicator').style.fontWeight = 'normal'
            document.querySelector('#pO-indicator').style.fontWeight = 'bolder'
        } else if (playerOffset === 1) {
            // Change to player X
            playerOffset = 0
            // Change button text to alternate player to indicate what the button will do
            changeFirstButton.textContent = 'Change First to: O'
            // Style the next player in bold in the stats div
            document.querySelector('#pX-indicator').style.fontWeight = 'bolder'
            document.querySelector('#pO-indicator').style.fontWeight = 'normal'
        }
    }
}

// Create event listeners for buttons
changeFirstButton.addEventListener('click', changeFirstPlayer)

resetButton.addEventListener('click', resetGame)

newGameButton.addEventListener('click', newGame)

// Create event listeners for each box on the game board
for (let i = 0; i < divGame.length; i++) {
    divGame[i].addEventListener('click', makeMove)
}

// Researched array includes method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

// To understand how to use contains method: https://www.javascripttutorial.net/dom/css/check-if-an-element-contains-a-class/
