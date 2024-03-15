import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBookListComponent } from './inventory-book-list.component';

describe('InventoryBookListComponent', () => {
  let component: InventoryBookListComponent;
  let fixture: ComponentFixture<InventoryBookListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryBookListComponent]
    });
    fixture = TestBed.createComponent(InventoryBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
