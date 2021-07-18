const STORAGE_KEY = "BOOKSHELF";
let books = [];

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
}

function loadDataFromStorage() {
    const objek = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(objek);

    if (data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function makeObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function find(bookId) {
    for(book of books) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findIndex(bookId) {
    let index = 0;
    for(book of books) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1; // jika bukunya tak ada akan return -1
}