import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from 'src/app/models/book.model';
import { Genre } from 'src/app/models/genre.model';

import { DataService } from 'src/app/services/dataService.service';
import { SharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent implements OnInit {
  
  private bookList: Book[] | undefined;
  private genreList: Genre[] | undefined;

  private booksPerPage: number = 9;

  private Pages: Map<string, number> = new Map<string, number>();

  constructor (
    private dataService: DataService, 
    private sharedService: SharedService, 
    private route: Router
  ) { }

  async ngOnInit(): Promise<void> {

    window.scrollTo({ top: 0, behavior: 'instant' });
    
    if (this.dataService.bookList === undefined || this.dataService.bookList.length < 1)
    { 
      this.bookList = await this.dataService.getAllBooks().toPromise();
    }
    else 
    {
      this.bookList = this.dataService.bookList;
    }

    this.checkScreenSize();
    this.findTopGenres();

    this.sharedService.setScrollBehavior('smooth');
    this.sharedService.setTimeoutLength(550);
  }

  checkScreenSize(): void {

    const width = window.innerWidth;

    switch(true)
    {
      case width <= 500:
        this.booksPerPage = 2;
        break;
      case width <= 760:
        this.booksPerPage = 3;
        break;
      case width <= 920:
        this.booksPerPage = 4;
        break;
      case width <= 1100:
        this.booksPerPage = 5;
        break;
      case width <= 1300:
        this.booksPerPage = 6;
        break;
      case width <= 1500:
        this.booksPerPage = 7;
        break;
      case width <= 1700:
        this.booksPerPage = 8;
        break;
      case width <= 2000:
        this.booksPerPage = 9;
        break;
      case width <= 2400:
        this.booksPerPage = 10;
        break;
      case width <= 2800:
        this.booksPerPage = 11;
        break;
      default:
        this.booksPerPage = 12;
        break;
    }

    this.Pages.forEach((value, key) => {
      this.Pages.set(key, 1);
    });
  }

  onBookClicked(book: Book): void {

    const navigationArgument = {
      queryParams: { 
        book: JSON.stringify(book.book_id),
      },
    }

    this.route.navigate(['Browse Inventory'], navigationArgument);
  }

  findTopGenres() {

    const genresMap = new Map<string, number>();

    this.bookList?.forEach((book: Book) => {
      const eachGenre = book.genre.split(',').map((genre) => genre.trim());

      eachGenre.forEach((genre) => {
        const count = genresMap.get(genre) || 0;
        genresMap.set(genre, count + 1);
      });
    });

    const genresArray = Array.from(genresMap, ([genre, count]) => ({genre, count}));

    return genresArray.sort((a, b) => b.count - a.count).map((store) => store.genre);
  }

  booksWithCorrespondingGenre(genre: string) {

    if (this.bookList !== undefined)
    {
      const booksForGenre = this.bookList.filter(book => book.genre.includes(genre));

      //let totalPages = Math.ceil(booksForGenre.length / this.booksPerPage);
      let currentPage = this.Pages.get(genre) || 1;

      let startIndex = (currentPage - 1) * this.booksPerPage;
      let endIndex = startIndex + this.booksPerPage;

      return booksForGenre.slice(startIndex, endIndex);
    }

    return [];
  }

  onArrowClicked(genre: string, leftArrow: boolean): void {

    if (leftArrow)
    {
      this.Pages.set(genre, (this.Pages.get(genre) || 1) - 1);
    }
    else 
    {
      this.Pages.set(genre, (this.Pages.get(genre) || 1) + 1);
    }
  }

  firstPage(genre: string) {
    const state = this.checkFirstLastPage(genre);
    return state === 'First Page' || state === 'Only Page';
  }

  lastPage(genre: string) {
    const state = this.checkFirstLastPage(genre);
    return state === 'Last Page' || state === 'Only Page';
  }
  
  checkFirstLastPage(genre: string) {
    const currentPage = this.Pages.get(genre) || 1;
    const firstPage = 1;
    const lastPage = this.getLastPage(genre);

    if (currentPage === firstPage && currentPage === lastPage)
    {
      return 'Only Page';
    }
    else if (currentPage === firstPage) 
    {
      return 'First Page';
    }
    else if (currentPage === lastPage) 
    {
      return 'Last Page';
    }
    else
    {
      return 'Middle Page'
    }
  }

  getLastPage(genre: string) {

    if (this.bookList !== undefined)
    {
      const booksForGenre = this.bookList.filter(book => book.genre.includes(genre));

      let totalPages = Math.ceil(booksForGenre.length / this.booksPerPage);

      return totalPages;
    }

    return 0;
  }

  getPaddingSize(direction: string) {
    const width = window.innerWidth;

    if (direction === 'top')
    {
      return this.booksPerPage > 11 ? 24 : 16;
    }
    if (direction === 'left')
    {
      return this.booksPerPage > 3 ? 16 : 10;
    }
    if (direction === 'right')
    {
      return this.booksPerPage > 3 ? 16 : 10;
    }
    else
    {
      return this.booksPerPage > 7 ? 16 : 10;
    }
  }

  getBookImagePath(book: Book) {
    return book.image;
  }
}