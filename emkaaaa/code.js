let preloader = document.getElementById('preloader')
let usersWrapper = document.getElementById('users-list');
let modal = document.getElementById('modal')


fetch('https://jsonplaceholder.typicode.com/users')
.then(responce => responce.json())
.then(data => {
    setTimeout(()=>{
        preloader.style.display=('none')
    },500)
    console.log(data);
    data.forEach(item => {
        usersWrapper.innerHTML += `<li><button id="btn-${item.id}" onclick="getUserData(${item.id})">${item.name}</button></li>`
    });
})



const getUserData = (id) => {
    preloader.style.display='block';

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('active-button');
    });
    const currentButton = document.getElementById(`btn-${id}`);
    if (currentButton) {
        currentButton.classList.add('active-button');
    }
    
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(responce => responce.json())
    .then(data => {
        setTimeout(()=>{
            preloader.style.display=('none')
        },200)
        modal.innerHTML = `<div class="modal-row" >
        <div class="modal-col">
            <h2>${data.name}</h2>
            <h2>${data.username}</h2>
            <p><b>address:</b> ${data.address.city},${data.address.street}</p>
          </div>
   
          <div class="modal-col">
            <h2>${data.company.name}</h2>
            <a href="mailto:${data.email}">email: ${data.email}</a>
            <a href="tel: ${data.phone}">phone: ${data.phone}</a>
            <button onclick="closeModal()">close</button>
          </div>
    </div>`
    })
}

const closeModal = () => {
    modal.innerHTML = ""
}