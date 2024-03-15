import { Component, OnInit } from '@angular/core';

import { Genre } from 'src/app/models/genre.model';

import { DataService } from 'src/app/services/dataService.service';

@Component({
  selector: 'app-filter-genre',
  templateUrl: './filter-genre.component.html',
  styleUrls: ['./filter-genre.component.css']
})

export class FilterGenreComponent implements OnInit {

  /* ------------------------------ Declarations ------------------------------ */
  genreList: Genre[] = [];
  genresChecked: string[] = [];

  /* ------------------------------- Constructor ------------------------------ */
  constructor (
    private dataService: DataService
  ) { }

  async ngOnInit(): Promise<void> {
    const genres = await this.dataService.getAllGenres().toPromise();
    
    if (genres) 
    {
      this.genreList = this.organizeAlphabetically(genres);
    }
    else
    {
      this.genreList = [];
    }
  }
  
  /* ----------------------------- Event Functions ---------------------------- */
  onCheckBoxClicked(genreInput: HTMLInputElement, genre: string): void {

    if (genreInput.checked)
    {
      this.genresChecked.push(genre);
    }

    else 
    {
      const index = this.genresChecked.indexOf(genre);

      if (index !== -1) 
      {
        this.genresChecked.splice(index, 1);
      }
    }
  }


  /* ---------------------------- Utility Functions --------------------------- */
  organizeAlphabetically(genres: Genre[]) {
    return genres.slice().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }

  resetFilteredGenres(): void {
    this.genresChecked = [];
  }

  getFilteredGenres() {
    if (this.genresChecked.length > 0)
    {
      return this.genresChecked;
    }
    else 
    {
      return null;
    }
  }
}