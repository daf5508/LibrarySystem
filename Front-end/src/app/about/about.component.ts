import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/dataService.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutPageComponent implements OnInit {
  
  numberOfBooks: any;

  /* ------------------------------- Constructor ------------------------------ */
  constructor (
    private dataService: DataService
  ) { }

  //If the user refreshes this html page, then dataService.bookList will be undefined
  //If dataService.bookList is empty, call the function to get the books and wait for the data
  //Then verify we have books present and set the length. If they're not present, set 1000
  //Else, use dataService.bookList and set the length
  async ngOnInit(): Promise<void> {
    
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (this.dataService.bookList === undefined || this.dataService.bookList.length < 1)
    {
      const books = await this.dataService.getAllBooks().toPromise();

      if (books === undefined)
      {
        this.numberOfBooks = 1000;
      }
      else
      {
        this.numberOfBooks = books.length;
      }
    }
    else 
    {
      this.numberOfBooks = this.dataService.bookList.length;
    }
  }
}