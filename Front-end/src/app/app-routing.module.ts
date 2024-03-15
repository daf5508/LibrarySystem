import { NgModule } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet, Routes } from '@angular/router';

import { HomePageComponent } from './home/home.component';
import { AboutPageComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { InventoryPageComponent } from './inventory/inventory.component';
import { SearchComponent } from './search/search.component';
import { InventoryBookDetailsForSmallPagesComponent } from './inventory/inventory-book-details-for-small-pages/inventory-book-details-for-small-pages.component';

const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomePageComponent, data: { animation: 'HomePage' } },
  {path: 'About', component: AboutPageComponent, data: { animation: 'AboutPage' } },
  {path: 'Browse Inventory', component: InventoryPageComponent, data: { animation: 'BrowseInventoryPage' } },
  {path: 'Search', component: SearchComponent, data: { animation: 'SearchPage' } },
  {path: 'Details Page', component: InventoryBookDetailsForSmallPagesComponent},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}

