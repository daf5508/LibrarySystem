import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactOffcanvasComponent } from './contact/contact-offcanvas/contact-offcanvas.component';
import { HomePageComponent } from './home/home.component';
import { AboutPageComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InventoryPageComponent } from './inventory/inventory.component';
import { InventoryFilterComponent } from './inventory/inventory-filter/inventory-filter.component';
import { InventoryBookListComponent } from './inventory/inventory-book-list/inventory-book-list.component';
import { InventoryBookDetailsComponent } from './inventory/inventory-book-details/inventory-book-details.component';
import { FilterAuthorComponent } from './inventory/inventory-filter/filter-author/filter-author.component';
import { FilterGenreComponent } from './inventory/inventory-filter/filter-genre/filter-genre.component';
import { FilterPageCountComponent } from './inventory/inventory-filter/filter-page-count/filter-page-count.component';
import { FilterPublishDateComponent } from './inventory/inventory-filter/filter-publish-date/filter-publish-date.component';
import { InventoryFilterTabComponent } from './inventory/inventory-filter-tab/inventory-filter-tab.component';
import { DataService } from './services/dataService.service';
import { SharedService } from './services/sharedService.service';
import { SearchComponent } from './search/search.component';
import { InventoryBookDetailsForSmallPagesComponent } from './inventory/inventory-book-details-for-small-pages/inventory-book-details-for-small-pages.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactOffcanvasComponent,
    HomePageComponent,
    AboutPageComponent,
    ErrorComponent,
    NavigationComponent,
    InventoryPageComponent,
    InventoryFilterComponent,
    InventoryBookListComponent,
    InventoryBookDetailsComponent,
    FilterAuthorComponent,
    FilterGenreComponent,
    FilterPageCountComponent,
    FilterPublishDateComponent,
    InventoryFilterTabComponent,
    SearchComponent,
    InventoryBookDetailsForSmallPagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [DataService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
