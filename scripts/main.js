// import { NodeArray } from "typescript";
var state = {
    typeWindow: null,
    idEditElem: ''
};
/////////////////////////////////////////////////////////// Consts
var listRecipes = document.querySelector('#listRecipes');
var windowForSettingRecipe = document.querySelector('#windowForSettingRecipe');
var btnAcceptSettings = document.querySelector('#btnAcceptSettings');
var btnOpenWindow = document.querySelector('#btnOpenWindow');
var btnCloseWindow = document.querySelector('#btnCloseWindow');
var btnArrowOfWindow = document.querySelector('#btnArrowOfWindow');
var inputNameIngredientInWindow = document.querySelector('#inputNameIngredientInWindow');
var inputTitleInWindow = document.querySelector('#inputTitleInWindow');
var listElemsIngredientsInWindow = document.querySelector('#listElemsIngredientsInWindow');
/////////////////////////////////////////////////////////// Events
btnArrowOfWindow.addEventListener('click', function () {
    var text = inputNameIngredientInWindow.value;
    addInList(text);
});
btnOpenWindow.addEventListener('click', function () {
    state.typeWindow = 'add';
    openWindow(windowForSettingRecipe);
});
btnCloseWindow.addEventListener('click', function () {
    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
});
btnAcceptSettings.addEventListener('click', function () {
    if (state.typeWindow === 'add') {
        createCard();
    }
    if (state.typeWindow === 'edit') {
        editCard();
    }
});
///////////////////////////////////////////////////////////
function parserForWindow(elemWithTitle, listParent) {
    var arrLiIngredients = [];
    var elems = listParent.childNodes;
    var title = elemWithTitle.value;
    elems.forEach(function (e, i) {
        arrLiIngredients.push(e.textContent);
    });
    return [title, arrLiIngredients];
}
function createCard() {
    var _a = parserForWindow(inputTitleInWindow, listElemsIngredientsInWindow), title = _a[0], arrIngredients = _a[1];
    var id = 'A' + (Math.floor(Math.random() * 11 + Math.random() * 10)) + "B";
    var templateOfCard = "<div class=\"book__elem\" id=" + id + "> <p class=\"book__title\" id=\"id\"> " + title + " </p><div class=\"book__content\"> <h3 class=\"book__content-title\">Ingredients</h3> <hr class=\"book__content-line\"><ul class=\"book__content-list\"> " + createElemsForList(arrIngredients) + " </ul> <div class=\"book__content-btns\">         <div class=\"book__content-btn btn edit\" id=\"windowForSettingRecipe\" onclick=\"state.typeWindow = 'edit'; openWindow(windowForSettingRecipe) ;state.idEditElem = event.target.getAttribute('data-id-parent');\" data-id-parent=" + id + ">Edit</div><div class=\"book__content-btn btn delete\" id=\"btnDelete\" onclick=\"removeRecipe(event)\">Delete</div></div></div></div>";
    listRecipes.insertAdjacentHTML('beforeend', templateOfCard);
    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
}
function createElemsForList(arr) {
    var result = '';
    arr.forEach(function (ingredient) {
        result += "<li class=\"book__content-list-elem\">" + ingredient + "</li>";
    });
    return result;
}
function editCard() {
    var _a = parserForWindow(inputTitleInWindow, listElemsIngredientsInWindow), title = _a[0], arrIngredients = _a[1];
    var id = state.idEditElem;
    var elemForEdit = document.querySelector("#" + id);
    elemForEdit.innerHTML = " <p class=\"book__title\" id=\"id\"> " + title + " </p><div class=\"book__content\"><h3 class=\"book__content-title\">Ingredients</h3> <hr class=\"book__content-line\"><ul class=\"book__content-list\">" + createElemsForList(arrIngredients) + "</ul><div class=\"book__content-btns\"><div class=\"book__content-btn btn edit\" id=\"windowForSettingRecipe\" onclick=\"state.typeWindow = 'edit'; openWindow(windowForSettingRecipe) ;state.idEditElem = event.target.getAttribute('data-id-parent');\" data-id-parent=" + id + ">Edit</div><div class=\"book__content-btn btn delete\" id=\"btnDelete\" onclick=\"removeRecipe(event)\">Delete</div></div></div>";
    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
}
/////////////////////////////////////////////////////////// fnDelet
function removeRecipe(event) {
    event.target
        .parentNode
        .parentNode
        .parentNode
        .remove();
}
/////////////////////////////////////////////////////////// show/hide
function openWindow(elem) {
    elem.style.display = 'block';
    elem.style.opacity = '1';
}
function closeWindow(elem) {
    elem.style.opacity = '0';
    setTimeout(function () { return elem.style.display = 'none'; }, 1000);
}
/////////////////////////////////////////////////////////// fnWindowList
function addInList(text) {
    var elem = "<li class=\"fieldEnterOfIngredients__elem\"> " + text + " <span class=\"fieldEnterOfIngredients__elem-delete\" onclick=\"deleteInList(event)\"></span></li>";
    listElemsIngredientsInWindow.insertAdjacentHTML('beforeend', elem);
}
function deleteInList(event) {
    event.target
        .parentNode
        .remove();
}
/////////////////////////////////////////////////////////// init
function init() {
    listElemsIngredientsInWindow.innerHTML = null;
}
init();
