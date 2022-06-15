$(function() {
    $("#myCheckbox").button();
    $("#checkboxes").buttonset();
    $("#radiobox").buttonset();
    $("#datepicker").datepicker({
        showAnim:"slideDown",
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yyyy-MM-dd",
        showOn: "button",
        showWeek: true
    });
})