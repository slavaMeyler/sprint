'use strict'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function stopTimer() {
    clearInterval(gTimerInterval)
}


function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(updateTimer, 1)
}

function updateTimer() {
    var currentTime = Date.now()
    elapsedTime = currentTime - gStartTime
     formattedTime = (elapsedTime / 1000).toFixed(3)
    document.getElementById('timer').textContent = formattedTime
}





    function clearTimer() {
        gameOver()      //הפונקציה עובדת, אבל בקונסול לוג מופיע שניצחתי.אם יהיה זמן אתקן
        closeModal()
        document.getElementById('timer').textContent = (0 / 1000).toFixed(3)
    }

function resetNums() {
    const nums = []
    for (var i = 1; i <= gSize ** 2; i++) {
        nums.push(i)
    }
    return shuffle(nums)
}

function drawNum() {
    return gNums.pop()
}

function shuffle(items) {
    var randIdx, keep
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length)
        keep = items[i]
        items[i] = items[randIdx]
        items[randIdx] = keep
    }
    return items
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


//   function bestTime(){
//     var bestTime =-Infinity
//     if (bestTime<timer){
//         bestTime=timer
//     }
//   }

function chooseLevel(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    closeModal()
    onInitGame()
    stopTimer()
    clearTimer()
}



// function onCellMarked(elCell, i, j) {
//     document.addEventListener("contextmenu", function (event) {
//         event.preventDefault(); // Prevent the default context menu behavior
//     });

//     gBoard[i][j].isMarked = true
//     elCell.innerHTML = FLAG
//     gGame.markedCount--
//     console.log(gGame.markedCount)

//     var elSpan = document.querySelector('.marked')
//     elSpan.innerText = gGame.markedCount
//     // console.log(gBoard[i][j].isMarked)
// }



//BDIKA
// function onCellMarkedCancel (elCell, i, j){
//  if ( gBoard[i][j].isMarked){
//     elCell.innerHTML = " "
//     gGame.markedCount++
//     console.log(gGame.markedCount)
//     var elSpan = document.querySelector('.marked')
//     elSpan.innerText = gGame.markedCount
// }
// }

// if (gGame.shownCount > 0) {
//     startTimer()
// }
