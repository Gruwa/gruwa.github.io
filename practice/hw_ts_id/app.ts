function GetAllBooks() {

    let books: any[] = [
        { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: Category.Fiction },
		{ id: 2, title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: false, category: Category.Fiction },
		{ id: 3, title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', available: true, category: Category.Poetry },
		{ id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: Category.Fiction }
    ];

    return books;

}

function LogFirstAvailable(books: any[]): void {
    
    let numberOfBooks: number = books.length;

    let firstAvailable: string = '';

    for(let currentBook of books) {

        if(currentBook.available) {

            firstAvailable = currentBook.title;
            break;
        }    
    }

    console.log('Total Books: ' + numberOfBooks);
    console.log('First Availsble: ' + firstAvailable);
    
}

enum Category { Biography, Poetry, Fiction, History, Children }

function GetBookTitlesByCategory(categoryFilter: Category): Array<string> {
    console.log('Getting books in category: ' + Category[categoryFilter]);

    const allBooks = GetAllBooks();
    const filteredTitles: string[] = [];

    for (let book of allBooks) {
        
        if (book.category === categoryFilter) {
            filteredTitles.push(book.title);
            
        }
    }

    return filteredTitles;
    
}

function LogBookTitles(titles: string[]): void {

    for (let title of titles) {

        console.log(title);
        
    }
}

const allBooks = GetAllBooks();

allBooks.push({ id: 5, title: 'Dick', author: 'Herman Melville 2', available: true, category: Category.Fiction});
// const нельзя заменить глобально, но изменить его свойства можно
LogFirstAvailable(allBooks);

const poetryBooks = GetBookTitlesByCategory(Category.Poetry);
LogBookTitles(poetryBooks);

//********************************************************* 05 */

function GetBookByID(id: number) {
    const allBooks = GetAllBooks();
    return allBooks.filter(book => book.id === id)[0];
}

const fictionBooks = GetBookTitlesByCategory(Category.Fiction);
fictionBooks.forEach((val, idx, arr) => console.log(++idx + ' - ' + val));

//----------- 5_08 ------------------

function CreateCustomerID(name: string, id: number): string {
    return name + id;
}

let myID: string = CreateCustomerID('daniel', 10);
console.log(myID);

// одно и тоже написанное только с помощью эро фанкшен (стрелочная функция)

let IdGenerator: (chars: string, nums: number) => string;
IdGenerator = (name: string, id: number) => {return id + name;}

let myGeneratorID: string = IdGenerator('daniel', 13);
console.log(myGeneratorID);


