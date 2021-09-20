// import { NodeArray } from "typescript";
var state = {
    typeWindow: null,
    idEditElem: ''
};
/////////////////////////////////////////////////////////// templates dragstart
// event.target.classList.add(`selected`);
function templateCard(id, title, arrIngredients, option) {
    if (option === void 0) { option = ''; }
    var insidesOfElem = "<p class=\"book__title\" id=\"id\" onclick=\"ShowHideCardContent(event)\"> " + title + " </p><div class=\"book__content\" data-card-content> <h3 class=\"book__content-title\">Ingredients</h3> <hr class=\"book__content-line\"><ul class=\"book__content-list\"> " + createElemsForList(arrIngredients) + " </ul> <div class=\"book__content-btns\"><div class=\"book__content-btn btn edit\" id=\"windowForSettingRecipe\" onclick=\"state.idEditElem = event.target.getAttribute('data-id-parent'); state.typeWindow = 'edit'; EntryDataInWindowForSettingRecipe(state.typeWindow); openWindow(windowForSettingRecipe) ;\" data-id-parent=" + id + ">Edit</div><div class=\"book__content-btn btn delete\" id=\"btnDelete\" onclick=\"removeRecipe(event)\" data-id-parent=" + id + ">Delete</div></div></div>";
    if (option === 'mini') {
        return insidesOfElem;
    }
    else {
        return "<div class=\"book__elem\" id=" + id + ">" + insidesOfElem + "</div>";
    }
}
function templateElemOfListWindow(text) {
    return "<li class=\"fieldEnterOfIngredients__elem\" draggable=\"true\" id=\"windowListElem\" ondragstart=\"event.target.classList.add('dragSelected');\" ondragend=\"event.target.classList.remove('dragSelected');\"> " + text + " <span class=\"fieldEnterOfIngredients__elem-delete\" onclick=\"deleteInList(event)\"></span></li>";
}
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
    if (text.trim() === '')
        return;
    addInList(text);
    inputNameIngredientInWindow.value = '';
});
btnOpenWindow.addEventListener('click', function () {
    state.typeWindow = 'add';
    EntryDataInWindowForSettingRecipe(state.typeWindow);
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
    var templateOfCard = templateCard(id, title, arrIngredients);
    listRecipes.insertAdjacentHTML('beforeend', templateOfCard);
    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
    setCardInStorage({
        id: id,
        title: title,
        arrIngredients: arrIngredients
    });
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
    elemForEdit.innerHTML = templateCard(id, title, arrIngredients, 'mini');
    state.typeWindow = null;
    closeWindow(windowForSettingRecipe);
    EditCardInStorage(id, title, arrIngredients);
}
/////////////////////////////////////////////////////////// fnDelet
function removeRecipe(event) {
    event.target
        .parentNode
        .parentNode
        .parentNode
        .remove();
    deletCardInStorage(event.target.getAttribute('data-id-parent'));
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
    var elem = templateElemOfListWindow(text);
    listElemsIngredientsInWindow.insertAdjacentHTML('beforeend', elem);
}
function deleteInList(event) {
    event.target
        .parentNode
        .remove();
}
///////////////////////////////////////////////////////////
function EntryDataInWindowForSettingRecipe(typeOfOperation) {
    if (typeOfOperation === 'add') {
        inputTitleInWindow.value = '';
        inputNameIngredientInWindow.value = '';
        listElemsIngredientsInWindow.innerHTML = '';
    }
    if (typeOfOperation === 'edit') {
        var _a = parsingDataWithWindowForSettingRecipe(), title = _a[0], arrIngredients = _a[1];
        inputTitleInWindow.value = title;
        inputNameIngredientInWindow.value = '';
        listElemsIngredientsInWindow.innerHTML = '';
        arrIngredients.forEach(function (text) {
            listElemsIngredientsInWindow.innerHTML += templateElemOfListWindow(text);
        });
    }
}
function parsingDataWithWindowForSettingRecipe() {
    var elemCard = document.querySelector("#" + state.idEditElem);
    var textTitle = elemCard.querySelector('.book__title').textContent;
    var arrElemWitdNameIngredients = elemCard.querySelectorAll('.book__content-list-elem');
    var title = textTitle;
    var arrIngredients = [];
    arrElemWitdNameIngredients.forEach(function (e) {
        arrIngredients.push(e.textContent);
    });
    return [title, arrIngredients];
}
///////////////////////////////////////////////////////////
function ShowHideCardContent(event) {
    var elemWithContent = event.target.parentNode.querySelector('[data-card-content]');
    if (elemWithContent.style.display === 'none') {
        elemWithContent.style.display = 'block';
        return;
    }
    elemWithContent.style.display = 'none';
}
/////////////////////////////////////////////////////////// storage
function setCardInStorage(objWithData) {
    var cardsValue = JSON.parse(localStorage.getItem('cards')) || [];
    cardsValue.push(objWithData);
    console.log(cardsValue);
    localStorage.setItem('cards', JSON.stringify(cardsValue));
    console.log(objWithData);
}
function createCardWithStorage() {
    var cards = JSON.parse(localStorage.cards);
    if (cards === [] || cards === [null])
        return;
    cards.forEach(function (objectWithData) {
        var id = objectWithData.id;
        var title = objectWithData.title;
        var arrIngredients = objectWithData.arrIngredients;
        var templateOfCard = templateCard(id, title, arrIngredients);
        listRecipes.insertAdjacentHTML('beforeend', templateOfCard);
    });
}
function deletCardInStorage(id) {
    var cardsValue = JSON.parse(localStorage.cards);
    var cardsValueNew = cardsValue.filter(function (e) { return e.id !== id; });
    localStorage.setItem('cards', JSON.stringify(cardsValueNew));
}
function EditCardInStorage(id, title, arrIngredients) {
    console.log('1', id, title, arrIngredients);
    var cardsValue = JSON.parse(localStorage.cards);
    var cardsValueNew = cardsValue.map(function (elem) {
        if (elem.id === id) {
            elem.title = title;
            elem.arrIngredients = arrIngredients;
        }
        return elem;
    });
    localStorage.setItem('cards', JSON.stringify(cardsValueNew));
}
/////////////////////////////////////////////////////////// drag-drop
listElemsIngredientsInWindow.addEventListener('dragover', function (event) { return dragoverForList(event); });
function dragoverForList(event) {
    event.preventDefault();
    var activeElement = listElemsIngredientsInWindow.querySelector(".dragSelected");
    var currentElement = event.target;
    if (currentElement.id !== 'windowListElem')
        return;
    var nextElement = (currentElement === activeElement.nextElementSibling) ?
        currentElement.nextElementSibling :
        currentElement;
    listElemsIngredientsInWindow.insertBefore(activeElement, nextElement);
}
/////////////////////////////////////////////////////////// init
function init() {
    listElemsIngredientsInWindow.innerHTML = null;
    createCardWithStorage();
}
init();
///////////////////////////////////////////////////////////
