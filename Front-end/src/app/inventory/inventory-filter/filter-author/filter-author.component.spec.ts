import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAuthorComponent } from './filter-author.component';

describe('FilterAuthorComponent', () => {
  let component: FilterAuthorComponent;
  let fixture: ComponentFixture<FilterAuthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterAuthorComponent]
    });
    fixture = TestBed.createComponent(FilterAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
