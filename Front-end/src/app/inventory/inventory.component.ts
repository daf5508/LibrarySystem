import { Component, OnInit} from '@angular/core';

import { ToggleComponent } from 'src/app/services/toggleComponent.service';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [ToggleComponent]
})

export class InventoryPageComponent implements OnInit {

  /* ----------------------------- Declarations ----------------------------- */
  isFilter_Accordion_Visible: boolean =  true;
  isFilter_Tab_Visible: boolean = false;
  

  /* ------------------------------- Constructor ------------------------------ */
  constructor (
    private toggleComponent: ToggleComponent
  ) { }


  /* ----------------------------- Initialization ---------------------------- */
  ngOnInit(): void {
    
    this.checkScreenSize();
    
    this.toggleComponent.emitMinimizeFilterClicked.subscribe((data: {isFilterMaximized: boolean, isFilterMinimized: boolean}) => {
        this.isFilter_Accordion_Visible = data.isFilterMaximized;
        this.isFilter_Tab_Visible = data.isFilterMinimized;
    });
    this.toggleComponent.emitMaximizeFilterClicked.subscribe((data: {isFilterMaximized: boolean, isFilterMinimized: boolean}) => {
        this.isFilter_Accordion_Visible = data.isFilterMaximized;
        this.isFilter_Tab_Visible = data.isFilterMinimized;
    });
  }

  
  /* ------------------------------- Functions ------------------------------ */
  checkScreenSize(): void {
    const width = window.innerWidth;

    //Shrink or expand filter accordingly
    //Will be fully displayed above 1350px
    //Will display tab under 1350px
    if (width <= 1350) 
    {
      this.isFilter_Accordion_Visible =  false;
      this.isFilter_Tab_Visible = true;
    }
    else 
    {
      this.isFilter_Accordion_Visible =  true;
      this.isFilter_Tab_Visible = false;
    }
  }
}