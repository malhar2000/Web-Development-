//game on or off
let playing = false;

//user Score
let score;

//User life left
let trailsleft;

//# of steps to move the fruit per 10 milli secs
let step;

//set Interval function
let action;

//for mute or unmute activity
let sound;


/**
 * Main fucntion
 * (if)Check 1. sees if the user is already plaing the game or not. Just reload the game
 *  (else)Check 2. Starting a New game session
 */
$(function () {
    $("#startreset").on("click", function () {
        if (playing == true) {
            location.reload();
        } else {
            sound = true;
            playing = true;

            //hide hte modal msg from last gameover event
            $("#gameover").hide();
            //show the volume on and off btn
            $(".volume").show();
            //set the volume btn to on at start
            $(".volume").button({
                icon: "ui-icon-volume-on"
            });
            //give player a life of 3
            trailsleft = 3;

            //player score is zero
            score = 0;
            $("#scorevalue").html(score);

            //show the # of lifes left
            $(".trailleft").show();
            addHearts();

            $("#startreset").html("Reset Game");
            start();
        }
    })

    /**
     * Function to cut the fruit on hover
     */
    $("#fruit1").on("mouseover", function () {
        score ++;
        //updating score
        $("#scorevalue").html(score);
        //play sound (returns an array so we  get the audio at index 0)
        if(sound)  
            $("#cutSound")[0].play();

        //stop Fruit going down
        clearInterval(action);

        // $("#fruit1").hide("explode", {pieces: 3}, 600);
        //above line gives favicon error
        $("#fruit1").hide( );

        //send new fruits after 600 milli secs
        setTimeout(start(), 10);
         
    })

    /**
     * setting volume on and off
     */
    $(".volume").on("click", function(){
        if(sound){
            sound = false;
            $(".volume").button({
                icon: "ui-icon-volume-off"
            });
            
        }else{
            sound = true;
            $(".volume").button({
                icon: "ui-icon-volume-on"
            });
        }
    })

   


    /**
     * we start showing the fruits on screen call on line 53
     */
    let start = function () {
        //positioning the fruit at a random left position
        positionFruits();
        /**
         * starting the interval to move fruit down at x step 10 milliseconds
         */
        action = setInterval(function () {
            //we get the top postion eachtime and just add steps to it  
            //to have a nice motion.....

            $("#fruit1").css('top', $("#fruit1").position().top + step);
            // check if the fruits left beyond heigth if the div
            if ($("#fruit1").position().top > $("#fruitHolder").height()) {
                //check if life is left so we can decrease by 1 if user misses the fruit
                if (trailsleft > 1) {
                    //get next fruit
                    positionFruits();
                    trailsleft -= 1;
                    addHearts();
                } else {
                    //if game is over we show the end messages
                    playing = false;
                    $(".trailleft").hide();
                    $("#gameover").html('<p>Game Over!!</p><p>Your Score is ' + score + '</p>');
                    $("#gameover").show();
                    
                    $("#startreset").html("Start Game");
                    //stop throwing fruits
                    stopAction();
                }
            }
        }, 10);

    }

    /**
     * pick a random fruit image
     */
    let pickFruit = function () {
        $("#fruit1").attr("src", 'images/F' + (Math.floor(Math.random() * 8) + 1) + '.png');

    }

    /**
     * start postion of each fruit
     */

    function positionFruits() {
        // $("#fruitHolder").html('<img src="images/F1.png" class="fruit">')
        $("#fruit1").show();
        //pick a random fruit image to position it
        pickFruit();
        $("#fruit1").css({ "left": Math.round(Math.random() * 550), "top": -50 });

        step = Math.round(Math.random() * 5) + 1;
    }

    /**
     * stop at the gameover
     */
    function stopAction() {
        //stop fruits...
        clearInterval(action);
        $("#fruit1").hide();
        $(".volume").hide();
    }

    /**
     * show life lines left
     */
    let addHearts = function () {
        $(".trailleft").empty();
        for (let i = 0; i < trailsleft; i++) {

            $(".trailleft").append('<img src="images/heart.png" class="hearts">');
        }
    }

});