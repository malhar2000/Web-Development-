const children = $('tbody').children();
const sort_name = document.querySelector('.sort-name');
const sort_size = document.querySelector('.sort-size');
const sort_time = document.querySelector('.sort-time');

let children_array = [];
for (let i = 0; i < children.length; i++) {
    children_array.push(children[i]);
}

const allFilesDeatils = [];
children_array.forEach(function (child) {
    const sortHelper = {
        name: child.getAttribute('data-name'),
        size: parseInt(child.getAttribute('data-size')),
        time: parseInt(child.getAttribute('data-time')),
        html: child.outerHTML
    };
    allFilesDeatils.push(sortHelper);
});

const sort_by_ascending = (type) => {
    if (type === 'name') {
        allFilesDeatils.sort((f1, f2) => {
            if (f1.name.toUpperCase() < f2.name.toUpperCase()) {
                return -1;
            } if (f1.name.toUpperCase() > f2.name.toUpperCase()) {
                return 1;
            }
            return 0;
        });
    } else if(type === 'size'){
        allFilesDeatils.sort((f1, f2) => {
            if (f1.size < f2.size) {
                return -1;
            } if (f1.size > f2.size) {
                return 1;
            }
            return 0;
        });
    }else{
        allFilesDeatils.sort((f1, f2) => {
            if (f1.time < f2.time) {
                return -1;
            } if (f1.time > f2.time) {
                return 1;
            }
            return 0;
        });
    }
}

let decider = true;
const arrange_all = function(type){
    sort_by_ascending(type.getAttribute('data-value'));
    if (decider) {

        add_to_tbody(allFilesDeatils);
        type.classList.remove('fa-arrow-up');
        type.classList.add('fa-arrow-down');
        decider = false;
    } else {

        add_to_tbody(allFilesDeatils.reverse());
        type.classList.remove('fa-arrow-down');
        type.classList.add('fa-arrow-up');
        decider = true;
    }
}
sort_name.addEventListener("click", function () {
     arrange_all(this);

})

sort_size.addEventListener("click", function () {
    arrange_all(this);
    
})
sort_time.addEventListener("click", function () {
    arrange_all(this);

})

//method1
const add_to_tbody = items => {
    const content = items.map(item => item.html);
    $('tbody').html(content);
}

//method 2
// $('tbody').empty();
// allFilesDeatils.forEach(item => {
//     $('tbody').append(item.html);
// })




