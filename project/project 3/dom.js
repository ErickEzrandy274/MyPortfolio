const UNCOMPLETED_READ_BOOK = "incompleteBookshelfList";
const COMPLETED_READ_BOOK = "completeBookshelfList";
const IS_BOOK_COMPLETED = "inputBookIsComplete";
const BOOK_ID = "bookId";

function addBook() {
    //const responsUser = document.getElementById(IS_BOOK_COMPLETED);
    const uncompletedReadBook = document.getElementById(UNCOMPLETED_READ_BOOK);
    //const completedReadBook = document.getElementById(COMPLETED_READ_BOOK);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;

    const bookAuthor = "Author: " + author;
    const bookYear = "Year: " + year;

    if(isAvailable(bookTitle, bookAuthor, bookYear)){
        alert("Sorry, " + bookTitle + " book by " + author + " in " + year + " is already on the shelves!");
        
    } else {
        /*if (responsUser.checked) {
            const book = makeBook(bookTitle, bookAuthor, bookYear, true);
            const bookObject = makeObject(bookTitle, bookAuthor, bookYear, true);
            book[BOOK_ID] = bookObject.id;
            books.push(bookObject);

            completedReadBook.append(book);
            updateDataToStorage();

        } else {*/
            const book = makeBook(bookTitle, bookAuthor, bookYear, false);
            const bookObject = makeObject(bookTitle, bookAuthor, bookYear, false);
            book[BOOK_ID] = bookObject.id;
            books.push(bookObject);

            uncompletedReadBook.append(book);
            updateDataToStorage();
        
    } 
}

function moveToCompleted(book) {
    const listCompleted = document.getElementById(COMPLETED_READ_BOOK);
    const bookTitle = book.querySelector(".book_item > h3").innerText;
    const bookAuthor = book.querySelector(".book_item > p").innerText;
    const bookYear = book.querySelector(".book_item > p ~ p").innerText;
    
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const bookResult = find(book[BOOK_ID]);
    bookResult.isCompleted = true;
    newBook[BOOK_ID] = bookResult.id;

    listCompleted.append(newBook);
    book.remove();
    updateDataToStorage();
}

function moveToUncompleted(book) {
    const listUncompleted = document.getElementById(UNCOMPLETED_READ_BOOK);
    const bookTitle = book.querySelector(".book_item > h3").innerText;
    const bookAuthor = book.querySelector(".book_item > p").innerText;
    const bookYear = book.querySelector(".book_item > p ~ p").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    const bookResult = find(book[BOOK_ID]);
    bookResult.isCompleted = false;
    newBook[BOOK_ID] = bookResult.id;

    listUncompleted.append(newBook);
    book.remove();
    updateDataToStorage();
}

function removeBook(book) {
    const position = findIndex(book[BOOK_ID]);
    const booktitle = book.querySelector(".book_item > h3").innerText;
    alert(booktitle+ " book has been removed!");
    
    books.splice(position, 1);
    book.remove();
    updateDataToStorage();
}

function isAvailable(bookTitle, author, year) {
    for(const elemen of books) {
        if((elemen.title === bookTitle) && (elemen.author === author)
            && (elemen.year === year) ) {
            return true;
        }
    }

    return false;
}