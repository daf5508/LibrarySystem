import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGenreComponent } from './filter-genre.component';

describe('FilterGenreComponent', () => {
  let component: FilterGenreComponent;
  let fixture: ComponentFixture<FilterGenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterGenreComponent]
    });
    fixture = TestBed.createComponent(FilterGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
