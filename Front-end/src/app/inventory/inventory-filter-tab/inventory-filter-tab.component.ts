import { Component, OnInit } from '@angular/core';

import { ToggleComponent } from 'src/app/services/toggleComponent.service';

@Component({
  selector: 'app-inventory-filter-tab',
  templateUrl: './inventory-filter-tab.component.html',
  styleUrls: ['./inventory-filter-tab.component.css'],
})

export class InventoryFilterTabComponent implements OnInit {

  filterContent = ""; 

  /* ------------------------------- Constructor ------------------------------ */
  constructor (
    private toggleComponent: ToggleComponent
  ) { }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  /* ----------------------------- Event Functions ---------------------------- */
  checkScreenSize(): void {
    const width = window.innerWidth;

    if (width <= 500)
    {
      this.filterContent = "";
    }
    else 
    {
      this.filterContent = "Filter";
    }
  }

  onMaximizeFilterClicked(isFilterMaximized: boolean, isFilterMinimized: boolean): void {
    this.toggleComponent.onMaximizeFilterClicked();
  }
}