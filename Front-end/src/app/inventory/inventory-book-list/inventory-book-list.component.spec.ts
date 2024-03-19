import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { InventoryBookListComponent } from './inventory-book-list.component';

describe('InventoryBookListComponent', () => {
  let component: InventoryBookListComponent;
  let fixture: ComponentFixture<InventoryBookListComponent>;

  beforeEach(waitForAsync(() => {
    const activatedRouteMock = {
      snapshot: {
        paramMap : {
          get: (param: string) => {
            return 'book=1';
          }
        }
      }
    }

    TestBed.configureTestingModule({
      declarations: [InventoryBookListComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }]
    });
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(InventoryBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
