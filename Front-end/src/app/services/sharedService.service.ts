import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Book } from '../models/book.model';

import { DataService } from './dataService.service';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    books$ = new Subject<Book[]>;
    book$ = new Subject<Book> 
    bookDetails$ = new Subject<Book>;

    selectedBook: Book | undefined;

    scrollBehavior: any;
    timeoutLength: any;

    filterClicked: boolean = false;

    constructor(
        private dataService: DataService
    ) { }

    resetBookList() {
        this.dataService.bookList = this.dataService.backupBookList;
        const books = this.dataService.bookList;

        if (books !== undefined)
        {
            this.books$.next(books);
        }
    }

    setSelectedBookDetails(selectedBook: Book) {
        this.selectedBook = selectedBook;
        this.bookDetails$.next(selectedBook);
    }

    setScrollBehavior(scrollBehavior: string) {
        this.scrollBehavior = scrollBehavior;
    }

    setTimeoutLength(timeout: number) {
        this.timeoutLength = timeout;
    }

    setFilterClicked(wasFilterClicked: boolean) {
        this.filterClicked = wasFilterClicked;
    }

    //For small details box page
    getSelectedBookDetails(selectedBookID: number) {
        
        if (this.dataService.bookList !== undefined)
        {
            const selectedBook = this.dataService.bookList.find((book: Book) => book.book_id === selectedBookID);

            if (selectedBook)
            {
                return selectedBook;
            }
            else
            {
                this.dataService.reportError("Library System", "Front-end", "sharedService", "getSelectedBookDetails", "Getting selected book details", 
                "No selected book found for some reason");
                return undefined;
            }
        }
        else 
        {
            this.dataService.reportError("Library System", "Front-end", "sharedService", "getSelectedBookDetails", "Getting selected book details", 
            "No selected book found for some reason");
            return undefined;
        }
    }

    organizeBooksAlphabetically(books: Book[]) {
        const sortedBooks = books.slice().sort((a,b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
    
          return titleA.localeCompare(titleB);
        });
    
        return sortedBooks;
    }

    //For the authors
    /*organizeBooksAlphabetically(books: Book[]) {
        return books.sort((a,b) => {
        const lastNameA = a.author.split(" ").pop() || " ";
        const lastNameB = b.author.split(" ").pop() || " ";

        return lastNameA?.localeCompare(lastNameB);
        });
    }*/
}