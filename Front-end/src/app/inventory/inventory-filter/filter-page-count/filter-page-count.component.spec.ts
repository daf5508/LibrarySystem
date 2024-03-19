import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FilterPageCountComponent } from './filter-page-count.component';

describe('FilterPageCountComponent', () => {
  let component: FilterPageCountComponent;
  let fixture: ComponentFixture<FilterPageCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPageCountComponent],
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(FilterPageCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
