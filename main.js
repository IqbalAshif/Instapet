'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server


// select existing html elements
const regForm = document.querySelector('reg-wrapper');
const body = document.querySelector('body');


const loadReg = async () => {
    console.log('regForm load ');
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.innerHTML = "HELLO";
            }
        };
        xhttp.open("GET", regForm, true);
        xhttp.send();

    }
    catch (e) {
        console.log(e.message);
    }
};



