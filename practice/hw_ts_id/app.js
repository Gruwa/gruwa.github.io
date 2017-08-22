"use strict";
function GetAllBooks() {
    var books = [
        { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: Category.Fiction },
        { id: 2, title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: false, category: Category.Fiction },
        { id: 3, title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', available: true, category: Category.Poetry },
        { id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: Category.Fiction }
    ];
    return books;
}
function LogFirstAvailable(books) {
    if (books === void 0) { books = GetAllBooks(); }
    var numberOfBooks = books.length;
    var firstAvailable = '';
    for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
        var currentBook = books_1[_i];
        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }
    console.log('Total Books: ' + numberOfBooks);
    console.log('First Availsble: ' + firstAvailable);
}
var Category;
(function (Category) {
    Category[Category["Biography"] = 0] = "Biography";
    Category[Category["Poetry"] = 1] = "Poetry";
    Category[Category["Fiction"] = 2] = "Fiction";
    Category[Category["History"] = 3] = "History";
    Category[Category["Children"] = 4] = "Children";
})(Category || (Category = {}));
function GetBookTitlesByCategory(categoryFilter) {
    if (categoryFilter === void 0) { categoryFilter = Category.Fiction; }
    console.log('Getting books in category: ' + Category[categoryFilter]);
    var allBooks = GetAllBooks();
    var filteredTitles = [];
    for (var _i = 0, allBooks_1 = allBooks; _i < allBooks_1.length; _i++) {
        var book = allBooks_1[_i];
        if (book.category === categoryFilter) {
            filteredTitles.push(book.title);
        }
    }
    return filteredTitles;
}
function LogBookTitles(titles) {
    for (var _i = 0, titles_1 = titles; _i < titles_1.length; _i++) {
        var title = titles_1[_i];
        console.log(title);
    }
}
var allBooks = GetAllBooks();
allBooks.push({ id: 5, title: 'Dick', author: 'Herman Melville 2', available: true, category: Category.Fiction });
// const нельзя заменить глобально, но изменить его свойства можно
LogFirstAvailable(allBooks);
var poetryBooks = GetBookTitlesByCategory(Category.Poetry);
LogBookTitles(poetryBooks);
//********************************************************* 05 */
function GetBookByID(id) {
    // const allBooks = GetAllBooks();
    return allBooks.filter(function (book) { return book.id === id; })[0];
}
var fictionBooks = GetBookTitlesByCategory(Category.Fiction);
fictionBooks.forEach(function (val, idx, arr) { return console.log(++idx + ' - ' + val); });
//----------- 5_08 ------------------
function CreateCustomerID(name, id) {
    return name + id;
}
var myID = CreateCustomerID('daniel', 10);
console.log(myID);
// одно и тоже написанное только с помощью эро фанкшен (стрелочная функция)
var IdGenerator;
IdGenerator = function (name, id) { return id + name; };
var myGeneratorID = IdGenerator('daniel', 13);
console.log(myGeneratorID);
//----------- 5_11 ------------------
function CreateCustomer(name, age, city) {
    console.log('Creating customer ' + name);
    if (age) {
        console.log("Age: " + age);
    }
    if (city) {
        console.log('City: ' + city);
    }
}
CreateCustomer('Vasya');
CreateCustomer('Ira', 6);
CreateCustomer('Ghenya', 16, 'Kiev');
var fictionBooks2 = GetBookTitlesByCategory();
fictionBooks2.forEach(function (title) { return console.log(title); });
LogFirstAvailable();
function CheckoutBooks(customer) {
    var bookIDs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        bookIDs[_i - 1] = arguments[_i];
    }
    console.log('Checking out books for ' + customer);
    var booksCheckedOut = [];
    for (var _a = 0, bookIDs_1 = bookIDs; _a < bookIDs_1.length; _a++) {
        var id = bookIDs_1[_a];
        var book = GetBookByID(id);
        if (book.available) {
            booksCheckedOut.push(book.title);
        }
    }
    return booksCheckedOut;
}
var myBooks = CheckoutBooks('Throne', 1, 3, 4, 5);
myBooks.forEach(function (title) { return console.log(title); });
//# sourceMappingURL=app.js.map