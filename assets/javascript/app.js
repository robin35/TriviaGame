// ==============================================================================================================================
// INITIALIZE GLOBAL VARIABLES
// ==============================================================================================================================

// Question Arrays Global Values
var questionArray = [];
var choiceArray = [ [] ];

var qArrayLength;
var cArrayLength;

// Timer Global Values
var timer;
var counter = 30;
var pause1;
var pause2;

// Screen Display Global Values
var index = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeExpired = false;
var answerSelected;


// ==============================================================================================================================
// SET QUESTION ARRAY
// ==============================================================================================================================

setArray = function () {

    questionArray = [
        "Which is inside the John F Kennedy Memorial?", 
        "What was the original name of the \"Hoop-It-Up\" event promoted by D Magazine?", 
        "What is oil baron Lamar Hunt credited for naming?", 
        "What was the original name of the Dallas Cowboys?"
    ]

    choiceArray = [
        ["A statute of JFK",
        "A statute of Jackie-O",
        "A granite block with JFK's name inscribed",
        "A granite block with Jackie-O's name inscribed",
        "A granite block with JFK's name inscribed",
        "Kennedy family friend, Philip Johnson, designed the memorial as a place of quite thought and contemplation. Inside it sits a large granite square inscribed with Kennedy's name. Whether you love it or hate it...Jackie-O approved it."
        ],
    
        ["Woop-Dee-Do",
        "Hoop-D-Do",
        "Slamma-Jamma",
        "Dunk-It",
        "Hoop-D-Do",
        "In 1986 D Magazine Publisher, Terry Murphy, founded the tournament which he heavily promoted nation-wide and globally. Now it's the largest participatory basketball event in the world. Not only that, in 2020, the event will become an Olympic sport! Way to go Terry!"
        ],
    
        ["Super Bowl",
        "Trinity River",
        "Reunion Arena",
        "Fair Park",
        "Super Bowl",
        "Lamar wrote to the NFL commissioner that he kiddlingly called the AFL-NFL mash-up the \"Super Bowl\" after seeing his children playing with a Super Ball toy. The name stuck and the rest is history."
        ],
    
        ["The Dallas Bluebonnets",
        "The Dallas Steers",
        "The Dallas Buckeroos",
        "The Dallas Longhorns",
        "The Dallas Steers",
        "The team was formed in 1960 with the name The Dallas Steers. This was quickly changed when the team's general manager decided he didn't want a castrated steer as a mascot. Lucky steer!"
        ]    
    ]

    qArrayLength = questionArray.length;
    cArrayLength = choiceArray.length;
    
}


// ==============================================================================================================================
// DISPLAY INITIAL SCREEN FUNCTION
// ==============================================================================================================================

initialScreen = function() {

    $( "#js-screen" ).html("<p>So you think you know all there is to know about Dallas?</p><br>");
    $( "#js-screen" ).append("<p>Well, here\'s a little trivia to test your knowledge.</p><br>");
    $( "#js-screen" ).append("<p>Show that you know!</p><br>");
    $( "#js-screen" ).append( "<p>OR</p><br>");
    $( "#js-screen" ).append( "<p>You Don't Know \"This\"!</p><br><br>");
    $( "#js-screen" ).append("<p>Are you up for the challenge?</p><br>");

    $( "#js-screen" ).append( "<button class = 'b-buttonStart' id = 'js-startGame' type='button'>Click Me to Get Started!</button>");

}


// ==============================================================================================================================
// PLAY GAME FUNCTION
// ==============================================================================================================================

playGame = function() {

    console.log("counter-entering playGame function", counter);
    // Display question


    $( "#js-screen" ).html( "<h3>Time Remaining <span class ='js-timer'>"+counter+"</span> Seconds</h3><br>");

    $( "#js-screen" ).append( "<p>"+questionArray[index]+"</p>");
    $( "#js-screen" ).append( "<button class = 'js-choice js-choice0' type='button'>"+choiceArray[index][0]+"</button><br>" );
    $( "#js-screen" ).append( "<button class = 'js-choice js-choice1' type='button'>"+choiceArray[index][1]+"</button><br>" );
    $( "#js-screen" ).append( "<button class = 'js-choice js-choice2' type='button'>"+choiceArray[index][2]+"</button><br>" );
    $( "#js-screen" ).append( "<button class = 'js-choice js-choice3' type='button'>"+choiceArray[index][3]+"</button><br>" );


  
    $( ".js-choice0" ).on( "click", function() {
        answerSelected = choiceArray[index][0];
        answer();
        return false;
    })

    $( ".js-choice1" ).on( "click", function() {
        answerSelected = choiceArray[index][1];
        answer();
        return false;
    })

    $( ".js-choice2" ).on( "click", function() {
        answerSelected = choiceArray[index][2];
        answer();
        return false;
    })

    $( ".js-choice3" ).on( "click", function() {
        answerSelected = choiceArray[index][3];
        answer();
        return false;
    })


    console.log("counter-at timer initial value", counter);

    // Set Timer's initial value
    

    // Timer count down function
    function countDown() {

        counter--;
        $( ".js-timer" ).html( counter );
        
        if( counter === 0 ) {
            unanswered++;
            timeExpired = true;
            clearInterval(timer);
            noAnswer();
            return false;
        }
    }

    timer = setInterval( countDown, 1000 );

    return false;
}



// ==============================================================================================================================
// ANSWERED FUNCTION
// ==============================================================================================================================

answer = function() {

    console.log("counter-entering answer function", counter);

    clearInterval(timer); 

    var correctAnswer;

    for( var i = 0; i < cArrayLength; i++ ) {
    
        if ( answerSelected === choiceArray[index][4] ) {
            $( "#js-screen" ).html( "<p>Congratulations, "+choiceArray[index][4]+" is corect!</p><br>" );
            $( "#js-screen" ).append( "<p>Facts to Know:<p><br>" );
            $( "#js-screen" ).append( "<p>"+choiceArray[index][5]+"</button><br><br>" );
            correctAnswer = "Yes";
        }
    
        else {
            $( "#js-screen" ).html( "<p>Nope, that's not it.</p><br>" );
            $( "#js-screen" ).append( "<p>The correct answer is: "+choiceArray[index][4]+"</p><br>" );
            $( "#js-screen" ).append( "<p>Facts to Know:<p><br>" );
            $( "#js-screen" ).append( "<p>"+choiceArray[index][5]+"</button><br><br>" );
            correctAnswer = "No";
            }
    }

    if(correctAnswer === "Yes") {
        correct++;
    }
    else if(correctAnswer === "No") {
        incorrect++;
    }
    
    correctAnswer = "";

    // Increment index
    index++;

    // Pause execution for 15 seconds
    pause1 = setTimeout( gameOverCheck, 15000 );

    return false;
}


// ==============================================================================================================================
// NOT ANSWERED FUNCTION
// ==============================================================================================================================

noAnswer = function() {
   
    console.log("counter-entering noanswer function", counter);

    // Display answer for questions where the time has expired

    console.log("timeexpired", timeExpired);

    if ( timeExpired === true ) {
        $( "#js-screen" ).html( "<p>Time\'s Up! The clock beat you!</p><br>" );
        $( "#js-screen" ).append( "<p>Here\'s the correct answer:</p><br>" );
        $( "#js-screen" ).append( "<p>"+choiceArray[index][4]+"</button><br><br>" );
        $( "#js-screen" ).append( "<p>"+choiceArray[index][5]+"</button><br>" );
    }

    // Increment index
    index++;

    // Reset timeExpired
    timeExpired = false;

    // Pause execution for 15 seconds
    pause2 = setTimeout( gameOverCheck, 15000 );

    return false;

}



// ==============================================================================================================================
// GAME OVER CHECK FUNCTION
// ==============================================================================================================================

gameOverCheck = function() {
    
    clearTimeout(pause1);
    clearTimeout(pause2);
    
    if( index === qArrayLength ) {
        summary();
        return false;
    }
    else {
        counter = 30;
        playGame();
        return false;
    }
}



// ==============================================================================================================================
// SUMMARY FUNCTION
// ==============================================================================================================================

summary = function() {

    clearTimeout(pause1);
    clearTimeout(pause2);
    clearInterval(timer);

    $( "#js-screen" ).html("<p>All done, here's how you did!</p><br>");
    $( "#js-screen" ).append("<p>Correct Answers: "+correct+"</p><br>");
    $( "#js-screen" ).append("<p>Incorrect Answers: "+incorrect+"</p><br>");
    $( "#js-screen" ).append( "<p>Unanswered: "+unanswered+"</p><br>");

    $( "#js-screen" ).append( "<button class = 'b-buttonStart' id = 'js-startGame' type='button'>I want to try again</button>");

    counter = 30;
    index = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    timeExpired = false;
    answerSelected = "";

    $( "#js-startGame" ).on( "click", function() {
        playGame();
        return false;
    })
}





// ==============================================================================================================================
// MAIN PROCESS
// ==============================================================================================================================

setArray();

initialScreen();

// Onclick event starts the game

$( "#js-startGame" ).on( "click", function() {
    playGame();

    return false;
})
