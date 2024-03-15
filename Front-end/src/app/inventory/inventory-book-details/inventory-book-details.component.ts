import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';

import { DataService } from 'src/app/services/dataService.service';
import { SharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-inventory-book-details',
  templateUrl: './inventory-book-details.component.html',
  styleUrls: ['./inventory-book-details.component.css']
})

export class InventoryBookDetailsComponent implements OnInit {

  /* ------------------------------ Declarations ------------------------------ */
  private bookList: Book[] | undefined;
  bookDetails: Book = new Book(0, '', '', '', '', '', '', '', '');


  /* ------------------------------- Constructor ------------------------------ */
  constructor (
    private dataService: DataService, 
    private sharedService: SharedService, 
  ) { }


  /* ----------------------------- Initialization ----------------------------- */
  async ngOnInit(): Promise<void> {
    
    if (this.dataService.bookList === undefined || this.dataService.bookList.length < 1)
    {
      const books = await this.dataService.getAllBooks().toPromise();
      this.checkForBooks(books);
    }
    else 
    {
      const books = this.dataService.bookList;
      this.checkForBooks(books);
    }

    this.sharedService.bookDetails$.subscribe((book: Book) => {
      this.bookDetails = book;
    });
  }

  checkForBooks(books: Book[] | undefined): void
  {
    if (books !== undefined && books.length > 1)
    {
      this.bookList = this.sharedService.organizeBooksAlphabetically(books);

      const selectedBook = this.sharedService.selectedBook;
      
      if (selectedBook)
      {
        this.bookDetails = selectedBook;
      }
      else 
      {
        this.bookDetails = this.bookList[0];
      }
    }
  }

  /* ----------------------------- Helper Functions --------------------------- */
  organizeGenresAlphabetically(genres: string) {
    return genres.split(', ').sort().join(', ');
  }

  changeDateFormat(publishedDate: string) {
    const convertDate = new Date(publishedDate);
    return convertDate.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });
  }
}