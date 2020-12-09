'use strict';




const url = 'http://localhost:3000'; // change url when uploading to server




// select existing html elements


const mainPage = document.querySelector('#main-page');
const feed = document.querySelector('#feed');
const imageModal = document.querySelector('#image-modal');
const regForm = document.querySelector('#add-user-form');
const regBtn = document.querySelector("#regButton");
const browseBtn = document.querySelector("#browseButton");
const myModal = document.querySelector(".modal");
const regModal = document.querySelector('#reg-modal');
const addPetModal = document.querySelector('#add-pet-modal');
const span = document.querySelector(".close");
const loginForm = document.querySelector('#login-form');
const userInfo = document.querySelector('.logged-user-name');
const logOutBtn = document.querySelector('.log-out-button');
const myProfileBtn = document.querySelector('#user-profile');
const signUpBtn = document.querySelector('#sign-up')
const myFeedBtn = document.querySelector('#feed-button')
const userProfile = document.querySelector('#user-page');
const petForm = document.querySelector('#add-pet-form');
const addPetBtn = document.querySelector('#add-pet');
const petWraper = document.querySelector('#pet-list-wraper');


// When the user clicks on the button, open the modal
regBtn.onclick = () => {
  regModal.style.display = "flex";
}

addPetBtn.onclick = () => {
  addPetModal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  addPetModal.style.display = "none";
  regModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event)=> {
  if (event.target == addPetModal || event.target == regModal) {
    addPetModal.style.display = "none";
    regModal.style.display = "none";
  }
}


myFeedBtn.onclick = () =>{
  getFeedPage();
}



const getLoginPage = async () => {
  mainPage.style.display = 'flex';
  feed.style.display = 'none';
  logOutBtn.style.display = 'none';
  signUpBtn.style.display = 'none';
  myFeedBtn.style.display = 'none';
  myProfileBtn.style.display = 'none';
  userInfo.innerHTML = '';
  regBtn.style.display = 'block';
  browseBtn.style.display = 'block';

}

const getProfilePage = async () => {
  userProfile.style.display = 'flex';
  feed.style.display = 'none';
}

const authorizedHeader = async (username) => {
  logOutBtn.style.display ='block';
  signUpBtn.style.display = 'none';
  regBtn.style.display = 'none';
  browseBtn.style.display = 'none';
  userInfo.innerHTML = `${username}`;
}

const unauthorizedFeedHeader = async => {
  logOutBtn.style.display = 'none';
  regBtn.style.display = 'none';
  signUpBtn.style.display = 'block';
  browseBtn.style.display = 'none';
  userInfo.innerHTML = ``;
}


const getFeedPage = async () => {
  feed.style.display = 'flex'
  mainPage.style.display = 'none';
  userProfile.style.display = 'none';
  myFeedBtn.style.display = 'none';
  if(sessionStorage.getItem('token') == null){
    unauthorizedFeedHeader();
  }else{
    
    const options = {
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/1', options); //FETCH FROM USER ID
    const json = await response.json();
    myProfileBtn.style.display ='block'
    authorizedHeader(json.name);
  }
  
  
  getPets();
}



//register
regForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(regForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  console.log('user add response', json);
  sessionStorage.setItem('token', json.token);
});

// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    sessionStorage.setItem('token', json.token);
    getFeedPage();


  }
});

//Browse
browseBtn.addEventListener('click', async (evt) =>{
evt.preventDefault();
sessionStorage.removeItem('token');
getFeedPage();

});

signUpBtn.addEventListener('click', async(evt)=>{
  evt.preventDefault();
  getLoginPage();
});



//My Profile
myProfileBtn.addEventListener('click', async (evt) => {
  evt.preventDefault();
  
    try {
      const options = {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/user/1', options);
      const json = await response.json();
      console.log(json);
      authorizedHeader(json.name);
      getProfilePage();
      myFeedBtn.style.display = "block";
      myProfileBtn.style.display = "none";
      
    }
    catch (e) {
      console.log(e.message);
    }
  
});

//logout
logOutBtn.addEventListener('click', async (evt) => {
  evt.preventDefault();
  
    try {
      const options = {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/auth/logout', options);
      const json = await response.json();
      console.log(json);
      sessionStorage.removeItem('token');
      alert('You have logged out');
      getLoginPage();
    }
    catch (e) {
      console.log(e.message);
    }
  
});







const createPetCards = (pets) => {
  // clear wraper
  petWraper.innerHTML = '';
  pets.forEach((pet) => {
    // create div with DOM methods
    const parent = document.createElement('div');
    parent.setAttribute("id", "pet-wraper");
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + pet.filename;
    img.alt = pet.name;
    img.classList.add('resp');

    // open large image when clicking image
    img.addEventListener('click', () => {
      imageModal.src = url + '/' + pet.filename;
      imageModal.alt = pet.name;
      imageModal.classList.toggle('hide');
      try {
        const coords = JSON.parse(pet.coords);
        // console.log(coords);
        addMarker(coords);
      }
      catch (e) {
      }
    });


    const h2 = document.createElement('h2');
    h2.innerHTML = `${pet.name}`;
    const figure = document.createElement('figure').appendChild(img);
    const p1 = document.createElement('p');
    p1.innerHTML = `Owner: ${pet.ownername}`;

  
    parent.appendChild(h2);
    parent.appendChild(figure);
    parent.appendChild(p1);
    petWraper.appendChild(parent);
  });
};


const getPets = async () => {
  try {
    const response = await fetch(url + '/pet');
    const pets = await response.json();
    createPetCards(pets);
    console.log('all pets:', pets);
  }
  catch (e) {
    console.log(e.message);
  }
};


//Add Pet Form
petForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  try{
  const fd = new FormData(petForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/pet', fetchOptions);
  const json = await response.json();
  console.log('add pet response', json);
  addPetModal.style.display = "none";
  //getMyPets();
  alert("pet submitted");
}
catch(e){
  alert("pet is not submitted");
  console.log(e.message);
}
});


const getUsers = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user', options);
    const users = await response.json();
    return users;

  }
  catch (e) {
    console.log(e.message);
  }
};









