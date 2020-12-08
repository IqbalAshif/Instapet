'use strict';
const url = 'http://localhost:3000'; 
// select existing html elements
const loginWrapper = document.querySelector('#login-wrapper');
const userInfo = document.querySelector('#user-info');
const logOut = document.querySelector('#log-out');
const main = document.querySelector('main');
const loginForm = document.querySelector('#login-form');
const addUserForm = document.querySelector('#add-user-form');
const addForm = document.querySelector('#add-pet-form');
const modForm = document.querySelector('#mod-pet-form');
const ul = document.querySelector('ul');
const userLists = document.querySelectorAll('.add-owner');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

// create pet cards
const createPetCards = (pets) => {
    // clear ul
    ul.innerHTML = '';
    pets.forEach((pet) => {
      // create li with DOM methods
      const img = document.createElement('img');
      img.src = url + '/thumbnails/' + pet.filename;
      img.alt = pet.name;
      img.classList.add('resp');
  
      // open large image when clicking image
      img.addEventListener('click', () => {
        modalImage.src = url + '/' + pet.filename;
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
  
      const figure = document.createElement('figure').appendChild(img);
  
      const h2 = document.createElement('h2');
      h2.innerHTML = pet.name;
      const p1 = document.createElement('p');
      p1.innerHTML = `Type: ${pet.pet_type}`;
      const p2 = document.createElement('p');
      p2.innerHTML = `Breed: ${pet.breed}`;
      const p3 = document.createElement('p');
      p3.innerHTML = `Age: ${pet.age}`;
      const p4 = document.createElement('p');
      p4.innerHTML = `Weight: ${pet.weight}kg`;
      const p5 = document.createElement('p');
      p5.innerHTML = `Owner: ${pet.ownername}`; 

       // add selected pet's values to modify form
    const modButton = document.createElement('button');
    modButton.innerHTML = 'Update';
    modButton.addEventListener('click', () => {
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = pet.pet_type;
      inputs[1].value = pet.breed;
      inputs[2].value = pet.name;
      inputs[3].value = pet.age;
      inputs[4].value = pet.weight;
      inputs[5].value = pet.pet_id;
      modForm.querySelector('select').value = pet.owner;
    });

    // delete selected pet
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.addEventListener('click', async () => {
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
        getPet();
      }
      catch (e) {
        console.log(e.message());
      }
    });

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    li.appendChild(p5);
    li.appendChild(modButton);
    li.appendChild(delButton);
    ul.appendChild(li);
  });
};

// close modal
close.addEventListener('click', (evt) => {
  evt.preventDefault();
  imageModal.classList.toggle('hide');
});

// AJAX call

const getPet = async () => {
 // console.log('getpet token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/pet', options);
    const pets = await response.json();
    createPetCards(pets);
  }
  catch (e) {
    console.log(e.message);
  }
};

// create user options to <select>
const createUserOptions = (users) => {
  userLists.forEach((list) => {
    // clear user list
    list.innerHTML = '';
    users.forEach((user) => {
      // create options with DOM methods
      const option = document.createElement('option');
      option.value = user.user_id;
      option.innerHTML = user.name;
      option.classList.add('light-border');
      list.appendChild(option);
    });
  });
};

// get users to form options
const getUsers = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user', options);
    const users = await response.json();
    createUserOptions(users);
  }
  catch (e) {
    console.log(e.message);
  }
};

// submit add pet form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/pet', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
  getPet();
});

// submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/pet', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  getPet();
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
    // save token
    sessionStorage.setItem('token', json.token);
    // show/hide forms + pets
    loginWrapper.style.display = 'none';
    logOut.style.display = 'block';
    main.style.display = 'block';
    userInfo.innerHTML = `Hello ${json.user.name}`;
    getPet();
    getUsers();
  }
});

// logout
logOut.addEventListener('click', async (evt) => {
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
    // remove token
    sessionStorage.removeItem('token');
    alert('You have logged out');
    // show/hide forms + pets
    loginWrapper.style.display = 'flex';
    logOut.style.display = 'none';
    main.style.display = 'none';
  }
  catch (e) {
    console.log(e.message);
  }
});

// submit register form
addUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addUserForm);
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
  // save token
  sessionStorage.setItem('token', json.token);
  // show/hide forms + pets
  loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  userInfo.innerHTML = `Hello ${json.user.name}`;
  getPet();
  getUsers();
});

// when app starts, check if token exists and hide login form, show logout button and main content, get Pets and users
if (sessionStorage.getItem('token')) {
  loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  getPet();
  getUsers();
}
