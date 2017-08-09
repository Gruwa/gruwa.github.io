function GetAllBooks() {

    let books: any[] = [
        { title: 'Ulysses', author: 'James Joyce', available: true, category: Category.Poetry },
		{ title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: false, category: Category.Fiction },
		{ title: 'I Know Why the Caged Bird Sings', author: 'Maya Angelou', available: true, category: Category.Poetry },
		{ title: 'Moby Dick', author: 'Herman Melville', available: true, category: Category.Fiction }
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

allBooks.push({ title: 'Dick', author: 'Herman Melville 2', available: true, category: Category.Fiction});
// const нельзя заменить глобально, но изменить его свойства можно
LogFirstAvailable(allBooks);

const poetryBooks = GetBookTitlesByCategory(Category.Poetry);
LogBookTitles(poetryBooks);