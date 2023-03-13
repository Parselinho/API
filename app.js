const divSearch = document.querySelector('.search-container');
const divGallery = document.querySelector('#gallery');
const body = document.querySelector('body');
const url = 'https://randomuser.me/api/?results=12' // will take 12 random users everytime the page reload

/* creating  the form and the input*/
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
// call the function to create the elements
createFormInput();

// create function that will create the elements and the textContent inside the elements , will take the argument data so it can accest the data I got from the api
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
    <img class='card-img' src='${data.picture.large}' alt='profile picture'> 
    `;
    divImg.insertAdjacentHTML('beforeend', img);

    const html = `
    <h3 id='name' class='card-name cap'>${data.name.title} ${data.name.first} ${data.name.last}</h3>
    <p class='card-text'>${data.email}</p>
    <p class='card-text cap'>${data.location.city}, ${data.location.country}</p>
    `;
    divCardInfo.insertAdjacentHTML('beforeend', html);
}

//function that will create the modal and will take the argument data so it can accest the data I got from the api
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

    // formating the phone number like the instructions : (xxx) XXX-XXXX
    let formattedCell = data.cell.replace(/[^\d]/g, ''); // remove all non-numeric characters
    formattedCell = formattedCell.replace(/(\d{3})(\d{3})(\d{3}|d{4}|d{5})/, '($1) $2-$3');


    // formating the birthday like the instructions. xx/xx/xxxx
    const formattedBirthday = new Date(data.dob.date).toLocaleDateString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const html = `
    <img class='modal-img' src='${data.picture.large}' alt='profile picture'>
    <h3 id='name' class='modal-name cap'>${data.name.first} ${data.name.last}</h3>
    <p class="modal-text">${data.email}</p>
    <p class="modal-text cap">${data.location.city}</p>
    <hr>
    <p class="modal-text">${formattedCell}</p>
    <p class="modal-text">${data.location.street.number} ${data.location.street.name}., ${data.location.state}, ${data.location.postcode}</p>
    <p class="modal-text">Birthday: ${formattedBirthday}</p>
    `;

    divButton.insertAdjacentHTML('beforeend', html);
    divExceed.insertAdjacentHTML('beforeend', buttonsExceed);
}


let globalData = [];

//  send a single request to the API
fetch(url, {
    headers: {
        'Accept': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => {
        const cards = data.results.map(createCard) 
        globalData = data.results;
        eventModal();
    })

    function eventModal(e) {
        const modalCards = globalData.map(result => result);
        divGallery.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card && card.parentNode === divGallery) {
                const index = Array.from(divGallery.children).indexOf(card);
                createModal(modalCards[index]);
            }
        });
    }
