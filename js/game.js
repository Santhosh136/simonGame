buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
score = 0;
started = false;
level = 0;

function playSound(colorName) {
	let audio = new Audio("sounds/"+colorName+".mp3");
	audio.play();
}

function nextSequence() {
	let randomNumber = (Math.floor(4*Math.random()));
	let randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$("#"+randomChosenColor).fadeOut(200).fadeIn(200);
	playSound(randomChosenColor);
	animatePress(randomChosenColor);
	score += (level * 10);

	level++;
	$("h1").text("level "+level+" * score:"+score);
	
}

function checkAnswer(currentLevel) {
	if( gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		// console.log("success");	
		if( userClickedPattern.length === gamePattern.length ) {

			setTimeout( function() {
				userClickedPattern = [];
				nextSequence();
			}, 1000);

		}	
	}
	else {
		$("h1").text("Game over");
		alert("Welldone!!  Your score is "+score);
		restartGame();
	}
}

function restartGame() {
	userClickedPattern = [];
	gamePattern = [];
	started = false;
	level = 0;
	score = 0;
	setTimeout( function() {
		$("h1").text("Press A Key to Start");
	}, 1000);		
}

function animatePress(currentColor) {
	$("."+currentColor).addClass("pressed");
	setTimeout(function() {
		$("."+currentColor).removeClass("pressed");	
	}, 100);
}

$(".btn").on("click", function() {
		let userChosenColor = $(this).attr('id');
		userClickedPattern.push(userChosenColor);
		playSound(userChosenColor);
		animatePress(userChosenColor);

		checkAnswer(userClickedPattern.length - 1);
});



$(document).on("keydown", function() {
	if(started === false) {
		started = true;
		$("h1").text("level "+level);
		nextSequence();
	}
});

