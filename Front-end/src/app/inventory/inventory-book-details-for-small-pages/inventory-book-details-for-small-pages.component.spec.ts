import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBookDetailsForSmallPagesComponent } from './inventory-book-details-for-small-pages.component';

describe('InventoryBookDetailsForSmallPagesComponent', () => {
  let component: InventoryBookDetailsForSmallPagesComponent;
  let fixture: ComponentFixture<InventoryBookDetailsForSmallPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryBookDetailsForSmallPagesComponent]
    });
    fixture = TestBed.createComponent(InventoryBookDetailsForSmallPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
