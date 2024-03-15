import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from 'src/app/models/book.model';

import { DataService } from 'src/app/services/dataService.service';
import { SharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-inventory-book-details-for-small-pages',
  templateUrl: './inventory-book-details-for-small-pages.component.html',
  styleUrls: ['./inventory-book-details-for-small-pages.component.css']
})

export class InventoryBookDetailsForSmallPagesComponent implements OnInit {

  private bookList: Book[] | undefined;
  bookDetails: Book = new Book(0, '', '', '', '', '', '', '', '');

  constructor (
    private dataService: DataService,
    private sharedService: SharedService, 
    private activatedRoute: ActivatedRoute, 
    private route: Router
  ) { }

  /* ----------------------------- Initialization ----------------------------- */
  async ngOnInit(): Promise<void> {

    //If the user refreshes this html page, then dataService.bookList will be undefined
    //If dataService.bookList is empty, call the function to get the books from the database
    if (this.dataService.bookList === undefined || this.dataService.bookList.length < 1)
    {
      await this.dataService.getAllBooks().toPromise();
    }

    //Catches the navigation from Browse Inventory and sends the selected book ID to retrieve all the details
    this.activatedRoute.queryParams.subscribe(params => {
      const queryParams = this.activatedRoute.snapshot.queryParams;

      if (queryParams['book']) 
      {
        const selectedBookID = (JSON.parse(queryParams['book']));
        const selectedBook = this.sharedService.getSelectedBookDetails(selectedBookID);

        if (selectedBook)
        {
          //Stores the selected book details for the duration of the session just incase of a page refresh
          //This way if they refresh the page, it won't be lost
          sessionStorage.setItem('selectedBook_InventoryBookDetailsForSmallPages', JSON.stringify(selectedBook));

          this.bookDetails = selectedBook;
        }
      }
    });

    //If the page is refreshed, there will be no selected book
    if (this.bookDetails.title === '')
    {
      //So we pull the selected book after the page refresh and reload it
      const storedData = sessionStorage.getItem('selectedBook_InventoryBookDetailsForSmallPages');

      if (storedData)
      {
        this.bookDetails = JSON.parse(storedData);
      }
      else 
      {
        //If no selected book was stored, report it and navigate back to Browse Inventory
        this.dataService.reportError("Library System", "Front-end", "inventory-book-details-for-small-pages.component.ts", "ngOnInit", "Viewing selected book details", 
        "No selected book to display. It displays just a blank box");
        this.route.navigate(['Browse Inventory']);
      }
    }

    this.sharedService.setScrollBehavior('instant');
    this.sharedService.setTimeoutLength(100);
  }

  checkScreenSize(): void {
    const width = window.innerWidth;

    //If the width grows above 767, then send us back to the normal display along with the current book we're on
    if (width > 767)
    {
      this.navigate();
    }
  }

  onBackClicked(): void {
    this.navigate();
  }

  navigate(): void {
    const navigationArgument = {
      queryParams: { 
        book: JSON.stringify(this.bookDetails.book_id),
      },
    }

    this.route.navigate(['Browse Inventory'], navigationArgument);
  }

  organizeGenresAlphabetically(genres: string) {
    return genres.split(', ').sort().join(', ');
  }

  changeDateFormat(publishedDate: string) {
    const convertDate = new Date(publishedDate);
    return convertDate.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });
  }
}