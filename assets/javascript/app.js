$(document).ready(function(){

let startButton = $("#start-button");
let timeRemainingDiv = "";
startButton.on("click", startGame);
let questionArray = ["A nurse is reviewing the common emergency protocol.  For clients who has asystole, which of the following actions should the nurse plan to take?",
                    "What is the capital of California?",
                    "How many items belong in a dozen?",
                    "When did the War of 1812 start?",
                    "When did the War of 1812 end?",
                    "If there are 100 centimeters in a meter, how many cubic centimeters are in 100 cubic meters?",
                    "What was the name of the first drummer of The Beatles?"];
let answerArray = [["Administer IV epinephrine", "Perform defibrillation", "Prepare for transcutaneous pacing", "Elevate the clients lower extremities."],
                    ["Sacramento", "New York City", "Albequerque", "Riverside"],
                    ["Twelve", "Seven", "Fifteen", "Eighteen"],
                    ["1812", "1810", "1800", "2016"],
                    ["1815", "1812", "1813", "Trick question, it never ended"],
                    ["100,000,000", "1", "100,000", "3.141592654"],
                    ["Pete Best", "John Great", "George Mediocre", "Ringo Starr"]];
let numCorrectAnswers = 0;
let numIncorrectAnswers = 0;
let numUnansweredAnswers = 0;
let buttonClicked = false;

function startGame() {
    startButton.remove();
    timeRemainingDiv = $("<h3>");
    timeRemainingDiv.appendTo("body");
    timeRemainingDiv.text("Time Remaining: 30 Seconds");
    startTimer(45);
    for (i = 0; i < questionArray.length; i++) {
        createQuestion(questionArray[i], answerArray);
    }
    doneButtonDiv = $("<div>").appendTo("body");
    doneButtonDiv.attr("class", "button-div");
    doneButton = $("<button>");
    doneButton.text("Done");
    doneButton.attr("class", "btn");
    doneButton.appendTo(doneButtonDiv);
    doneButton.on("click", doneButtonClick);
}

function checkAnswers() {
    for(let i = 0; i < questionArray.length; i++) {
        if (!($(".answers" + i).is(':checked'))) {
            console.log("None have been checked")
            numUnansweredAnswers++;
        }
        else if ($("#answer" + i).is(':checked')) {
            console.log("correct answer");
            numCorrectAnswers++;
        }
        else {
            console.log("incorrect answer");
            numIncorrectAnswers++;
        }
    }
}

function doneButtonClick() {
    buttonClicked = true;
    endGame();
}

function endGame() {
    checkAnswers();
    $("body").empty();
    headerDiv = $("<h1>").appendTo("body");
    headerDiv.text("Trivia Game");
    allDoneDiv = $("<h3>").appendTo("body");
    if (buttonClicked) {
        allDoneDiv.text("All Done!");
    }
    else {
        allDoneDiv.text("Times Up!");
    }

    correctAnswers = $("<p>").appendTo("body");
    correctAnswers.text("Correct Answers: " + numCorrectAnswers);
    IncorrectAnswers = $("<p>").appendTo("body");
    IncorrectAnswers.text("Incorrect Answers: " + numIncorrectAnswers);
    unansweredAnswers = $("<p>").appendTo("body");
    unansweredAnswers.text("Unanswered Answers: " + numUnansweredAnswers);
}

function startTimer(seconds) {
    let timer = setInterval(function() {
        seconds--;
        timeRemainingDiv.text("Time Remaining: " + seconds + " Seconds");
        if (seconds < 0 && !buttonClicked) {
            endGame();
            clearInterval(timer);
        }
    }, 1000);
}

function createQuestion(question, answers) {
    questionDiv = $("<div>").appendTo("body");
    questionDiv.text(question);
    answerDiv = $("<span>").appendTo("body");
    for (let j = 0; j < answers[i].length; j++) {
        let answerElement = ""
        if (j === 0) {
            answerElement = "id=answer" + i;
        }
        inputDiv = "<input type=radio name=answers" + i + " class=answers" + i + " " + answerElement + ">" + " " + answers[i][j] + " " + " ";
        answerDiv.append(inputDiv);
    }
}

});
