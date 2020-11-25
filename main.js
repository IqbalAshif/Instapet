'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server


// select existing html elements
const regForm = document.getElementById('regForm');
const mainPage = document.getElementById('mainPage');
let body = document.querySelector('body');


const loadReg = async () => {
    console.log('regForm load');
    try {
        mainPage.style.display = "none";
        regForm.style.display = "flex";

    } catch (e) {
        console.log(e.message);
    }
};

const goMain = async () => {
    console.log('goMainPage');
    try {
        mainPage.style.display = "flex";
        regForm.style.display = "none";

    } catch (e) {
        console.log(e.message);
    }
};



