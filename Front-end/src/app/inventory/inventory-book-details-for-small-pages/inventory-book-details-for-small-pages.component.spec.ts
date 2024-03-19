import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { InventoryBookDetailsForSmallPagesComponent } from './inventory-book-details-for-small-pages.component';

describe('InventoryBookDetailsForSmallPagesComponent', () => {
  let component: InventoryBookDetailsForSmallPagesComponent;
  let fixture: ComponentFixture<InventoryBookDetailsForSmallPagesComponent>;

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
      declarations: [InventoryBookDetailsForSmallPagesComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }]
    });
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(InventoryBookDetailsForSmallPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
