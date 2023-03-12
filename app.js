const divSearch = document.querySelector('.search-container');
const divGallery = document.querySelector('#gallery');
const body = document.querySelector('body');

function createFormInput() {
    const form = document.createElement('form');
    form.action = '#';
    form.method = 'get';
    divSearch.append(form);

    const input = `
    <input type='search' id='search-input' class='search-input' placeholder='Search...' </input>
    <input type='submit' value='&#x1F50D;' id='search-submit' class='search-submit' </input>
    `;
    form.insertAdjacentHTML('beforeend', input);
}

createFormInput();


function createCard(data) {
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divGallery.append(divCard);

    const divImg = document.createElement('div');
    const divCardInfo = document.createElement('div');
    divImg.classList.add('card-img-container');
    divCardInfo.classList.add('card-info-container');
    divCard.append(divImg, divCardInfo);

    const img = `
    <img class='card-img' src='${data.picture.thumbnail}' alt='profile picture'>
    `;
    divImg.insertAdjacentHTML('beforeend', img);

    const html = `
    <h3 id='name' class='card-name cap'>${data.name.title} ${data.name.first} ${data.name.last}</h3>
    <p class='card-text'>${data.email}</p>
    <p class='card-text cap'>${data.location.city}, ${data.location.country}</p>
    `;
    divCardInfo.insertAdjacentHTML('beforeend', html);
}

function createModal(data) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('modal-container');
    body.append(divContainer);

    const divModal = document.createElement('div');
    divModal.classList.add('modal');

    const divExceed = document.createElement('div');
    divExceed.classList.add('modal-btn-container')

    divContainer.append(divModal, divExceed);

    const button = `
    <button type='button' id='modal-close=btn' class='modal-close-btn'><strong>X</strong>
    `;
    const divButton = document.createElement('div');
    divButton.classList.add('modal-info-container');
    divModal.insertAdjacentHTML('beforeend', button);
    divModal.append(divButton);

    const buttonsExceed = `
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    `;

    const html = `
    <img class='modal-img' src='https://placehold.it/125x125' alt='profile picture'>
    <h3 id='name' class='modal-name cap'>name</h3>
    <p class="modal-text">email</p>
    <p class="modal-text cap">city</p>
    <hr>
    <p class="modal-text">(555) 555-5555</p>
    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
    <p class="modal-text">Birthday: 10/21/2015</p>
    `;

    divButton.insertAdjacentHTML('beforeend', html);
    divExceed.insertAdjacentHTML('beforeend', buttonsExceed);
}


// the fetch api : https://randomuser.me/api/?results=12
const url = 'https://randomuser.me/api/?results=12'
fetch(url, {
    headers: {
        'Accept': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => console.log(createCard(data)))
