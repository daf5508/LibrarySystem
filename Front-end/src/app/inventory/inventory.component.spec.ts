import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InventoryPageComponent } from './inventory.component';
import { InventoryBookListComponent } from './inventory-book-list/inventory-book-list.component';
import { InventoryBookDetailsComponent } from './inventory-book-details/inventory-book-details.component';
import { InventoryFilterComponent } from './inventory-filter/inventory-filter.component';
import { InventoryFilterTabComponent } from './inventory-filter-tab/inventory-filter-tab.component';
import { FilterAuthorComponent } from './inventory-filter/filter-author/filter-author.component';
import { FilterGenreComponent } from './inventory-filter/filter-genre/filter-genre.component';
import { FilterPageCountComponent } from './inventory-filter/filter-page-count/filter-page-count.component';
import { FilterPublishDateComponent } from './inventory-filter/filter-publish-date/filter-publish-date.component';


describe('InventoryPageComponent', () => {
  let component: InventoryPageComponent;
  let fixture: ComponentFixture<InventoryPageComponent>;

  beforeEach(waitForAsync(() => {
    const activatedRouteMock = {
      snapshot: {
        paramMap : {
          get: (param: string) => {
            return 'book=1';
          }
        }
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        InventoryPageComponent,
        InventoryBookListComponent,
        InventoryBookDetailsComponent,
        InventoryFilterComponent,
        InventoryFilterTabComponent,
        FilterAuthorComponent,
        FilterGenreComponent,
        FilterPageCountComponent,
        FilterPublishDateComponent
      ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }]
    });
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserModule, 
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(InventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
