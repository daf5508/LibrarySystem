import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HomePageComponent } from './home.component';

import { Book } from '../models/book.model';

import { DataService } from '../services/dataService.service';

import * as mockBooks from '../mock-data-for-unit-tests/home/mock-books.json';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties and services in ngOnInit', waitForAsync(() => {
    spyOn(window, 'scrollTo');
    spyOn(component, 'checkScreenSize');
    spyOn(component, 'findTopGenres');

    spyOn(dataService, 'getAllBooks').and.returnValue(of(mockBooks)); //Return mock book list when getAllBooks is called

    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      expect(window.scrollTo).toHaveBeenCalled();
      expect(component.checkScreenSize).toHaveBeenCalled();
      expect(component.findTopGenres).toHaveBeenCalled();

      expect(window.scrollY).toBe(0);
    });
  }));
});
