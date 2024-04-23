var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// var randomChosenColor = buttonColors[nextSequence()];
// gamePattern.push(randomChosenColor);

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level+=1;

    $('#level-title').text(`Level ${level}`);
};

$('.btn').on('click', function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    $(`#${name}`).append("<audio></audio>");
    $(`#${name} audio`).attr('src', `./sounds/${name}.mp3`);
    $(`#${name} audio`).get(0).play();
};

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(function () {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
};

$(document).on('keydown', function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    } 
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        console.log("wrong");
        $('body').append("<audio></audio>");
        $(`body audio`).attr('src', `./sounds/wrong.mp3`);
        $(`body audio`).get(0).play();
        $(`body`).addClass('game-over');
        setTimeout(function () {
            $(`body`).removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}