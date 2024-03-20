import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, timeout } from 'rxjs';

import { HomePageComponent } from './home.component';

import { Book } from '../models/book.model';

import { DataService } from '../services/dataService.service';
import { SharedService } from '../services/sharedService.service';

import mockBookData from '../mock-data-for-unit-tests/home/mock-bookList.json'
import mockBooksForFindTopGenre from '../mock-data-for-unit-tests/home/mock-booksForFindTopGenres.json';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let dataService: DataService;
  let sharedService: SharedService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    sharedService = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties and services in "ngOnInit()"', waitForAsync(() => {
    const mockBooks = mockBookData;

    spyOn(window, 'scrollTo');
    spyOn(component, 'checkScreenSize');
    spyOn(component, 'findTopGenres');
    spyOn(dataService, 'getAllBooks').and.returnValue(of(mockBooks)); //Return mock book list when getAllBooks is called

    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      expect(window.scrollTo).toHaveBeenCalled();
      expect(window.scrollY).toBe(0);

      expect(component.checkScreenSize).toHaveBeenCalled();
      expect(component.findTopGenres).toHaveBeenCalled();

      expect(sharedService.scrollBehavior).toBe('smooth');
      expect(sharedService.timeoutLength).toBe(550);
    });
  }));

  it('should set booksPerPage and set all Pages to page 1 in "checkScreenSize()"', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);

    component.checkScreenSize();

    const booksPerPage = component.getBooksPerPage();
    const pages = component.getPages();

    expect(booksPerPage).toBe(2);
    pages.forEach((value, key) => {
      expect(value).toBe(1);
    });
  });

  it('should navigate to Browse Inventory with correct query parameters when a book is clicked in "onBookClicked()"', () => {
    const mockBooks = mockBookData;
    const book = mockBooks[1];

    const navigationSpy = spyOn(router, 'navigate');

    component.onBookClicked(book);

    const expectedNavigationArgument = {
      queryParams: {
        book: JSON.stringify(book.book_id)
      }
    };

    expect(navigationSpy).toHaveBeenCalledWith(['Browse Inventory'], expectedNavigationArgument);
  });

  it('should organize all the book genres in descending order based on genre occurance in "findTopGenres()"', () => {
    const mockBooks: Book[] = mockBooksForFindTopGenre;

    component.bookList = mockBooks;

    const topGenres = component.findTopGenres();

    const expectedTopGenres = [
      'Fiction',
      'Fantasy',
      'Romance',
      'Horror',
      'Thriller',
      'Mystery',
      'Young Adult',
      'Contemporary',
      'Love', 
      'Adult', 
      'Dragon',
      'Magic',
      'Drama',
      'Novel',
      'Dark',
    ];

    expect(topGenres).toEqual(expectedTopGenres);
  });
});