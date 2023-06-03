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
var LIVES= 3

var bestTime4 = Infinity
var bestTime8 = Infinity
var bestTime12 = Infinity
var formattedTime
var elapsedTime


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
    var elSpan = document.querySelector('.marked')
    elSpan.innerText = gGame.markedCount

    var elSpan = document.querySelector('.restart-btn');
    elSpan.innerText ='😀';
    
    var elSpan = document.querySelector('.lives');
    elSpan.innerText =`${LIVES} lives left`;

    clearTimer()
    // startTimer()

    closeModal()
    isVictory = true
    renderBoard(gBoard)




}

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
    // startTimer()
    // console.log(cell)
    if (!cell.isMine) {
        cell.isShown = true;
        var elSpan = elCell.querySelector('span')
        elSpan.classList.remove('hidden')
        gGame.shownCount++

        if (gGame.shownCount === 1) startTimer()
        console.log(gGame.shownCount)

        if (gGame.shownCount === (gLevel.SIZE ** 2 - gLevel.MINES)) {
            // console.log(isVictory)
            var elSpan = document.querySelector('.restart-btn');
            elSpan.innerText ='😎';
            gameOver()
        }

    } else {
        cell.isShown = true;
        LIVES--
        var elSpan = document.querySelector('.lives');
             elSpan.innerText =`${LIVES} lives left`;
        if(LIVES==0){
        var elSpan = elCell.querySelector('span')
        elSpan.classList.remove('hidden')
        isVictory = false
        console.log(isVictory)
        // stopTimer()
        var elSpan = document.querySelector('.restart-btn');
             elSpan.innerText ='🤯';
        gameOver()
    }
}
}
// ניסיתי המון זמן לעשות לולאה שתפתח את כל הפצצות לא הצלחתי







function onCellMarked(elCell, i, j) {
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Prevent the default context menu behavior
    });

    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false;
        elCell.innerHTML = "";
        gGame.markedCount++;
    } else {
        gBoard[i][j].isMarked = true;
        elCell.innerHTML = FLAG;
        gGame.markedCount--;
    }

    var elSpan = document.querySelector('.marked');
    elSpan.innerText = gGame.markedCount;
}

function gameOver() {
    stopTimer()
    var msg = isVictory ? 'You Won!!!' : 'Game Over'
    console.log(msg)
    openModal(msg)
    gGame.isOn = false
    isVictory = true
    LIVES=3


    // בהתחלה עשיתי עם פורמטד טיים , כאשר היתה ירידה בתוך טווח של מעל 10 שניות  הכל עבד. כאשר משיא של מעל 10 היה יורד למתחת ל10 לא היה מופיע שיא
    if (gGame.shownCount === (gLevel.SIZE ** 2 - gLevel.MINES) && bestTime4 > elapsedTime && gLevel.SIZE === 4) {
        // console.log(formattedTime)
        bestTime4 = elapsedTime
        console.log(bestTime4)
        var elBtn4 = document.querySelector(".level4")
        elBtn4.innerText = `Record for difficalty ${gLevel.SIZE} is: ${bestTime4}`
        // console.log(`Record for difficalty ${gLevel.SIZE} is: ${bestTime}`)
    }
    if (gGame.shownCount === (gLevel.SIZE ** 2 - gLevel.MINES) && bestTime8 > elapsedTime && gLevel.SIZE === 8) {
        bestTime8 = elapsedTime
        var elBtn8 = document.querySelector(".level8")
        elBtn8.innerText = `Record for difficalty ${gLevel.SIZE} is: ${bestTime8}`
    }
    if (gGame.shownCount === (gLevel.SIZE ** 2 - gLevel.MINES) && bestTime12 > elapsedTime && gLevel.SIZE === 12) {
        bestTime12 = elapsedTime
        var elBtn12 = document.querySelector(".level12")
        elBtn12.innerText = `Record for difficalty ${gLevel.SIZE} is: ${bestTime12}`
    }
}
// לא הצלחתי לעשות עם הסטורדג'
function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elMsg = elModal.querySelector('.msg')
    if (msg === 'Game Over') {
        elModal.style.backgroundColor = 'FireBrick'
    } else {
        elModal.style.backgroundColor = 'SeaGreen'
    }
    elMsg.innerText = msg
    elModal.style.display = 'block'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}


