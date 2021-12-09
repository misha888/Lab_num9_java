const API = 'https://fotballapi.co/api/v2/fotball/';

const $list = document.querySelector('.search_field .menu > ul');
const $field = document.querySelector('.search_field > input');
//const $list = document.querySelector('.list');
//const $field = document.querySelector('.query');

let list = [];

function templateGenerator(list) {
    
    if (!list.length) {
        $list.innerHTML= '<p>Not found :(</p>';
    }
    else {
        let template = '';
        for (let i = 0; i < list.length; i++) {
            template += '<li>' + list[i].name + '</li>';
        }
        $list.innerHTML = template;
    }
}

fetch(API)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        list = data.results;
        templateGenerator(list);
    });


$field.addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let buffer = list.filter(function(element) {
        return element.name.toLowerCase().indexOf(query) + 1;
    });
    templateGenerator(buffer);
});

$field.addEventListener('focus', function() {
    this.parentNode.classList.add('active');
});

$field.addEventListener('blur', function() {
    this.parentNode.classList.remove('active');
});

$list.addEventListener('click', function(e) {

    let str = e.target.outerHTML.replace();
    let template = '';
    let name = '';
    for (let i = 0; i < list.length; i++) {
        template = '<li>' + list[i].name + '</li>';
        if (template == str) {
            name = list[i].name;
            break;
        }
    }
    document.getElementById('name_txt').value = name;
});