import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../models/book.model';
import { Genre } from '../models/genre.model'; 

import { DataService } from '../services/dataService.service';
import { SharedService } from '../services/sharedService.service';

import * as stringSimilarity from 'string-similarity';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @ViewChild('searchForm', { static: false }) searchForm?: ElementRef;

  private bookList: Book[] | undefined;
  private genreList: Genre[] | undefined;
  suggestions: Book[] = [];

  resultList: Book[] = [];

  searchBarPlaceholder: string = 'Search by title, author, or genre...';
  searchInputValue: string = '';

  searched: boolean = false;
  focused: boolean = false;
  private suggestionBookClicked: boolean = false;

  private threshold: number = 0.5;

  constructor (
    private dataService: DataService, 
    private route: Router,
    private sharedService: SharedService,
  ) { }

  async ngOnInit(): Promise<void> {

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (this.dataService.bookList === undefined || this.dataService.bookList.length < 1)
    {
      this.bookList = await this.dataService.getAllBooks().toPromise();
    }
    else 
    {
      this.bookList = this.dataService.bookList;
    }

    if (this.dataService.genreList === undefined || this.dataService.genreList.length < 1)
    {
      this.genreList = await this.dataService.getAllGenres().toPromise();
    }
    else 
    {
      this.genreList = this.dataService.genreList;
    }

    this.sharedService.setScrollBehavior('smooth');
    this.sharedService.setTimeoutLength(550);

    this.checkScreensize();

    //Listen for clicks on the HTML page
    document.body.addEventListener('click', this.handleFocus.bind(this));
  }

  checkScreensize(): void {
    const width = window.innerWidth;

    if (width <= 330)
    {
      this.searchBarPlaceholder = "Search...";
    }
  }

  handleFocus(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const formElement = this.searchForm?.nativeElement;
  
    //If the formElement isn't null/undefined, it doesn't contain the clicked element, and the clicked element isn't a suggestion book labeled by 'allTheSame'
    //Then the user clicked outside the form element, set focus false
    //Otherwise, they clicked inside the form element, set focus true
    if (formElement && !formElement.contains(clickedElement) && !clickedElement.classList.contains('allTheSame')) 
    {
      //If the user randomly clicked all around the screen, this would keep getting triggered
      //Only trigger this if the user was focused
      if (this.focused)
      {
        this.focused = false;
        this.onSearch();
      }
    }
    else 
    {
      //Was still coming here after a suggested book was clicked 
      //and setting focus true so easy work around to prevent it
      if (!this.suggestionBookClicked)
      {
        this.focused = true;
      }
      else 
      {
        this.suggestionBookClicked = false;
      }
    }
  }

  onSuggestionClicked(book: Book): void {
    this.focused = false;
    this.searched = true;
    this.suggestionBookClicked = true;

    this.suggestions = [];
    this.resultList = [];

    if (this.bookList)
    {
      const books = this.bookList;

      this.suggestions = [];

      if (book.title === "" && book.author !== "")
      {
        this.resultList = this.filterBooks(book.author, 'author', books);
      }
      if (book.title === "" && book.genre !== "")
      {
        this.resultList = this.filterBooks(book.genre, 'genre', books);
      }
      if (book.title !== "" && book.description !== "") 
      {
        this.resultList.push(book);
      }
    }
  }

  onSearch(): void {
    if (this.searchInputValue !== '')
    {
      this.focused = false;
      this.searched = true;

      this.suggestions = [];
      this.resultList = [];

      const userInputValue = this.searchInputValue;
      this.checkForExactResult(userInputValue);
    }
  }

  onClearClicked(): void {
    this.searched = false;

    this.searchInputValue = '';

    this.suggestions = [];
    this.resultList = [];
  }

  onBookClicked(book: Book): void {
    const navigationArgument = {
      queryParams: { 
        book: JSON.stringify(book.book_id),
      },
    }

    this.route.navigate(['Browse Inventory'], navigationArgument);
  }

  findSuggestions(): void {
    const userInputValue = this.searchInputValue;
    this.suggestions = this.matchInputToTitleAuthorGenre(this.searchInputValue, true);
  }

  checkForExactResult(userInputValue: string): void {
    
    const results = this.matchInputToTitleAuthorGenre(userInputValue, false);

    if (results.length > 0)
    { 
      this.resultList = results;
    }
    else 
    {
      this.checkForSimilarResults(userInputValue);
    }
  }

  checkForSimilarResults(userInputValue: string) {
    
    const cleanUserInput = this.cleanUpValues(userInputValue);

    if (this.bookList)
    {
      //Gets the similarty scores of every book compared to the user input
      const similarities = this.bookList.map((book: Book) => {
        const titleScore = stringSimilarity.compareTwoStrings(cleanUserInput, this.cleanUpValues(book.title));
        const authorScore = stringSimilarity.compareTwoStrings(userInputValue, book.author);
        return { book, titleScore, authorScore };
      });

      //Gets the books that met the threshold
      const filteredSimilarities = similarities.filter(similarity => {
        return similarity.titleScore >= this.threshold || similarity.authorScore >= this.threshold;
      });

      if (filteredSimilarities.length > 0)
      {
        //Sorts the books based on the similarity score in descending order
        filteredSimilarities.sort((a, b) => {
          const scoreA = Math.max(a.titleScore, a.authorScore);
          const scoreB = Math.max(b.titleScore, b.authorScore);
          return scoreB - scoreA;
        });

        //Extracts the books from the map objects
        const extractBooks = filteredSimilarities.map(similarity => similarity.book);

        this.resultList = extractBooks;
      }
      else 
      {
        this.resultList = [];
      }
    }
    else 
    {
      this.resultList = [];
    }
  }

  matchInputToTitleAuthorGenre(userInputValue: string, suggestion: boolean) {
    if (this.bookList && this.genreList && this.searchInputValue !== '')
    {
      const searchString: string = this.searchInputValue;
      const books: Book[] = this.bookList;
      const genres: Genre[] = this.genreList;

      const filteredBooksByTitle = this.filterBooks(searchString, 'title', books);

      this.suggestions = filteredBooksByTitle;

      if (filteredBooksByTitle.length > 0)
      {
        return filteredBooksByTitle;
      }
      else 
      {
        const filteredBooksByAuthor = this.filterBooks(searchString, 'author', books);
        
        if (filteredBooksByAuthor.length > 0)
        {
          //Only do this if it's for a suggestion. It puts the author at the top of the
          //suggestion list
          if (suggestion)
          {
            //Extracts the unique authors and stores them in a map then converts to an array
            //Faster and more concise than foreach
            const extractUniqueAuthors = Array.from(new Set(filteredBooksByAuthor.map((book: Book) => book.author)));

            const authorOnlyBook: Book[] = extractUniqueAuthors.map(author => ({
              book_id: 0,
              title: "",
              author: author as string,
              description: "",
              genre: "",
              pages: "",
              published: "",
              availability: "",
              image: ""
            }));

            filteredBooksByAuthor.unshift(...authorOnlyBook);
          }

          return filteredBooksByAuthor;
        } 
        else
        {
          const filteredBooksByGenre = this.filterBooks(searchString, 'genre', books);

          if (filteredBooksByGenre.length > 0)
          {
            //Only do this if it's for a suggestion. It puts the genre at the top of the
            //suggestion list
            if (suggestion)
            {
              const matchingGenres = genres.filter(genre => this.cleanUpValues(genre.name).includes(this.cleanUpValues(searchString)));

              const genreOnlyBook: Book[] = matchingGenres.map(genre => ({
                book_id: 0,
                title: "",
                author: "",
                description: "",
                genre: genre.name,
                pages: "",
                published: "",
                availability: "",
                image: ""
              }));

              filteredBooksByGenre.unshift(...genreOnlyBook);
            }

            return filteredBooksByGenre;
          }
          else 
          {
            return [];
          }
        }
      }
    }
    else
    {
      return [];
    }
  }

  filterBooks(userInputValue: string, filterBy: string, books: Book[]) {
    
    const cleanUserInputValue = this.cleanUpValues(userInputValue);
    
    const filteredBooks = books.filter(book => {
      switch (filterBy) {
        case 'title':
          return this.cleanUpValues(book.title).includes(cleanUserInputValue);
        case 'author':
          return this.cleanUpValues(book.author).includes(cleanUserInputValue);
        case 'genre':
          return this.cleanUpValues(book.genre).includes(cleanUserInputValue);
        default:
          return false;
      }
   });

    return filteredBooks;
  }

  cleanUpValues(value: string) {
    //Makes all lowercase, removes all punctuation and removes all spaces
    return value.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '');
  }

  getBookImagePath(book: Book) {
    return book.image;
  }

  shortenDescription(description: string, wordLimit: number) {
    const words = description.match(/\S+/g) || [];

    if (words.length > wordLimit)
    {
      const shortenedWords = words.slice(0, wordLimit);

      for (let i = shortenedWords.length - 1; i >= 0; i--) 
      {
        //If there's a period, question mark, exclamation mark or space
        //Get rid of it
        if (/[\.\?\!\s]+$/.test(shortenedWords[i]))
        {
          shortenedWords.splice(i, 1);
        }
        else
        {
          break;
        }
      }

      const shortenedText = shortenedWords.join(' ') + '...';

      return shortenedText;
    }
    else
    {
      return description;
    }
  }

  organizeGenresAlphabetically(genres: string) {
    return genres.split(', ').sort().join(', ');
  }
}