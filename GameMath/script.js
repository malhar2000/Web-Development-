let playing = false;

let score;

//set interval function name
let action;
//controls timer
let timeremanining;
//x and y value for the digits
let x,y, correctAnswer;
 
 
document.getElementById("startreset").addEventListener("click", function(e) {
    if (playing) {
        //how to reload the page 
        location.reload();
        
    }else{
         hide("gameover");
         playing = true;
         score = 0;
         document.getElementById("scorevalue").innerHTML = score;
         //[0] becoz it returns a nodelist...
         document.getElementsByClassName("timer")[0].style.display = "block";
         document.getElementById("startreset").innerHTML="Reset Game";
         timeremanining = 60;
         document.getElementsByClassName("timervalue")[0].innerHTML = timeremanining;
          
         //countdown
         startCountDown();

         generateQuestions();
    }
})

//timer countdown 
function startCountDown() {
    action = setInterval(function(){
        timeremanining -= 1;
        document.getElementsByClassName("timervalue")[0].innerHTML = timeremanining;
        if(timeremanining <= 5){
            document.getElementsByClassName("timer")[0].style.backgroundColor = "red";
        }
        if(timeremanining === 0){

            //stopping countdown
            clearInterval(action);
            
            document.getElementById("gameover").innerHTML="<p>game over!</p><p>Your Score is "+score+"</p>";
            show("gameover");
            document.getElementsByClassName("timer")[0].style.display = "none";
            hide("wrong");
            hide("correct");
            document.getElementById("startreset").innerHTML="Start Game";
            playing = false;
        }
    }, 1000);
}

//hide elements
function hide(Id){
    document.getElementById(Id).style.display = 'none';
}

function show(Id){
    document.getElementById(Id).style.display = 'block';
}

function generateQuestions(){
    x = Math.floor(Math.random() * 9) + 1;
    y = Math.floor(Math.random() * 9) + 1;
    correctAnswer = x*y;
    document.getElementById("x").innerHTML= x;
    document.getElementById("y").innerHTML= y;

    let postion = Math.floor(Math.random() * 3) + 1;

    //filling random one box with correct answers
    document.getElementById("box"+postion).innerHTML = correctAnswer;
    let allAnswer = [];
    allAnswer.push(correctAnswer);
    for(let i = 1; i < 5; i++){
        if(i !== postion){
            let  wrongAnswer;
            //to avoid repeatation
            do{ 
                wrongAnswer = (Math.floor(Math.random() * 9) + 1) * (Math.floor(Math.random() * 9) + 1); 
            }while(allAnswer.includes(wrongAnswer))
            document.getElementById("box"+i).innerHTML = wrongAnswer; 
            //helps to avoid repeatation
            allAnswer.push(wrongAnswer);
        }
    }
 
}


let btns = document.getElementsByClassName("box");
for(let i = 0; i < btns.length; i++){
    btns[i].onclick = function(){
        console.log("box1 clicked");
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score+=1;
                document.getElementById("scorevalue").innerHTML = score; 

                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000)
                generateQuestions();
            }
            else{
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                }, 1000)
            }
        }
        }
  }

