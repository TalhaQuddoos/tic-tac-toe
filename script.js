const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const restartButton = document.getElementById("restartButton")
let circleTurn

startGame()

const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 4, 8],
		[2, 4, 6],
		[1, 4, 7],
		[0, 3, 6],
		[2, 5, 8]
	]

restartButton.addEventListener("click", startGame)

function startGame() {
	winningMessageElement.classList.remove("show")
	circleTurn = false
	cellElements.forEach(cell => {
		cell.classList.remove('x')
		cell.classList.remove('o')
		cell.removeEventListener('click', handleClick)
		cell.addEventListener('click', handleClick, {once: true})
	})

}

function endGame(draw) {
	if(draw) {
		winningMessageTextElement.innerText = `Draw!`
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"}'s Wins!`
	}
	winningMessageElement.classList.add('show')

}

setBoardHoverClass()
function handleClick(e) {
	const cell  = e.target;
	const currentClass = circleTurn ? 'o' : 'x';
	placeMark(cell, currentClass)
	if(checkWin(currentClass)){
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapClasses()
		setBoardHoverClass()	
	}
	
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapClasses() {
	circleTurn = !circleTurn
}

function setBoardHoverClass() {
	board.classList.remove('x')
	board.classList.remove('o')
	board.classList.add(circleTurn ? 'o' : 'x')
}

function checkWin(currentClass) {
	return winningConditions.some(condition => {
		return condition.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}

function isDraw() {
	return document.querySelectorAll(`.x`).length + document.querySelectorAll('.o').length == 10
}