import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';

import { DataService } from 'src/app/services/dataService.service';
import { SharedService } from 'src/app/services/sharedService.service';
import { ToggleComponent } from 'src/app/services/toggleComponent.service';

import { FilterAuthorComponent } from './filter-author/filter-author.component';
import { FilterGenreComponent } from './filter-genre/filter-genre.component';
import { FilterPageCountComponent } from './filter-page-count/filter-page-count.component';
import { FilterPublishDateComponent } from './filter-publish-date/filter-publish-date.component';

@Component({
  selector: 'app-inventory-filter',
  templateUrl: './inventory-filter.component.html',
  styleUrls: ['./inventory-filter.component.css']
})

export class InventoryFilterComponent implements OnInit {

  @ViewChild('accordion') accordion?: InventoryFilterComponent;
  @ViewChild(FilterAuthorComponent) filterAuthorComponent?: FilterAuthorComponent;
  @ViewChild(FilterGenreComponent) filterGenreComponent?: FilterGenreComponent;
  @ViewChild(FilterPageCountComponent) filterPageCountComponent?: FilterPageCountComponent;
  @ViewChild(FilterPublishDateComponent) filterPublishDateComponent?: FilterPublishDateComponent;

  isAvailabilityChecked: boolean = false;
  resetButtonVisible: boolean = false;

  /* ------------------------------- Constructor ------------------------------ */
  constructor (
    private toggleComponent: ToggleComponent, 
    private dataService: DataService, 
    private sharedService: SharedService,
    private changeDectectorRef: ChangeDetectorRef
  ) { }


  async ngOnInit(): Promise<void> {

    if (this.dataService.bookList === undefined)
    {
      await this.dataService.getAllBooks().toPromise();
    }

    if (this.dataService.bookList === this.dataService.backupBookList)
    {
      this.onResetClicked()
    }

    const filterParametersString = sessionStorage.getItem('filterParameters');

    if (filterParametersString)
    {
      this.resetButtonVisible = true;
      this.changeDectectorRef.detectChanges();
    }
  }

  /* ----------------------------- Event Functions ---------------------------- */
  onMinimizeFilterClicked(isFilterMaximized: boolean, isFilterMinimized: boolean): void {
    this.collapseAllAccordionTabs();
    this.toggleComponent.onMinimizeFilterClicked();
  }

  onAvailabilityClicked(): void {
    this.isAvailabilityChecked = !this.isAvailabilityChecked;
  }

  onApplyFilterClicked(): void { 

    const width = window.innerWidth;

    if (width <= 1350)
    {
      this.toggleComponent.onMinimizeFilterClicked();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 100);
    }

    this.collapseAllAccordionTabs();
    this.sharedService.setFilterClicked(true);

    const filterParameters = {
      authors: this.filterAuthorComponent?.getFilteredAuthors() as string[] | null,
      genres: this.filterGenreComponent?.getFilteredGenres() as string[] | null,
      pageCount: this.filterPageCountComponent?.getFilteredPageCount() as string[] | null,
      publishDate: this.filterPublishDateComponent?.getFilteredDates() as string[] | null,
      availability: this.isAvailabilityChecked === true ? 'In Stock' : null,
    }

    this.dataService.getFilteredBookList(filterParameters.authors, filterParameters.genres, filterParameters.pageCount, filterParameters.publishDate, filterParameters.availability);

    //If all the filter boxes are null, then the result will be the full list anyway so no need to display "Reset List" button
    //Else, if there are books present, then display the "Reset List" button
    if (filterParameters.authors === null && filterParameters.genres === null && filterParameters.pageCount === null && filterParameters.publishDate === null && 
      filterParameters.availability === null)
    {
      this.resetButtonVisible = false;
    }
    else
    {
      this.resetButtonVisible = true;

      //Stores the filter parameters for the duration of the session just incase of a page refresh
      //This way if they refresh the page, it won't be lost
      sessionStorage.setItem('filterParameters', JSON.stringify(filterParameters));
    }
  }

  onResetClicked(): void {
    this.sharedService.resetBookList();

    this.collapseAllAccordionTabs();
    this.sharedService.setFilterClicked(false);

    this.filterAuthorComponent?.resetFilteredAuthors();
    this.filterGenreComponent?.resetFilteredGenres();
    this.filterPageCountComponent?.resetFilteredPages();
    this.filterPublishDateComponent?.resetFilteredDates();
    this.isAvailabilityChecked = false;

    this.resetButtonVisible = false;

    sessionStorage.removeItem('filterParameters');
  }

  collapseAllAccordionTabs(): void {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach((item: any) => {
      const collapseElement = item.querySelector('.accordion-collapse');

      if (collapseElement && collapseElement.classList.contains('show'))
      {
        const accordionButton = item.querySelector('.accordion-button');

        accordionButton.click();
      }
    });
  }
}