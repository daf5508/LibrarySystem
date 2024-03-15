import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryFilterTabComponent } from './inventory-filter-tab.component';

describe('InventoryFilterTabComponent', () => {
  let component: InventoryFilterTabComponent;
  let fixture: ComponentFixture<InventoryFilterTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryFilterTabComponent]
    });
    fixture = TestBed.createComponent(InventoryFilterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
