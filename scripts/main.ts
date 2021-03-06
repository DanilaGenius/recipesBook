// import { NodeArray } from "typescript";

/////////////////////////////////////////////////////////// State
type stateType = {
    typeWindow: 'edit' | 'add' | null,
    idEditElem: string,
};

const state: stateType = {
    typeWindow: null,
    idEditElem: '',
};
/////////////////////////////////////////////////////////// templates dragstart
// event.target.classList.add(`selected`);
function templateCard(id, title, arrIngredients, option = '') {
    const insidesOfElem: string = `<p class="book__title" id="id" onclick="ShowHideCardContent(event)"> ${title} </p><div class="book__content" data-card-content> <h3 class="book__content-title">Ingredients</h3> <hr class="book__content-line"><ul class="book__content-list"> ${createElemsForList(arrIngredients)} </ul> <div class="book__content-btns"><div class="book__content-btn btn edit" id="windowForSettingRecipe" onclick="state.idEditElem = event.target.getAttribute('data-id-parent'); state.typeWindow = 'edit'; EntryDataInWindowForSettingRecipe(state.typeWindow); openWindow(windowForSettingRecipe) ;" data-id-parent=${id}>Edit</div><div class="book__content-btn btn delete" id="btnDelete" onclick="removeRecipe(event)" data-id-parent=${id}>Delete</div></div></div>`
    if (option === 'mini') {
        return insidesOfElem
    } else {
        return `<div class="book__elem" id=${id}>${insidesOfElem}</div>`
    }
}

function templateElemOfListWindow(text) {
    return `<li class="fieldEnterOfIngredients__elem" draggable="true" id="windowListElem" ondragstart="event.target.classList.add('dragSelected');" ondragend="event.target.classList.remove('dragSelected');"> ${text} <span class="fieldEnterOfIngredients__elem-delete" onclick="deleteInList(event)"></span></li>`
}
/////////////////////////////////////////////////////////// Consts
const documentBody = document.documentElement;

const listRecipes: HTMLElement = document.querySelector('#listRecipes');

const windowForSettingRecipe: HTMLElement = document.querySelector('#windowForSettingRecipe');

const btnAcceptSettings: HTMLElement = document.querySelector('#btnAcceptSettings');
const btnOpenWindow: HTMLElement     = document.querySelector('#btnOpenWindow');
const btnCloseWindow: HTMLElement    = document.querySelector('#btnCloseWindow');

const btnArrowOfWindow = document.querySelector('#btnArrowOfWindow');

const inputNameIngredientInWindow: any          = document.querySelector('#inputNameIngredientInWindow');
const inputTitleInWindow: any                   = document.querySelector('#inputTitleInWindow');
const listElemsIngredientsInWindow: HTMLElement = document.querySelector('#listElemsIngredientsInWindow');

const builderOfIngredientsInWindow: HTMLElement = document.querySelector('.fieldEnterOfIngredients__top');

const widthWindowOfBrowser: any = documentBody.getBoundingClientRect().width;
/////////////////////////////////////////////////////////// Events
btnArrowOfWindow.addEventListener('click', () => {
    addIngredientInBuilder()
})

builderOfIngredientsInWindow.addEventListener('keydown', (event: any) => {
    if (event.key === 'Enter') {
        addIngredientInBuilder()
    }
})

btnOpenWindow.addEventListener('click', () => {
    state.typeWindow = 'add';
    EntryDataInWindowForSettingRecipe(state.typeWindow)
    openWindow(windowForSettingRecipe);
})

btnCloseWindow.addEventListener('click', () => {
    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
})

btnAcceptSettings.addEventListener('click', () => {
    if (inputTitleInWindow.value.trim() === '') return

    if (state.typeWindow === 'add') {
        createCard();
    }
    if (state.typeWindow === 'edit') {
        editCard();
    }
})

listElemsIngredientsInWindow.addEventListener('dragover', (event) => dragoverForList(event))
///////////////////////////////////////////////////////////
function parserForWindow(elemWithTitle: any, listParent: HTMLElement): Array < string | string[] > {
    const arrLiIngredients: Array < string > = [];
    const elems: NodeList                    = listParent.childNodes;
    const title: string                      = elemWithTitle.value;

    elems.forEach((e, i) => {
        arrLiIngredients.push(e.textContent);
    });

    return [title, arrLiIngredients];
}

function createCard(): void {
    const [title, arrIngredients] = parserForWindow(inputTitleInWindow, listElemsIngredientsInWindow);
    const id: string              = 'A' + (Math.floor(Math.random() * 11 + Math.random() * 10)) + "B";
    const templateOfCard: string  = templateCard(id, title, arrIngredients);
    listRecipes.insertAdjacentHTML('beforeend', templateOfCard);

    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
    setCardInStorage({
        id,
        title,
        arrIngredients,
    })
}

function createElemsForList(arr): string {
    let result: string = '';
    arr.forEach(ingredient => {
        result += `<li class="book__content-list-elem">${ingredient}</li>`;
    })
    return result;
}

function editCard(): void {
    const [title, arrIngredients]  = parserForWindow(inputTitleInWindow, listElemsIngredientsInWindow);
    const id: string               = state.idEditElem;
    const elemForEdit: HTMLElement = document.querySelector(`#${id}`);
          elemForEdit.innerHTML    = templateCard(id, title, arrIngredients, 'mini');

    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
    EditCardInStorage(id, title, arrIngredients)
}
/////////////////////////////////////////////////////////// fnDelet
function removeRecipe(event): void {
    event.target
        .parentNode
        .parentNode
        .parentNode
        .remove();

    deletCardInStorage(event.target.getAttribute('data-id-parent'))
}
/////////////////////////////////////////////////////////// show/hide
function openWindow(elem: HTMLElement): void {
    elem.style.display          = 'flex';
    documentBody.style.overflow = 'hidden';
    elem.style.top              = documentBody.scrollTop + 'px';
}

function closeWindow(elem: HTMLElement): void {
    elem.style.display          = 'none';
    documentBody.style.overflow = 'auto';
}
/////////////////////////////////////////////////////////// fnWindowList
function addIngredientInBuilder(): void {
    let text: string = inputNameIngredientInWindow.value;
    if (text.trim() === '') return;

    const elem: string = templateElemOfListWindow(text);
    listElemsIngredientsInWindow.insertAdjacentHTML('beforeend', elem);

    inputNameIngredientInWindow.value = '';
}

function deleteInList(event): void {
    event.target
        .parentNode
        .remove();
}
///////////////////////////////////////////////////////////
function EntryDataInWindowForSettingRecipe(typeOfOperation: 'add' | 'edit'): void {
    if (typeOfOperation === 'add') {
        inputTitleInWindow.value               = '';
        inputNameIngredientInWindow.value      = '';
        listElemsIngredientsInWindow.innerHTML = '';
    }
    if (typeOfOperation === 'edit') {
        const [title, arrIngredients] = parsingDataWithWindowForSettingRecipe()

        inputTitleInWindow.value               = title;
        inputNameIngredientInWindow.value      = '';
        listElemsIngredientsInWindow.innerHTML = '';

        arrIngredients.forEach(text => {
            listElemsIngredientsInWindow.innerHTML += templateElemOfListWindow(text);
        })
    }
}

function parsingDataWithWindowForSettingRecipe(): Array < any > {
    const elemCard                   = document.querySelector(`#${state.idEditElem}`);
    const textTitle                  = elemCard.querySelector('.book__title').textContent;
    const arrElemWitdNameIngredients = elemCard.querySelectorAll('.book__content-list-elem');

    const title: string       = textTitle;
    const arrIngredients: any = [];

    arrElemWitdNameIngredients.forEach(e => {
        arrIngredients.push(e.textContent)
    })

    return [title, arrIngredients]
}

///////////////////////////////////////////////////////////
function ShowHideCardContent(event): void {
    const elemWithContent = event.target.parentNode.querySelector('[data-card-content]')

    if (elemWithContent.style.display === 'none') {
        elemWithContent.style.display = 'block'
        return
    }
    elemWithContent.style.display = 'none'
}
/////////////////////////////////////////////////////////// storage
function setCardInStorage(objWithData: object): void {
    const cardsValue = JSON.parse(localStorage.getItem('cards')) || [];
    cardsValue.push(objWithData);
    localStorage.setItem('cards', JSON.stringify(cardsValue));
}

function createCardWithStorage(): void {
    const cards = JSON.parse(localStorage.cards);

    if (cards === [] || cards === [null]) return;

    cards.forEach(objectWithData => {
        const id                     = objectWithData.id;
        const title                  = objectWithData.title;
        const arrIngredients         = objectWithData.arrIngredients;
        const templateOfCard: string = templateCard(id, title, arrIngredients);
        listRecipes.insertAdjacentHTML('beforeend', templateOfCard);
    })
}

function deletCardInStorage(id) {
    const cardsValue    = JSON.parse(localStorage.cards);
    const cardsValueNew = cardsValue.filter(e => e.id !== id);

    localStorage.setItem('cards', JSON.stringify(cardsValueNew));
}

function EditCardInStorage(id: string, title: string | string[], arrIngredients: string | string[]): void {
    const cardsValue    = JSON.parse(localStorage.cards)
    const cardsValueNew = cardsValue.map(elem => {
        if (elem.id === id) {
            elem.title          = title;
            elem.arrIngredients = arrIngredients;
        }
        return elem
    });

    localStorage.setItem('cards', JSON.stringify(cardsValueNew));
}
/////////////////////////////////////////////////////////// drag-drop
function dragoverForList(event): void {
    event.preventDefault();
    const activeElement  = listElemsIngredientsInWindow.querySelector(`.dragSelected`);
    const currentElement = event.target;

    if (currentElement.id !== 'windowListElem') return;

    const nextElement = (currentElement === activeElement.nextElementSibling) ?
        currentElement.nextElementSibling: 
        currentElement;

    listElemsIngredientsInWindow.insertBefore(activeElement, nextElement);
}
/////////////////////////////////////////////////////////// init
function init(): void {
    listElemsIngredientsInWindow.innerHTML = null;

    createCardWithStorage();
}
init();
///////////////////////////////////////////////////////////