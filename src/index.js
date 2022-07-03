let addToy = false;
const toyCollection = document.getElementById("toy-collection")
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

initialize()


});

function initialize(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => data.forEach(toy => renderOneToy(toy)))
}

function renderOneToy(toy){
  console.log(toy)
  const card = document.createElement("div")
  card.className = "card"
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} likes</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
  `
  toyCollection.appendChild(card)

}

const form = document.getElementsByClassName("add-toy-form")[0]
console.log(form)
form.addEventListener('submit', handleEvent)
function handleEvent(event){
  event.preventDefault()
  console.log(event.target.name.value)
  let toyObj = {
    name:event.target.name.value,
    image:event.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  createToy(toyObj)
}
function createToy(toyObj){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:{
      'content-Type':'application/json',
      
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json()
  .then(toy => console.log(toy)))
  
}
