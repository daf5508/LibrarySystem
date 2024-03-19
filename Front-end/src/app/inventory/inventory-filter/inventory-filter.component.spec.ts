import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InventoryFilterComponent } from './inventory-filter.component';
import { FilterAuthorComponent } from './filter-author/filter-author.component';
import { FilterGenreComponent } from './filter-genre/filter-genre.component';
import { FilterPageCountComponent } from './filter-page-count/filter-page-count.component';
import { FilterPublishDateComponent } from './filter-publish-date/filter-publish-date.component';

describe('InventoryFilterComponent', () => {
  let component: InventoryFilterComponent;
  let fixture: ComponentFixture<InventoryFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        InventoryFilterComponent,
        FilterAuthorComponent,
        FilterGenreComponent,
        FilterPageCountComponent,
        FilterPublishDateComponent
      ],
      imports: [
        HttpClientTestingModule,
        BrowserModule, 
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(InventoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
