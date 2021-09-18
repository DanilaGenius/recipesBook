var state = {
    idEditElem: ''
};
// const templateElemOfRecipe: string = `<div class="book__elem" id=${}>    <p class="book__title" id=""> ${} </p>      <div class="book__content"> <h3 class="book__content-title">Ingredients</h3> <hr class="book__content-line">      <ul class="book__content-list"> ${} </ul> <div class="book__content-btns">         <div class="book__content-btn btn edit" id="btnOpenWindowForEdit" onclick="openWindow(windowForEdit) ;state.idEditElem = event.target.getAttribute('data-id-parent');" data-id-parent=${}>Edit</div>    <div class="book__content-btn btn delete" id="btnDelete" onclick="">Delete</div>      </div></div></div>`;
/////////////////////////////////////////////////////////// CONSTS
var windowForAddRecipe = document.querySelector('#windowForAddRecipe');
var windowForEditRecipe = document.querySelector('#windowForEditRecipe');
//    btnDeleteRecipe
var btnAddRecipe = document.querySelector('#btnAddRecipe');
var btnEditRecipe = document.querySelector('#btnEditRecipe');
var btnOpenWindowForAdd = document.querySelector('#btnOpenWindowForAdd');
//    btnOpenWindowForEdit
var btnCloseWindowForAddRecipe = document.querySelector('#btnCloseWindowForAddRecipe');
var btnCloseWindowForEditRecipe = document.querySelector('#btnCloseWindowForEditRecipe');
var listRecipes = document.querySelector('#listRecipes');
///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// Events window for add
// const elem = '<li class="fieldEnterOfIngredients__elem">hello hello <span class="fieldEnterOfIngredients__elem-delete"></span></li>';
var btnArrowOfWindow = document.querySelector('.fieldEnterOfIngredients__enter');
var inputTextOfWindow = document.querySelector('.fieldEnterOfIngredients__text');
var listElemsInWindowForAdd = document.querySelector('#listElemsInWindowForAdd');
var inputTitleInWindowForAdd = document.querySelector('#inputTitleInWindowForAdd');
var btnArrowOfWindowEdit = document.querySelector('#btnArrowOfWindowEdit');
var inputTextOfWindowEdit = document.querySelector('#inputTextOfWindowEdit');
var listElemsInWindowForEdit = document.querySelector('#listElemsInWindowForEdit');
var inputTitleInWindowForEdit = document.querySelector('#inputTitleInWindowForEdit');
btnArrowOfWindow.addEventListener('click', function () {
    var text = inputTextOfWindow.value;
    addInList(text);
});
btnOpenWindowForAdd.addEventListener('click', function () {
    openWindow(windowForAddRecipe);
});
btnCloseWindowForAddRecipe.addEventListener('click', function () {
    closeWindow(windowForAddRecipe);
});
btnCloseWindowForEditRecipe.addEventListener('click', function () {
    closeWindow(windowForEditRecipe);
});
///////////////////////////////////////////////////////////
function parserForWindow(elemWithTitle, listParent) {
    var arrIngredients = [];
    var elems = listParent.childNodes;
    var title = elemWithTitle.value;
    elems.forEach(function (e) {
        arrIngredients.push(e.textContent);
    });
    return [title, arrIngredients];
}
function createCard() {
    var _a = parserForWindow(inputTitleInWindowForAdd, listElemsInWindowForAdd), title = _a[0], arrIngredients = _a[1];
    var id = 'A' + (Math.floor(Math.random() * 11 + Math.random() * 10)) + "B";
    var templateOfCard = "<div class=\"book__elem\" id=" + id + "> <p class=\"book__title\" id=\"id\"> " + title + " </p> <div class=\"book__content\"> <h3 class=\"book__content-title\">Ingredients</h3> <hr class=\"book__content-line\">      <ul class=\"book__content-list\"> " + createElemsForList(arrIngredients) + " </ul> <div class=\"book__content-btns\">         <div class=\"book__content-btn btn edit\" id=\"btnOpenWindowForEdit\" onclick=\"openWindow(windowForEditRecipe) ;state.idEditElem = event.target.getAttribute('data-id-parent');\" data-id-parent=" + id + ">Edit</div>    <div class=\"book__content-btn btn delete\" id=\"btnDelete\" onclick=\"removeRecipe(event)\">Delete</div>      </div></div></div>";
    listRecipes.insertAdjacentHTML('beforeend', templateOfCard);
    btnAddRecipe.removeEventListener('click', createCard);
    closeWindow(windowForAddRecipe);
    setTimeout(function () { return btnAddRecipe.addEventListener('click', createCard); }, 1500);
}
function createElemsForList(arr) {
    var result = '';
    arr.forEach(function (ingredient) {
        result += "<li class=\"book__content-list-elem\">" + ingredient + "</li>";
    });
    return result;
}
function editCard(e) {
    console.log('str');
    var _a = parserForWindow(inputTitleInWindowForEdit, listElemsInWindowForEdit), title = _a[0], arrIngredients = _a[1];
    console.log([title, arrIngredients]);
    var id = state.idEditElem;
    console.log("#" + id);
    var elemForEdit = document.querySelector("#" + id);
    console.log("#" + id, elemForEdit);
    elemForEdit.innerHTML = "<p class=\"book__title\" id=\"id\"> " + title + " </p> <div class=\"book__content\"> <h3 class=\"book__content-title\">Ingredients</h3> <hr class=\"book__content-line\">      <ul class=\"book__content-list\"> " + createElemsForList(arrIngredients) + " </ul> <div class=\"book__content-btns\">         <div class=\"book__content-btn btn edit\" id=\"btnOpenWindowForEdit\" onclick=\"openWindow(windowForEditRecipe) ;state.idEditElem = event.target.getAttribute('data-id-parent');\" data-id-parent=" + id + ">Edit</div>    <div class=\"book__content-btn btn delete\" id=\"btnDelete\" onclick=\"removeRecipe(event)\">Delete</div>      </div></div>";
    closeWindow(windowForEditRecipe);
}
/////////////////////////////////////////////////////////// Events
btnAddRecipe.addEventListener('click', createCard);
btnEditRecipe.addEventListener('click', editCard);
/////////////////////////////////////////////////////////// FUNCTIONS  recipe
function removeRecipe(e) {
    e.target
        .parentNode
        .parentNode
        .parentNode
        .remove();
}
/////////////////////////////////////////////////////////// window show/hide
function openWindow(elem) {
    elem.style.display = 'block';
    elem.style.opacity = '1';
}
function closeWindow(elem) {
    elem.style.opacity = '0';
    setTimeout(function () {
        elem.style.display = 'none';
    }, 1500);
}
/////////////////////////////////////////////////////////// window
function addInList(text) {
    var elem = "<li class=\"fieldEnterOfIngredients__elem\"> " + text + " <span class=\"fieldEnterOfIngredients__elem-delete\" onclick=\"deleteInList(event)\"></span></li>";
    listElemsInWindowForAdd.insertAdjacentHTML('beforeend', elem);
}
function deleteInList(event) {
    event.target
        .parentNode
        .remove();
}
///////////////////////////////////////////////////////////
function addInListEdit(text) {
    var elem = "<li class=\"fieldEnterOfIngredients__elem\"> " + text + " <span class=\"fieldEnterOfIngredients__elem-delete\" onclick=\"deleteInList(event)\"></span></li>";
    listElemsInWindowForEdit.insertAdjacentHTML('beforeend', elem);
}
function deleteInListEdit(event) {
    event.target
        .parentNode
        .remove();
}
btnArrowOfWindowEdit.addEventListener('click', function () {
    var text = inputTextOfWindowEdit.value;
    addInListEdit(text);
});
