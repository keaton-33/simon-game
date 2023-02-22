const buttons = [$("#green"), $("#red"), $("#yellow"), $("#blue")]

const playSound = {
    "green": function () {
        let green = new Audio("sounds/green.mp3");
        green.play();
    },
    "red": function () {
        let red = new Audio("sounds/red.mp3");
        red.play();
    },
    "yellow": function () {
        let yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
    },
    "blue": function () {
        let blue = new Audio("sounds/blue.mp3");
        blue.play();
    },
    "wrong": function () {
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
    }
}

var currentSequence = [];
var speed = 1;

function genSequence(sequenceLength) {
    let newSequence = [];
    for (let i=sequenceLength; i>0; i--) {
        newSequence.push(Math.floor(Math.random() * 4));
    }
    currentSequence = newSequence;
}

function buttonAnimation (buttonObject) {
    buttonObject.fadeOut(50 * speed).fadeIn(50 * speed);
    playSound[buttonObject.attr("id")]();
}

function checkUserSequence() {
    if (JSON.stringify(userSequence) == JSON.stringify(currentSequence.slice(0, userSequence.length))) {
        console.log("True");
        return true;
    } else {
        console.log("False");
        updateHeader('GAME OVER<br>Level ' + count);
        playSound["wrong"]();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        return false;
    }
}

function clearUserSequence () {
    userSequence = [];
}

function updateHeader(string) {
    $("h1").html(string);
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playSequence() {
    for (let index = 0; index < count; index++) {
        await sleep(500 * speed);
        buttonAnimation(buttons[currentSequence[index]]);
        await sleep(500 * speed);
    }
}

var userSequence = [];
$(".btn").click(function(event) {
    if (event.currentTarget.id === buttons[0].attr("id")) {
        userSequence.push(0);
        checkUserSequence();
        runGame();
    } else if (event.currentTarget.id === buttons[1].attr("id")) {
        userSequence.push(1);
        checkUserSequence();
        runGame();
    } else if (event.currentTarget.id === buttons[2].attr("id")) {
        userSequence.push(2);
        checkUserSequence();
        runGame();
    } else if (event.currentTarget.id === buttons[3].attr("id")) {
        userSequence.push(3);
        checkUserSequence();
        runGame();
    }
})

genSequence(100);
var count = 0;

function runGame() {
    if (JSON.stringify(userSequence) == JSON.stringify(currentSequence.slice(0, count))) {
        count++;
        updateHeader('Level ' + count);
        clearUserSequence();
        playSequence();
    }

    if (speed > 0.25) {
        speed -= 0.01;
    }

    if (count === 100) {
        genSequence(100);
        clearUserSequence();
        count = 1;
    }
}

var gameStarted = false;
$(document).keypress(function(event) {
    if (!gameStarted) {
        count++;
        updateHeader('Level ' + count);
        gameStarted = true;
        playSequence();
    }
})

