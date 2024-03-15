import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-filter-publish-date',
  templateUrl: './filter-publish-date.component.html',
  styleUrls: ['./filter-publish-date.component.css']
})

export class FilterPublishDateComponent implements OnInit {

  currentDate: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  exactDate: string | null = null;

  tooltipMessage: string = 'The "Exact" date takes precedence over the start and exact dates. If you want\n' +
  'to set a start and/or end date, make sure "Exact" date box is "mm/dd/yyyy"';

  constructor (
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  onStartDateSelected(event: any): void {
    this.startDate = event.target.value;

    if (this.startDate === '') 
    { 
      this.startDate = null; 
    }
  }

  onEndDateSelected(event: any): void {
    this.endDate = event.target.value;

    if (this.endDate === '') 
    { 
      this.endDate = null; 
    }
  }

  onExactDateSelected(event: any): void {
    this.exactDate = event.target.value;

    if (this.exactDate === '') 
    { 
      this.exactDate = null; 
    }
  }
  

  /* ---------------------------- Utility Functions --------------------------- */
  resetFilteredDates(): void {
    this.startDate = null; 
    this.endDate = null; 
    this.exactDate = null;
  }
  
  getFilteredDates() {
    
    //If the user chose the same day for both for some reason, just make it the exact date so we only have to handle one value
    if (this.startDate !== null && this.endDate !== null && this.startDate === this.endDate)
    {
      this.exactDate = this.startDate;
    }


    if (this.startDate === null && this.endDate === null && this.exactDate === null)
    {
      return null;
    }
    else 
    {
      if (this.exactDate !== null)
      {
        return [this.exactDate];
      }
      else 
      {
        if (this.startDate === null)
        {
          this.startDate = '1100-01-01';
        }
        if (this.endDate === null)
        {
          this.endDate = this.currentDate;
        }

        return [this.startDate, this.endDate];
      }
    }
  }
}