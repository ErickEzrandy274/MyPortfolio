document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");
    const searchButton = document.getElementById("searchSubmit");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        searchingBook();
    })

    if (isStorageExist()) {
        loadDataFromStorage();
    }

    document.addEventListener("ondataloaded", () => {
        refreshData();
    });
});

window.addEventListener("load", function () {
    refreshData();
});

function makeBook(bookTitle, bookAuthor, bookYear, isCompleted) {
    const article = document.createElement("article");
    article.classList.add("book_item");

    const title = document.createElement("h3");
    title.innerText = bookTitle;

    const author = document.createElement("p");
    author.innerText = bookAuthor;

    const year = document.createElement("p");
    year.innerText = bookYear;

    article.append(title, author, year);

    const div = document.createElement("div");
    div.classList.add("action");

    if(isCompleted) {
        div.append(createUnfinishedButton(), createDeleteButton());
        article.append(div);

    } else {
        div.append(createFinishedButton(), createDeleteButton());
        article.append(div);
    }

    return article;
}

function createButton(buttonTypeClass, text , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass); 
    button.innerText = text;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
}

function createDeleteButton() {
    return createButton("red", "Delete", function (event) {
        removeBook(event.target.parentElement.parentElement);
    });
}

function createFinishedButton() {
    return createButton("green", "Finish", function (event) {
        moveToCompleted(event.target.parentElement.parentElement);
    });
}

function createUnfinishedButton() {
    return createButton("green", "Not Finish", function (event) {
        moveToUncompleted(event.target.parentElement.parentElement);
    });
}

function refreshData() {
    const uncompletedReadBook = document.getElementById(UNCOMPLETED_READ_BOOK);
    let completedReadBook = document.getElementById(COMPLETED_READ_BOOK);

    for(book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ID] = book.id;

        if (book.isCompleted) {
            completedReadBook.append(newBook);
        } else {
            uncompletedReadBook.append(newBook);
        }
    }
}

function searchingBook() {
    const obj = document.getElementsByTagName("h3");
    const inputan = document.getElementById("searchBookTitle").value;

    for(const elemen of obj) {
        const isInclude = elemen.innerText.includes(inputan);
        if(!isInclude) {
            const bookItem = elemen.parentElement;
            bookItem.setAttribute("hidden", true);
            
        } else {
            const bookItem = elemen.parentElement;
            bookItem.removeAttribute("hidden");
        }
    }
}

const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", function () {
    nav.classList.toggle("slide");
});