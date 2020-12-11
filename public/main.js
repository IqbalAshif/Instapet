'use strict';

const url = 'https://10.114.32.93/app'; // change url when uploading to server

// select existing html elements

const mainPage = document.querySelector('#main-page');
const feed = document.querySelector('#feed');
const imageModal = document.querySelector('#image-modal');
const regForm = document.querySelector('#add-user-form');
const regBtn = document.querySelector("#regButton");
const browseBtn = document.querySelector("#browseButton");
const myModals = document.getElementsByClassName("modal");
const regModal = document.querySelector('#reg-modal');
const addPetModal = document.querySelector('#add-pet-modal');
const spans = document.getElementsByClassName("close");
const loginForm = document.querySelector('#login-form');
const userInfo = document.querySelector('.logged-user-name');
const logOutBtn = document.querySelector('.log-out-button');
const myProfileBtn = document.querySelector('#user-profile');
const signUpBtn = document.querySelector('#sign-up')
const myFeedBtn = document.querySelector('#feed-button')
const userProfile = document.querySelector('#user-page');
const petForm = document.querySelector('#add-pet-form');
const addPetBtn = document.querySelector('#add-pet');
const feedPetListWraper = document.querySelector('#pet-list-wraper');
const myPetsWraper = document.querySelector('#my-pet-list-wraper')
const addPetUserId = document.querySelector('#pet-add-userId');
const addPetCard = document.querySelector('#add-pet-card');


// When the user clicks on the button, open the modal
regBtn.onclick = () => {
  regModal.style.display = "flex";

  
}

addPetBtn.onclick = () => {
  addPetModal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
Array.from(spans).forEach((span) => {
  span.addEventListener('click', ()=>{
  regModal.style.display = "none";
  imageModal.style.display = "none";
  addPetModal.style.display = "none";
  })
});
  


// When the user clicks anywhere outside of the modal, close it
window.onclick = (event)=> {
  if (event.target == regModal || event.target == imageModal|| event.target == addPetModal) {
    regModal.style.display="none";
    imageModal.style.display="none";
    addPetModal.style.display="none";
  }
}


myFeedBtn.onclick = () =>{
  getFeedPage();
}



const getLoginPage = async () => {
  mainPage.style.display = 'flex';
  feed.style.display = 'none';
  userProfile.style.display = 'none';
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
  getMyPets(sessionStorage.getItem('user_id'));
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
    const response = await fetch(url + '/user/'+ sessionStorage.getItem('user_id'), options); //FETCH FROM USER ID
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
  
    sessionStorage.setItem('user_id', json.user.user_id);
    sessionStorage.setItem('token', json.token);
    getFeedPage();


  }
});

//Browse
browseBtn.addEventListener('click', async (evt) =>{
evt.preventDefault();
clearSessionStorage();
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
        method:"GET",
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          
        },
      };
      const userId = sessionStorage.getItem('user_id');
      const response = await fetch(url + '/user/'+ userId, options);
      const json = await response.json();
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
      clearSessionStorage();
      alert('You have logged out');
      getLoginPage();
    }
    catch (e) {
      console.log(e.message);
    }
  
});







const createPetCards = (pets, wraper) => {
  // clear wraper
  wraper.innerHTML = '';
  myPetsWraper.appendChild(addPetCard);
  pets.forEach((pet) => {
    // create div with DOM methods
    const parent = document.createElement('div');
    parent.setAttribute("id", "pet-wraper");
    const imgdiv = document.createElement('div');
    imgdiv.setAttribute("id", 'pet_userpic_container')
    parent.appendChild(imgdiv);
    const img = document.createElement('img');
    img.setAttribute("id", "pet_userpic")
    img.src = url + '/thumbnails/' + pet.filename;
    img.alt = pet.name;
    img.classList.add('resp');
    const figure = document.createElement('figure').appendChild(img);
    figure.setAttribute("id", "pet_userpic");
    imgdiv.appendChild(figure);

    const h2 = document.createElement('h2');
    h2.innerHTML = `${pet.name}`;
    
    
    
    parent.appendChild(h2);
    parent.appendChild(imgdiv);
    
     
    if(wraper==feedPetListWraper){
      const figcaption = document.createElement('p');
      figcaption.innerHTML = `Owner: ${pet.ownername}`;
      parent.appendChild(figcaption);
      
        img.addEventListener('click', () => {
          imageModal.style.display = "flex";
          imageModal.src = url + '/' + pet.filename;
          imageModal.alt = pet.name;
          
          try {
            //const coords = JSON.parse(pet.coords);
            // console.log(coords);
            //addMarker(coords);
          }
          catch (e) {
          }
        });
      
      
    }else {
      const container = document.createElement('div');
      container.setAttribute("id", "card-button-container");
      const deleteBtn = document.createElement('button');
      const modifyBtn = document.createElement('button');
      deleteBtn.display = 'block';
      modifyBtn.display = 'block';
      deleteBtn.textContent = "Delete";
      modifyBtn.textContent = "Modify";
      container.appendChild(deleteBtn);
      container.appendChild(modifyBtn);
      parent.appendChild(container);

      deleteBtn.addEventListener('click',async (evt) => {
        var result = confirm("Want to delete?");
            if (result) {
            evt.preventDefault();
            deletePet(pet);
            }
        
      });
    }
    wraper.appendChild(parent);
    
  });
};

//DELETE PET
const deletePet = async (pet) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(url + '/pet/' + pet.pet_id, fetchOptions);
    const json = await response.json();
    console.log('delete response', json);
    getProfilePage();
  }
  catch (e) {
    console.log(e.message);
  }
};




const getPets = async () => {
  try {
    
    const response = await fetch(url + '/pet');
    const pets = await response.json();
    createPetCards(pets, feedPetListWraper);
    console.log('all pets:', pets);
  }
  catch (e) {
    console.log(e.message);
  }
};

const getMyPets = async (userID) => {
  try {
    const response = await fetch(url + '/pet/my_pets/' + userID);
    const myPets = await response.json();
    createPetCards(myPets, myPetsWraper);
    console.log('all my pets:', myPets);
  }
  catch (e) {
    console.log(e.message);
  }
}


//Add Pet Form
petForm.addEventListener('submit' ,async (evt) => {
  evt.preventDefault();
  try{
  addPetUserId.value = sessionStorage.getItem('user_id');
  const fd = new FormData(petForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd, 
  };
  console.log("ADDING FORM",addPetUserId.value);
  const response = await fetch(url + '/pet', fetchOptions);
  const json = await response.json();
  console.log('add pet response', json);
  addPetModal.style.display = "none";
  alert("pet submitted");
  getProfilePage();
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

const clearSessionStorage = async () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user_id');
};












