'use strict'

var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame

const EMPTY = ' '
const MINE = '💣'
const FLAG = '🚩'

gBoard = buildBoard()
console.log(gBoard)

function onInitGame() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }

    gBoard = buildBoard()
    renderBoard(gBoard)
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
                isMarked: true
            }
        }
    }

    board[2][2].isMine = true
    board[3][3].isMine = true


    // console.table(board)
    // console.log(board)
    return board
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {

            const cell = (board[i][j].isMine) ? MINE : " "
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
            // strHTML += `<td onclick="onCellClicked(${i},${j}) class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}



// var elNebsCount = document.querySelector('h2 span')
// elNebsCount.innerText = setMinesNegsCount(gBoard, i, j)
// elNebsCount.innerText = setMinesNegsCount(gBoard, i, j)

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
    // var elNgsCount = document.querySelector('.negs-count span')
    // elNgsCount.innerText = negsCount
    return negsCount
}

