const buttonColors = ["green", "red", "yellow", "blue"];
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

function genSequence(sequenceLength) {
    let newSequence = [];
    for (let i=sequenceLength; i>0; i--) {
        newSequence.push(Math.floor(Math.random() * 4));
    }
    console.log("Sequence list generated | " + newSequence.length + " Length");
    console.log(newSequence)
    currentSequence = newSequence;
}

function buttonAnimation (buttonObject) {
    buttonObject.fadeOut(50).fadeIn(50);
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
        await sleep(500);
        buttonAnimation(buttons[currentSequence[index]]);
        await sleep(500);
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

genSequence(50);
var count = 0;
console.log(count);
// var gameOn = true;
// while (gameOn) {
//     await sleep(1000);
//     count++;
//
// }

function runGame() {
    if (JSON.stringify(userSequence) == JSON.stringify(currentSequence.slice(0, count))) {
        count++;
        updateHeader('Level ' + count);
        clearUserSequence();
        playSequence();
    }
}

// console.log(buttons[0])
// $(".btn").click(function(object) {
//     if (object.currentTarget.id === buttons[0].attr("id")) {
//         buttonAnimation(buttons[0])
//     } else if (object.currentTarget.id === buttons[1].attr("id")) {
//         buttonAnimation(buttons[1])
//     } else if (object.currentTarget.id === buttons[2].attr("id")) {
//         buttonAnimation(buttons[2])
//     } else if (object.currentTarget.id === buttons[3].attr("id")) {
//         buttonAnimation(buttons[3])
//     }
// })


var gameStarted = false;
$(document).keypress(function(event) {
    if (!gameStarted) {
        count++;
        updateHeader('Level ' + count);
        gameStarted = true;
        playSequence();
    }
})

