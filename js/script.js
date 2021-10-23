"use strict";

document.getElementById('submitq').addEventListener('click', () => {
    let first = document.getElementById('firstq');
    let second = document.getElementById('secondq');
    let third = document.getElementById('thirdq');
    first.classList.add('correct');
    second.classList.add('correct');
    third.classList.add('correct');
});

