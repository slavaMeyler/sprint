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
}
function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(updateTimer, 1)
}

function updateTimer() {
    var currentTime = Date.now()
    var elapsedTime = currentTime - gStartTime
    var formattedTime = (elapsedTime / 1000).toFixed(3)
    document.getElementById('timer').textContent = formattedTime
}

function clearTimer() {
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

 