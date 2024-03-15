import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from 'src/app/models/book.model';

import { DataService } from 'src/app/services/dataService.service';
import { SharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-inventory-book-list',
  templateUrl: './inventory-book-list.component.html',
  styleUrls: ['./inventory-book-list.component.css']
})

export class InventoryBookListComponent implements OnInit {

  /* ------------------------------ Declarations ------------------------------ */
  private bookList: Book[] | undefined;
  selectedBook: Book | undefined;

  private booksPerPage: number = 30;
  currentPage: number = 1;

  bookListFound: boolean = false;

  private firstCurrentPage: boolean = false;
  private secondCurrentPage: boolean = false;
  private thirdCurrentPage: boolean = false;

  messageContent: string = '';
  
  /* ------------------------------- Constructor ------------------------------ */
  constructor (
    private dataService: DataService, 
    private sharedService: SharedService, 
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private route: Router,
  ) { }


  /* ----------------------------- Initialization ----------------------------- */
  async ngOnInit(): Promise<void> {

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);

    //If the user refreshes this html page, then dataService.bookList will be undefined
    //If dataService.bookList is empty, call the function to get the books and wait for the data
    //Then verify we have books present
    //Else, use dataService.bookList and verify we have books present
    if (this.dataService.bookList === undefined || this.dataService.bookList.length < 1)
    {
      const books = await this.dataService.getAllBooks().toPromise();
      this.checkForBooks(books, undefined);
    }
    else 
    {
      const books = this.dataService.bookList;
      this.checkForBooks(books, undefined);
    }

    this.activatedRoute.queryParams.subscribe(params => {
      const queryParams = this.activatedRoute.snapshot.queryParams;

      if (queryParams['book']) 
      {
        const sentBook = JSON.parse(queryParams['book']);
        const books = this.dataService.bookList;
        this.checkForBooks(books, sentBook);
      }
      else
      {
        const books = this.dataService.bookList;
        this.checkForBooks(books, undefined);
      }
   });

    //When the users presses "Apply Filter" in inventory-filter, the filteredList is sent to sharedService
    //which then passes the new book list here. It verifies we have good data and then updates this.bookList
    this.dataService.books$.subscribe((books: Book[]) => {
      this.currentPage = 1;
      this.checkForBooks(books, undefined);
    });

    //When a user presses "Reset List" under the "Apply Filter" button, resetBookList() in sharedService
    //is called and will emit the full book list here. Then we verify we have good data and it updates this.bookList
    this.sharedService.books$.subscribe((books: Book[]) => {
      this.checkForBooks(books, undefined);
    });
  }

  
  /* ----------------------------- Event Functions ---------------------------- */
  checkScreenSize(): void {
    const width = window.innerWidth;

    if (width <= 767)
    {
      if (this.selectedBook)
      {
        this.sharedService.setScrollBehavior('instant');
        this.sharedService.setTimeoutLength(0);

        this.scrollIntoView(this.currentPage, this.selectedBook);
      }
    }
  }

  onBookClicked(event: Event, book: any): void {
    this.selectedBook = book; //Set this for the ngStyle on the HTML page
    this.sharedService.setSelectedBookDetails(book);

    const width = window.innerWidth;

    if (width <= 767)
    {
      const navigationArgument = {
        queryParams: { 
          book: JSON.stringify(book.book_id),
        },
      }
  
      this.route.navigate(['Details Page'], navigationArgument);
    }
  }

  checkForBooks(books: Book[] | undefined, desiredBook: Book | number | undefined): void {

    //If there are no books and we did not filter, there is most likely an issue pulling the 
    //data from the database
    if (books === undefined || books.length === 0)
    {
      if (this.sharedService.filterClicked)
      {
        this.messageContent = 'No Results Found';
        this.bookListFound = false;
      }
      else 
      {
        this.messageContent = 'Issue pulling books from database';
        this.bookListFound = false;

        this.dataService.reportError("Library System", "Front-end", "inventory-book-list.component.ts", "checkForBooks", 
        "Checking if we have valid book data", "No books found and the user did not filter. Most likely issue pulling from database");
      }
    }
    else 
    {
      this.bookListFound = true;
      this.bookList = this.sharedService.organizeBooksAlphabetically(books);

      if (desiredBook === undefined)
      {
        desiredBook = this.bookList[0];
        this.sharedService.setSelectedBookDetails(desiredBook);
        this.selectedBook = desiredBook;
        return;
      }
      else 
      {
        desiredBook = this.bookList.find((book: Book) => book.book_id === desiredBook);

        //If a match is found, send it to find which pages it's on
        //If for some reason we don't get a match though
        //Report the error and set selectedBook to the first index
        if (desiredBook)
        {
          this.sharedService.setSelectedBookDetails(desiredBook);
          this.selectedBook = desiredBook;
          this.findWhichPageTheSelectedBookIsOn(desiredBook);
        } 
        else 
        {
          this.dataService.reportError("Library System", "Front-end", "inventory-book-list.component.ts", "checkForBooks", 
          "Locating the selected book for its details", "The selected book wasn't matched to a book in our database for some reason");

          this.selectedBook = this.bookList[0];
          this.sharedService.setSelectedBookDetails(this.selectedBook);
        }
      }
    }
  }

  findWhichPageTheSelectedBookIsOn(desiredBook: Book) {
    const lastPage = this.getLastPage();
    let currentPage = 1;

    for (let i = 0; i <= lastPage; i++)
    {
      let locateBook = this.setContentPerPage(currentPage, false);
      
      if (locateBook)
      {
        let isBookHere = locateBook.find((book: Book) => book === desiredBook);

        if (isBookHere)
        {
          this.currentPage = currentPage;
          this.scrollIntoView(currentPage, desiredBook);
          return;
        }
        else 
        {
          currentPage++;
        }
      }
    }

    //If the selected book is not found on any page, send error
    //And set default page and content
    this.dataService.reportError("Library System", "Front-end", "inventory-book-list.component.ts", "scrollIntoView", "Auto scrolling to selected book", 
    "Unable to find selected book in any of the pages");
    currentPage = 1;
    this.currentPage = currentPage;
    this.setContentPerPage(currentPage, true); 
  }

  setContentPerPage(currentPage: number, pageSwitch: boolean) {
    if (this.bookList !== undefined && this.bookList.length > 0)
    {
      let startIndex = (currentPage - 1) * this.booksPerPage;
      let endIndex = startIndex + this.booksPerPage;

      if (pageSwitch)
      {
        this.selectedBook = this.bookList[startIndex];
        this.sharedService.setSelectedBookDetails(this.bookList[startIndex]);
      }

      return this.bookList.slice(startIndex, endIndex);
    }
    return [];
  }

  contentForHTMLPage(pageSwitch: boolean) {
    return this.setContentPerPage(this.currentPage, pageSwitch);
  }

  scrollIntoView(pageWithBook: number, desiredBook: Book): void {

    const scrollBehavior = this.sharedService.scrollBehavior;
    const timeoutLength = this.sharedService.timeoutLength;

    //If the page is refreshed, scrollBehavior and timeoutLength won't be set
    //So we have them set in the else statement just incase. Otherwise it'll
    //Scroll to the book like normal
    if (scrollBehavior && timeoutLength)
    {
      setTimeout(() => {
        const selectedBookElement = this.elementRef.nativeElement.querySelector(`#book_${desiredBook.book_id}`);
  
        if (selectedBookElement)
        {
          selectedBookElement.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
        }
        else
        {
          this.dataService.reportError("Library System", "Front-end", "inventory-book-list.component.ts", "scrollIntoView", "Auto scrolling to selected book", 
          "Unable to find selected book on page for some reason");
          this.currentPage = 1;
          this.setContentPerPage(this.currentPage, true); 
        }
      }, timeoutLength);
    }
    else 
    {
      //Acting up on mobile for some reason
      this.sharedService.setScrollBehavior('instant');
      this.sharedService.setTimeoutLength(300);
      //this.scrollIntoView(pageWithBook, desiredBook);
    }
  }

  onNextPreviousClicked(next: boolean): void {
    if (next)
    {
      this.currentPage++;
    }
    else 
    {
      this.currentPage--;
    }

    this.setContentPerPage(this.currentPage, true);

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  onPageClicked(pageClicked: number, pageBlock: string): void {
    this.currentPage = pageClicked;

    this.setContentPerPage(this.currentPage, true);

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  onResetClicked(): void {
    const books = this.dataService.bookList;
    this.checkForBooks(books, undefined);
  }


  /* ---------------------------- Utility Functions --------------------------- */

  determinePageNumber(pageBlock: string) {
    const lastPage = this.getLastPage();
  
    if (pageBlock === "First") 
    {
      return Math.max(1, this.currentPage - (this.currentPage === lastPage ? 2 : 1));
    }
  
    if (pageBlock === "Second") 
    {
      return Math.min(lastPage, this.currentPage + (this.currentPage === 1 ? 1 : (lastPage === 2 ? 0 : (this.currentPage === lastPage ? -1 : 0))));
    }
  
    if (pageBlock === "Third") 
    {
      return Math.min(lastPage, this.currentPage + (this.currentPage === 1 ? 2 : 1));
    }
  
    return 0;
  }

  setBackgroundForCurrentPage(pageBlock: string) {
    const lastPage = this.getLastPage();

    if (pageBlock === "First") 
    {
      return this.currentPage === 1;
    }
  
    if (pageBlock === "Second") 
    {
      if (lastPage !== 2)
      {
        return this.currentPage !== 1 && this.currentPage !== this.getLastPage();
      }
      else
      {
        return this.currentPage !== 1;
      }
    }
  
    if (pageBlock === "Third") 
    {
      return this.currentPage === this.getLastPage();
    }

    return false;
  }
  

  firstPage() {
    const state = this.checkFirstLastPage();
    return state === 'First Page' || state === 'Only Page';
  }

  lastPage() {
    const state = this.checkFirstLastPage();
    return state === 'Last Page' || state === 'Only Page';
  }

  checkFirstLastPage() {
    const firstPage = 1;
    const lastPage = this.getLastPage();

    if (this.currentPage === firstPage && this.currentPage === lastPage)
    {
      return 'Only Page';
    }
    else if (this.currentPage === firstPage) 
    {
      return 'First Page';
    }
    else if (this.currentPage === lastPage) 
    {
      return 'Last Page';
    }
    else
    {
      return 'Middle Page'
    }
  }

  getLastPage() {

    if (this.bookList !== undefined)
    {
      const totalPages = Math.ceil(this.bookList.length / this.booksPerPage);
      
      return totalPages;
    }

    return 0;
  }


  /* ----------------------------- Helper Functions --------------------------- */
  shortenDescription(description: string) {
    const width = window.innerWidth;

    const words = description.match(/\S+/g) || [];
    let wordLimit;

    if (width <= 350)
    {
      wordLimit = 20;
    }
    else 
    {
      wordLimit = 30;
    }

    if (words.length > wordLimit)
    {
      const shortenedWords = words.slice(0, wordLimit);

      for (let i = shortenedWords.length - 1; i >= 0; i--) 
      {
        //If there's a period, question mark, exclamation mark or space
        //Get rid of it
        if (/[\.\?\!\s]+$/.test(shortenedWords[i]))
        {
          shortenedWords.splice(i, 1);
        }
        else
        {
          break;
        }
      }

      const shortenedText = shortenedWords.join(' ') + '...';

      return shortenedText;
    }
    else
    {
      return description;
    }
  }

  organizeGenresAlphabetically(genres: string) {
    return genres.split(', ').sort().join(', ');
  }
}