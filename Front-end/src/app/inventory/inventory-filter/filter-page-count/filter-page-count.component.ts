import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/dataService.service';

@Component({
  selector: 'app-filter-page-count',
  templateUrl: './filter-page-count.component.html',
  styleUrls: ['./filter-page-count.component.css']
})

export class FilterPageCountComponent implements OnInit {

  /* --------------------------- Element References --------------------------- */
  @ViewChild('sliderInputMin', { static: false }) sliderInputMin?: ElementRef<HTMLInputElement>;
  @ViewChild('sliderInputMax', { static: false }) sliderInputMax?: ElementRef<HTMLInputElement>;


  /* ------------------------------ Declarations ------------------------------ */
  steps: number = 1;
  
  private rangeGap: number = 50;
  rangeMinValue: number = 1;
  rangeMaxValue: any;

  desiredMinValue: number = 1;
  desiredMaxValue: any;
  desiredPagesValue: any = '';

  sliderMinValue: number = 1;
  sliderMaxValue: any;

  private inputField: boolean = false;

  progressBarStyles: { left: string, right: string } = { left: `${0}%`, right: `${0}%` };

  tooltipMessage: string = 'Exact number of pages takes precedence over the minimum and maximum pages.\n' +
  'If you want to set a minimum and/or maximum, make sure "Pages" box says "Enter #"';

  constructor (
    private changeDetectionRef: ChangeDetectorRef, 
    private dataService: DataService
  ) { }

  async ngOnInit(): Promise<void> {
    //If the user refreshes this html page, then dataService.maxPages will be undefined
    //If dataService.maxPages is undefined, call the function to get the max pages and set rangeMaxValue
    //Else, use dataService.maxPages to set rangeMaxValue
    //Then set the two other values
    if (this.dataService.maxPages === undefined || this.dataService.maxPages < 1) 
    {
      this.rangeMaxValue = await this.dataService.getMaxPages().toPromise();
    }
    else 
    {
      this.rangeMaxValue = this.dataService.maxPages;
    }

    this.desiredMaxValue = this.rangeMaxValue;
    this.sliderMaxValue = this.rangeMaxValue;
  }

  /* ----------------------------- Event Functions ---------------------------- */
  onEnterKeyPressed(enterKeyPressed: HTMLInputElement): void {
    enterKeyPressed.blur();
  }

  onDesiredValueEntered(exactPages: any): void {

    if (exactPages !== '' && !isNaN(exactPages))
    {
      exactPages = parseInt(exactPages, 10);

      if (exactPages >= this.rangeMinValue && exactPages <= this.rangeMaxValue)
      {
        this.desiredPagesValue = exactPages;
      }
      else
      {
        if (exactPages < this.rangeMinValue)
        {
          alert("Invalid input, minimum number of pages is: 1");
        }
        else
        {
          alert("Invalid input, maximum number of pages is: " + this.rangeMaxValue);
        }

        this.desiredPagesValue = '';
      }
    }
    else
    {
      if (isNaN(exactPages))
      {
        alert("Invalid input, please enter a valid number");
      }

      this.desiredPagesValue = '';
    }
  }

  onMinInputValueChanged(minValue: any, maxValue: any): void {

    if (minValue !== '' && maxValue !== '')
    {
      minValue = parseInt(minValue, 10);
      maxValue = parseInt(maxValue, 10);

      if (maxValue - minValue >= this.rangeGap)
      {
        if (minValue >= this.rangeMinValue && minValue <= this.rangeMaxValue)
        {
          this.sliderMinValue = minValue;
        }
        else
        {
          this.desiredMinValue = this.rangeMinValue;
          this.sliderMinValue = this.desiredMinValue;
        }
      }
      else
      {
        this.desiredMinValue = this.desiredMaxValue - this.rangeGap;
        this.sliderMinValue = this.desiredMinValue;
      }
    }
    else
    {
      this.desiredMinValue = this.rangeMinValue;
      this.sliderMinValue = this.desiredMinValue;
    }

    this.inputField = true;
    this.calculateProgressBarStyles(true);
  }

  onMaxInputValueChanged(minValue: any, maxValue: any): void {

    if (minValue !== '' && maxValue !== '')
    {
      minValue = parseInt(minValue, 10);
      maxValue = parseInt(maxValue, 10);

      if (maxValue - minValue >= this.rangeGap)
      {
        if (maxValue >= this.rangeMinValue && maxValue <= this.rangeMaxValue)
        {
          this.sliderMaxValue = maxValue;
        }
        else
        {
          this.desiredMaxValue = this.rangeMaxValue;
          this.sliderMaxValue = this.desiredMaxValue;
        }
      }
      else
      {
        this.desiredMaxValue = this.desiredMinValue + this.rangeGap;
        this.sliderMaxValue = this.desiredMaxValue;
      }
    }
    else
    {
      this.desiredMaxValue = this.rangeMaxValue;
      this.sliderMaxValue = this.desiredMaxValue;
    }

    this.inputField = true;
    this.calculateProgressBarStyles(true);
  }

  onMinSliderValueChanged(minValue: any, maxValue: any): void {

    minValue = parseInt(minValue, 10);
    maxValue = parseInt(maxValue, 10);

    if (maxValue - minValue >= this.rangeGap)
    {
      this.desiredMinValue = minValue;
    }
    else
    {
      this.desiredMinValue = this.desiredMaxValue - this.rangeGap;
      this.sliderInputMin!.nativeElement.value = (parseInt(this.sliderInputMax!.nativeElement.value, 10) - this.rangeGap).toString();
    }

    this.inputField = false;
    this.calculateProgressBarStyles(true);
  }

  onMaxSliderValueChanged(minValue: any, maxValue: any): void {

    minValue = parseInt(minValue, 10);
    maxValue = parseInt(maxValue, 10);

    if (maxValue - minValue >= this.rangeGap)
    {
      this.desiredMaxValue = maxValue;
    }
    else
    {
      this.desiredMaxValue = this.desiredMinValue + this.rangeGap;
      this.sliderInputMax!.nativeElement.value = (parseInt(this.sliderInputMin!.nativeElement.value, 10) + this.rangeGap).toString();
    }

    this.inputField = false;
    this.calculateProgressBarStyles(true);
  }
  
  /* ----------------------------- Helper Functions --------------------------- */
  calculateProgressBarStyles(userEntered: boolean): { left?: string; right?: string } | undefined {

    const range = this.rangeMaxValue - this.rangeMinValue;
    let leftPercentage = 0;
    let rightPercentage = 0;

    if (this.inputField)
    {
      if (userEntered && this.desiredMinValue >= this.rangeMinValue && this.desiredMinValue <= this.rangeMaxValue && 
        this.desiredMaxValue >= this.rangeMinValue && this.desiredMaxValue <= this.rangeMaxValue && this.desiredMaxValue)
      {
        leftPercentage = (((this.desiredMinValue - this.rangeMinValue) / range) * 100);
        rightPercentage = (((this.rangeMaxValue - this.desiredMaxValue) / range) * 100);
      }
    }
    else
    {
      if (this.sliderMinValue >= this.rangeMinValue && this.sliderMinValue <= this.rangeMaxValue && 
        this.sliderMaxValue >= this.rangeMinValue && this.sliderMaxValue <= this.rangeMaxValue && this.sliderMaxValue)
      {
        leftPercentage = (((this.sliderMinValue - this.rangeMinValue) / range) * 100);
        rightPercentage = (((this.rangeMaxValue - this.sliderMaxValue) / range) * 100);
      }
    }

    this.progressBarStyles = {
      left: `${leftPercentage}%`,
      right: `${rightPercentage}%`
    };

    return {};
  }


  /* ---------------------------- Utility Functions --------------------------- */
  resetFilteredPages(): void {
    this.desiredMinValue = this.rangeMinValue;
    this.desiredMaxValue = this.rangeMaxValue;

    this.sliderMinValue = this.rangeMinValue;
    this.sliderMaxValue = this.rangeMaxValue;

    this.desiredPagesValue = '';

    this.calculateProgressBarStyles(true);
  }

  getFilteredPageCount() {

    if (this.desiredPagesValue === '' && this.desiredMinValue === this.rangeMinValue && this.desiredMaxValue === this.rangeMaxValue)
    {
      return null;
    }
    else
    {
      if (this.desiredPagesValue !== '') 
      {
        return [this.desiredPagesValue];
      }
      else 
      {
        return [this.desiredMinValue, this.desiredMaxValue];
      }
    }
  }
}
