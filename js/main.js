'use strict'

var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame
var gStartTime
var gTimerInterval
var isVictory

const EMPTY = ' '
const MINE = '💣'
const FLAG = '🚩'

gBoard = buildBoard()
console.log(gBoard)

function onInitGame() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: gLevel.SIZE ** 2,
        secsPassed: 0
    }
    gBoard = buildBoard()

    renderBoard(gBoard)
    startTimer()

    // stopTimer()
}

// function play() {
//     gBoard = runGeneration(gBoard)
//     renderBoard(gBoard)
// }


function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }

    // mines loop:
    for (var i = 0; i < gLevel.MINES; i++) {
        var mine = board[getRandomInt(0, gLevel.SIZE - 1)][getRandomInt(0, gLevel.SIZE - 1)]
        mine.isMine = true
    }

    // board[2][2].isMine = true
    // board[3][3].isMine = true

    // console.table(board)
    // console.log(board)
    return board
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var minesAroundCount = setMinesNegsCount(board, i, j)
            var cell = board[i][j]
            cell.minesAroundCount = (cell.isMine) ? MINE : minesAroundCount

            const className = `cell cell-${i}-${j}`

            strHTML += `<td onclick="onCellClicked(this, ${i}, ${j})"
            onclick="onCellMarked(this, ${i}, ${j})"
            oncontextmenu="onCellMarked(this, ${i}, ${j})" class="${className}">
            <span class="hidden">${cell.minesAroundCount}</span></td>`

        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}



runNegs(gBoard)
function runNegs(board) {

    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            // var numOfNegs = setMinesNegsCount(gBoard, i, j)
            // console.log(numOfNegs)
            // console.log(  board[i][j].minesAroundCount)
            board[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
        }
    }
    // return numOfNegs
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var negsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) negsCount++
        }
    }
    return negsCount
}

function onCellClicked(elCell, i, j) {
    const cell = gBoard[i][j];
    // console.log(cell)
    if (!cell.isMine) {
        cell.isShown = true;
        var elSpan = elCell.querySelector('span')
        elSpan.classList.remove('hidden')
    } else {
        cell.isShown = true;
        var elSpan = elCell.querySelector('span')
        elSpan.classList.remove('hidden')
        isVictory
        gameOver()
    }
}

function onCellMarked(elCell, i, j) {
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Prevent the default context menu behavior
    });

    gBoard[i][j].isMarked = true
    elCell.innerHTML = FLAG
    gGame.markedCount--

    var elSpan = document.querySelector('.marked')
    elSpan.innerText = gGame.markedCount

    // const cell = gBoard[i][j];
    // if (cell.isMarked) {
    //     cell.isMarked = true;
    // }
    // console.log( gBoard[i][j])
    // console.log(gBoard)
    console.log(gGame.markedCount)
}


function gameOver() {
    console.log('Game Over')
    stopTimer()
    // var msg = gGame.isVictory ? 'You Won!!!' : 'Game Over'
    // var msg = 'Game Over'
    gGame.isOn = false
}



