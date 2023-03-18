import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

})


onValue(shoppingLstInDB, function (snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {

            let currentItem = itemsArray[i]
            let currentItemID = itemsArray[i][0]
            let currentItemValue = itemsArray[i][1]

            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEL.innerHTML = '<li>Cart is Empty</li>'
    }


})

//to clear shoppping list

function clearShoppingListEl() {
    shoppingListEL.innerHTML = ''
}

// function to clear input value 

function clearInputFieldEl() {
    inputFieldEl.value = ''
}

//function to add an element to the list

function appendItemToShoppingListEl(item) {

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li')

    //function to remove item from the database of firebase

    newEl.addEventListener('click', function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    //To add item in the cart

    newEl.textContent = itemValue
    shoppingListEL.append(newEl)
}