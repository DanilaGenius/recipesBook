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
/////////////////////////////////////////////////////////// Consts
const listRecipes: HTMLElement = document.querySelector('#listRecipes');

const windowForSettingRecipe: HTMLElement = document.querySelector('#windowForSettingRecipe');

const btnAcceptSettings: HTMLElement = document.querySelector('#btnAcceptSettings');
const btnOpenWindow: HTMLElement     = document.querySelector('#btnOpenWindow');
const btnCloseWindow: HTMLElement    = document.querySelector('#btnCloseWindow');

const btnArrowOfWindow                 = document.querySelector('#btnArrowOfWindow');
const inputNameIngredientInWindow: any = document.querySelector('#inputNameIngredientInWindow');

const inputTitleInWindow: HTMLElement           = document.querySelector('#inputTitleInWindow');
const listElemsIngredientsInWindow: HTMLElement = document.querySelector('#listElemsIngredientsInWindow');
/////////////////////////////////////////////////////////// Events
btnArrowOfWindow.addEventListener('click', () => {
    let text: string = inputNameIngredientInWindow.value;
    addInList(text);
})

btnOpenWindow.addEventListener('click', () => {
    state.typeWindow = 'add';
    openWindow(windowForSettingRecipe);
})

btnCloseWindow.addEventListener('click', () => {
    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
})

btnAcceptSettings.addEventListener('click', () => {
    if (state.typeWindow === 'add') {
        createCard();
    }
    if (state.typeWindow === 'edit') {
        editCard();
    }
})
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
    const templateOfCard: string  = `<div class="book__elem" id=${id}> <p class="book__title" id="id"> ${title} </p><div class="book__content"> <h3 class="book__content-title">Ingredients</h3> <hr class="book__content-line"><ul class="book__content-list"> ${createElemsForList(arrIngredients)} </ul> <div class="book__content-btns">         <div class="book__content-btn btn edit" id="windowForSettingRecipe" onclick="state.typeWindow = 'edit'; openWindow(windowForSettingRecipe) ;state.idEditElem = event.target.getAttribute('data-id-parent');" data-id-parent=${id}>Edit</div><div class="book__content-btn btn delete" id="btnDelete" onclick="removeRecipe(event)">Delete</div></div></div></div>`;
    listRecipes.insertAdjacentHTML('beforeend', templateOfCard);

    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
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
          elemForEdit.innerHTML    = ` <p class="book__title" id="id"> ${title} </p><div class="book__content"><h3 class="book__content-title">Ingredients</h3> <hr class="book__content-line"><ul class="book__content-list">${createElemsForList(arrIngredients)}</ul><div class="book__content-btns"><div class="book__content-btn btn edit" id="windowForSettingRecipe" onclick="state.typeWindow = 'edit'; openWindow(windowForSettingRecipe) ;state.idEditElem = event.target.getAttribute('data-id-parent');" data-id-parent=${id}>Edit</div><div class="book__content-btn btn delete" id="btnDelete" onclick="removeRecipe(event)">Delete</div></div></div>`;

    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
}
/////////////////////////////////////////////////////////// fnDelet
function removeRecipe(event): void {
    event.target
        .parentNode
        .parentNode
        .parentNode
        .remove();
}
/////////////////////////////////////////////////////////// show/hide
function openWindow(elem): void {
    elem.style.display = 'block';
    elem.style.opacity = '1';
}

function closeWindow(elem): void {
    elem.style.opacity = '0';
    setTimeout(() => elem.style.display = 'none', 1000);
}
/////////////////////////////////////////////////////////// fnWindowList
function addInList(text): void {
    const elem: string = `<li class="fieldEnterOfIngredients__elem"> ${text} <span class="fieldEnterOfIngredients__elem-delete" onclick="deleteInList(event)"></span></li>`;
    listElemsIngredientsInWindow.insertAdjacentHTML('beforeend', elem);
}

function deleteInList(event): void {
    event.target
        .parentNode
        .remove();
}
/////////////////////////////////////////////////////////// init
function init(): void {
    listElemsIngredientsInWindow.innerHTML = null
}
init()