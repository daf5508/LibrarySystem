import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-author',
  templateUrl: './filter-author.component.html',
  styleUrls: ['./filter-author.component.css']
})

export class FilterAuthorComponent {

  /* ------------------------------ Declarations ------------------------------ */
  authors: string[] = [];
  authorInputValue: string = '';


  /* ----------------------------- Event Functions ---------------------------- */
  onSearchClicked(): void {
    //Trims the input just incase they entered an extra space in the beginning or end
    const newAuthor = this.authorInputValue.trim();

    if (newAuthor !== "" && !this.authors.includes(newAuthor))
    {
      this.authors.push(newAuthor);
      this.authorInputValue = '';
    }
  }

  onRemoveAuthorClicked(author: string): void {
    const index = this.authors.indexOf(author);

    if (index !== -1)
    {
      this.authors.splice(index, 1);
    }
  }


  /* ---------------------------- Utility Functions --------------------------- */
  resetFilteredAuthors(): void {
    this.authors = [];
    this.authorInputValue = '';
  }

  getFilteredAuthors() {
    
    if (this.authors.length > 0)
    {
      return this.authors;
    }
    else 
    {
      return null;
    }
  }
}