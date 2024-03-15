import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOffcanvasComponent } from './contact-offcanvas.component';

describe('ContactOffcanvasComponent', () => {
  let component: ContactOffcanvasComponent;
  let fixture: ComponentFixture<ContactOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactOffcanvasComponent]
    });
    fixture = TestBed.createComponent(ContactOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
