export class Book {

    book_id: number;
    title: string;
    author: string; 
    description: string; 
    genre: string;
    pages: string; 
    published: string;
    availability: string;
    image: string;

    constructor(book_id: number, title: string, author: string, description: string, genre: string, pages: string, published: string, availability: string, image: string) { 
        this.book_id = book_id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.genre = genre;
        this.pages = pages;
        this.published = published;
        this.availability = availability;
        this.image = image;
    }
}