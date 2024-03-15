import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPageCountComponent } from './filter-page-count.component';

describe('FilterPageCountComponent', () => {
  let component: FilterPageCountComponent;
  let fixture: ComponentFixture<FilterPageCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPageCountComponent]
    });
    fixture = TestBed.createComponent(FilterPageCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
