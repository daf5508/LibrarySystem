import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryBookDetailsComponent } from './inventory-book-details.component';

describe('InventoryBookDetailsComponent', () => {
  let component: InventoryBookDetailsComponent;
  let fixture: ComponentFixture<InventoryBookDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryBookDetailsComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(InventoryBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
