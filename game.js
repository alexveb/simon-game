var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// it allows to accepts keys to start the game from the whole page

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

// when click a button register the button you click and play sound , create animation 
// and check if is right answer

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

//checking answer if is correct then move to execute nextSequence function 

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       if (userClickedPattern.length = gamePattern.length){

            setTimeout(function (){
                nextSequence();
            }, 1000);
        } 
            } else {
        // if answer is not correct playsound wrong , title shows game over
        
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
        
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 1000);
        // you can start the game again with any button
            startOver();
        }
    }

//increase level and show it on title , generate random next button from buttonColours table and play sound

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

// create animation for each button you press
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//play a sound for buttons and game over
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

// reset level , stats and start again
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}