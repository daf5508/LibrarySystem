import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterGenreComponent } from './filter-genre.component';

describe('FilterGenreComponent', () => {
  let component: FilterGenreComponent;
  let fixture: ComponentFixture<FilterGenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterGenreComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(FilterGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
