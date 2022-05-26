let painting = false;

let paint_erase = "painting";

const canvas = document.getElementById("paint");
let context = canvas.getContext("2d");

let container = $("#canvas");

let mouse = {x: 0, y: 0};


$(function() { 
    // setting the silder using jQuery UI
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);

            // setting the line width according to the user choice
            context.lineWidth = ui.value;
        }
    });

    // getting the local data back and drawing it on the canvas
if(localStorage.getItem("canvas") !== null){
    let img = new Image();
    img.onload = function(){
        context.drawImage(img, 0, 0);
    }
    //need to onload before setting source
    img.src = localStorage.getItem("canvas");
}

//chaning the color of the circle respective to the user selected input
 $("#paintColor").change(function(){
     $("#circle").css("background-color", $(this).val())
 })
context.lineJoin = "round";
context.lineCap = "round";

container.mousedown(function(e) {
    painting = true;
    context.beginPath();
    //coordinates of mouse positon is diff between mouse postion relative to canvas and the outer container
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    context.moveTo(mouse.x, mouse.y);
});

container.mousemove(function(e) {
    //coordinates of mouse positon is diff between mouse postion relative to canvas and the outer container
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if(painting == true){
        if(paint_erase == "painting"){
            context.strokeStyle = $("#paintColor").val();
        }
        //if erasing
        else{
            context.strokeStyle = "white";
        }
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
    }
     
});

container.mouseup(function() {
    painting = false;
});

container.mouseleave(function() {
    painting = false;
});

// Eraseing option for the user 
$("#erase").on("click", function (){
    if(paint_erase == "painting"){
        paint_erase = "earsing";
    }
    else{
        paint_erase = "painting";
    }
    $(this).toggleClass("earseMode");
})

//reset option for the user
$("#reset").on("click", function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    paint_erase = "painting";
    $("#erase").removeClass("earseMode");
})
// stroring or saving option for user so on reload we retive the data
$("#save").on("click", function(){
    if(typeof(localStorage) !== null){
        localStorage.setItem("canvas", canvas.toDataURL());
        //window.alert(localStorage.getItem("canvas"));
    }
    else{
        window.alert("Your browser does not support localStorage")
    }  
})


 

});

    /* Understanding Canvas 
    let canvas = document.getElementById("paint");
    let context = canvas.getContext("2d");

    //draw a line
    //declare new path
    context.beginPath();

    //line width
    context.lineWidth = 40;

    //set line color
    context.strokeStyle = "red";

    //set cap to thr line (round, butt, square, etc.)
    context.lineCap = "round";
    //set the line join style(bevel, round, miter, etc.)
    context.lineJoin = "round";
    //position the context point
    context.moveTo(50, 50);

    //draw a straight line from the starting point to a new position
    context.lineTo(200, 200);
    context.lineTo(500, 100);

    //make line visible
    context.stroke();
    */