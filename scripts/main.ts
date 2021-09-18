type stateType = {
    idEditElem: string,
}

const state: stateType = {
    idEditElem: '',
}
// const templateElemOfRecipe: string = `<div class="book__elem" id=${}>    <p class="book__title" id=""> ${} </p>      <div class="book__content"> <h3 class="book__content-title">Ingredients</h3> <hr class="book__content-line">      <ul class="book__content-list"> ${} </ul> <div class="book__content-btns">         <div class="book__content-btn btn edit" id="btnOpenWindowForEdit" onclick="openWindow(windowForEdit) ;state.idEditElem = event.target.getAttribute('data-id-parent');" data-id-parent=${}>Edit</div>    <div class="book__content-btn btn delete" id="btnDelete" onclick="">Delete</div>      </div></div></div>`;

/////////////////////////////////////////////////////////// CONSTS

const windowForAddRecipe: HTMLElement = document.querySelector('#windowForAddRecipe');
const windowForEditRecipe: HTMLElement = document.querySelector('#windowForEditRecipe');

//    btnDeleteRecipe
const btnAddRecipe: HTMLElement = document.querySelector('#btnAddRecipe');
const btnEditRecipe: HTMLElement = document.querySelector('#btnEditRecipe');

const btnOpenWindowForAdd: HTMLElement = document.querySelector('#btnOpenWindowForAdd');
//    btnOpenWindowForEdit

const btnCloseWindowForAddRecipe: HTMLElement = document.querySelector('#btnCloseWindowForAddRecipe');
const btnCloseWindowForEditRecipe: HTMLElement = document.querySelector('#btnCloseWindowForEditRecipe');





const listRecipes: HTMLElement = document.querySelector('#listRecipes');

///////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////// Events window for add
// const elem = '<li class="fieldEnterOfIngredients__elem">hello hello <span class="fieldEnterOfIngredients__elem-delete"></span></li>';
const btnArrowOfWindow = document.querySelector('.fieldEnterOfIngredients__enter');
const inputTextOfWindow: any = document.querySelector('.fieldEnterOfIngredients__text');
const listElemsInWindowForAdd: HTMLElement = document.querySelector('#listElemsInWindowForAdd');
const inputTitleInWindowForAdd: HTMLElement = document.querySelector('#inputTitleInWindowForAdd');

const btnArrowOfWindowEdit = document.querySelector('#btnArrowOfWindowEdit');
const inputTextOfWindowEdit: any = document.querySelector('#inputTextOfWindowEdit');
const listElemsInWindowForEdit: HTMLElement = document.querySelector('#listElemsInWindowForEdit');
const inputTitleInWindowForEdit: HTMLElement = document.querySelector('#inputTitleInWindowForEdit');


btnArrowOfWindow.addEventListener('click', () => {
    let text: string = inputTextOfWindow.value
    addInList(text)
})

btnOpenWindowForAdd.addEventListener('click', () => {
    openWindow(windowForAddRecipe)
})

btnCloseWindowForAddRecipe.addEventListener('click', () => {
    closeWindow(windowForAddRecipe)
})

btnCloseWindowForEditRecipe.addEventListener('click', () => {
    closeWindow(windowForEditRecipe)
})

///////////////////////////////////////////////////////////

function parserForWindow(elemWithTitle, listParent) {
    const arrIngredients = [];
    const elems = listParent.childNodes
    const title = elemWithTitle.value

    elems.forEach(e => {
        arrIngredients.push(e.textContent)
    });

    return [title, arrIngredients]
}

function createCard() {
    const [title, arrIngredients] = parserForWindow(inputTitleInWindowForAdd, listElemsInWindowForAdd);
    const id = 'A' + (Math.floor(Math.random() * 11 + Math.random() * 10)) + "B"
    const templateOfCard: string = `<div class="book__elem" id=${id}> <p class="book__title" id="id"> ${title} </p> <div class="book__content"> <h3 class="book__content-title">Ingredients</h3> <hr class="book__content-line">      <ul class="book__content-list"> ${createElemsForList(arrIngredients)} </ul> <div class="book__content-btns">         <div class="book__content-btn btn edit" id="btnOpenWindowForEdit" onclick="openWindow(windowForEditRecipe) ;state.idEditElem = event.target.getAttribute('data-id-parent');" data-id-parent=${id}>Edit</div>    <div class="book__content-btn btn delete" id="btnDelete" onclick="removeRecipe(event)">Delete</div>      </div></div></div>`

    listRecipes.insertAdjacentHTML('beforeend', templateOfCard)

    btnAddRecipe.removeEventListener('click', createCard)
    closeWindow(windowForAddRecipe)
    setTimeout(() => btnAddRecipe.addEventListener('click', createCard), 1500)
}

function createElemsForList(arr) {
    let result = '';
    arr.forEach(ingredient => {
        result += `<li class="book__content-list-elem">${ingredient}</li>`
    })

    return result
}

function editCard(e) {
    console.log('str')
    const [title, arrIngredients] = parserForWindow(inputTitleInWindowForEdit, listElemsInWindowForEdit);
    console.log([title, arrIngredients])
    const id = state.idEditElem
    console.log(`#${id}`)
    const elemForEdit = document.querySelector(`#${id}`)
    console.log(`#${id}`, elemForEdit)
    elemForEdit.innerHTML = `<p class="book__title" id="id"> ${title} </p> <div class="book__content"> <h3 class="book__content-title">Ingredients</h3> <hr class="book__content-line">      <ul class="book__content-list"> ${createElemsForList(arrIngredients)} </ul> <div class="book__content-btns">         <div class="book__content-btn btn edit" id="btnOpenWindowForEdit" onclick="openWindow(windowForEditRecipe) ;state.idEditElem = event.target.getAttribute('data-id-parent');" data-id-parent=${id}>Edit</div>    <div class="book__content-btn btn delete" id="btnDelete" onclick="removeRecipe(event)">Delete</div>      </div></div>`
    closeWindow(windowForEditRecipe)
}


/////////////////////////////////////////////////////////// Events

btnAddRecipe.addEventListener('click', createCard)

btnEditRecipe.addEventListener('click', editCard)





/////////////////////////////////////////////////////////// FUNCTIONS  recipe
function removeRecipe(e) {
    e.target
        .parentNode
        .parentNode
        .parentNode
        .remove()
}



/////////////////////////////////////////////////////////// window show/hide
function openWindow(elem) {
    elem.style.display = 'block'
    elem.style.opacity = '1';
}

function closeWindow(elem) {
    elem.style.opacity = '0';
    setTimeout(() => {
        elem.style.display = 'none'
    }, 1500)
}
/////////////////////////////////////////////////////////// window
function addInList(text) {
    const elem: string = `<li class="fieldEnterOfIngredients__elem"> ${text} <span class="fieldEnterOfIngredients__elem-delete" onclick="deleteInList(event)"></span></li>`
    listElemsInWindowForAdd.insertAdjacentHTML('beforeend', elem)
}

function deleteInList(event) {
    event.target
        .parentNode
        .remove()
}
///////////////////////////////////////////////////////////
function addInListEdit(text) {
    const elem: string = `<li class="fieldEnterOfIngredients__elem"> ${text} <span class="fieldEnterOfIngredients__elem-delete" onclick="deleteInList(event)"></span></li>`
    listElemsInWindowForEdit.insertAdjacentHTML('beforeend', elem)
}

function deleteInListEdit(event) {
    event.target
        .parentNode
        .remove()
}

btnArrowOfWindowEdit.addEventListener('click', () => {
    let text: string = inputTextOfWindowEdit.value
    addInListEdit(text)
})