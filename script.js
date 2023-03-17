import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: 'https://realtimedatabase-3d6f1-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingLstInDB = ref(database, 'shoppingList')

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingListEL = document.getElementById('shopping-list')

addButtonEl.addEventListener('click', function () {
    let inputValue = inputFieldEl.value
    push(shoppingLstInDB, inputValue)
    clearInputFieldEl()
    appendItemToShoppingListEl(inputValue)
    console.log(inputValue)
})

// function to clear input value 

function clearInputFieldEl() {
    inputFieldEl.value = ''
}

//function to add an element to the list

function appendItemToShoppingListEl(itemValue) {
    shoppingListEL.innerHTML += `<li>${itemValue}</li>`
}