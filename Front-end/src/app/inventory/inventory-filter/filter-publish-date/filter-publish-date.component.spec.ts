import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPublishDateComponent } from './filter-publish-date.component';

describe('FilterPublishDateComponent', () => {
  let component: FilterPublishDateComponent;
  let fixture: ComponentFixture<FilterPublishDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPublishDateComponent]
    });
    fixture = TestBed.createComponent(FilterPublishDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
