let submitbtn = document.getElementById("submitbtn");
let totalHoursWorkedhtml = document.getElementById("totalHoursWorked")
let totalTipshtml = document.getElementById("totalTips");
let ratioValue;
let eachTips = document.getElementById("eachTips");
let calculatebtn = document.getElementById("calculatetips");
let eachPerson = document.getElementById("totalHoursForEachPerson");
let totalTips;

submitbtn.addEventListener("click", function(){
    let totalHoursWorked = parseFloat(totalHoursWorkedhtml.value);
     totalTips = parseFloat(totalTipshtml.value);

    // totalHoursWorkedhtml.value = "";
    // totalTipshtml.value = "";
    ratioValue = totalTips/totalHoursWorked;

    eachTips.style.display = "block";

})

calculatebtn.addEventListener("click", function(){
    let amount = parseFloat(eachPerson.value)
    eachPerson.value = "";
    amount *= ratioValue;
    totalTips -= amount;

    document.getElementById("total").innerHTML = "Amount of tips: $"+ amount;
    document.getElementById("totalLeft").innerHTML = "Total Amount left: $"+ totalTips;
    document.getElementById("totalAmount").style.display = "block";

})