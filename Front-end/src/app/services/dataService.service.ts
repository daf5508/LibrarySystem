import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs';

import { Book } from '../models/book.model';
import { Genre } from '../models/genre.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    books$ = new Subject<Book[]>();
    
    //Quick work around
    //Added backupBookList because if I default URL to browse inventory while I filtered,
    //the resetbutton will still be visible
    backupBookList: Book[] | undefined;
    bookList: Book[] | undefined;
    genreList: Genre[] | undefined;
    maxPages: number | undefined;

    private readonly APIUrl = "http://localhost:3000/";
    //private readonly APIUrl = "https://dominicslibrary.com/";

    constructor (
        private readonly http: HttpClient
    ) { }

    httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    getAllBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.APIUrl + 'getAllBooks').pipe(tap((books: Book[]) => {
            this.backupBookList = books;
            this.bookList = books;
            this.books$.next(books);
            //console.log("Success getting book list!");
        }),
        catchError((error) => {
            console.log("Error getting book list: ", error);
            return of([]);
        }));
    }

    getAllGenres(): Observable<Genre[]> {
        return this.http.get<Genre[]>(this.APIUrl + 'getAllGenres').pipe(tap((genres: Genre[]) => {
            this.genreList = genres;
            //console.log("Success getting genre list!");
        }),
        catchError((error) => {
            console.log("Error getting genre list: ", error);
            return of([]);
        }));
    }

    getMaxPages(): Observable<number> {
        return this.http.get<number>(this.APIUrl + 'getMaxPages').pipe(tap((pages: number) => {
            this.maxPages = pages;
            //console.log("Success getting page counts!");
        }), 
        catchError((error) => {
            console.log("Error getting page counts: ", error);
            return of(-1);
        }));
    }

    getFilteredBookList(authors: string[] | null, genres: string[] | null, pages: string[] | null, published: string[] | null, availability: string | null) {
        let filterParams = new HttpParams();

        filterParams = filterParams.append('authors', authors !== null ? authors.join(',') : 'null');
        filterParams = filterParams.append('genres', genres !== null ? genres.join(',') : 'null');
        filterParams = filterParams.append('pages', pages !== null ? pages.join(',') : 'null');
        filterParams = filterParams.append('published', published !== null ? published.join(',') : 'null');
        filterParams = filterParams.append('availability', availability !== null ? availability : 'null');

        this.http.get<Book[]>(this.APIUrl + 'getBooks_ByFilterRequirements', { params: filterParams } ).subscribe((books: Book[]) => {
            this.bookList = books;
            this.books$.next(books);
        },
        (error) => {
            console.log("Error getting filtered list: ", error);
        },
        () => {
            //console.log("Success getting filtered list!");
        });
    }

    reportError(system: string, end: string, file: string, method: string, action: string, error: string) {
        let errorParams = new HttpParams();

        errorParams = errorParams.append('system', system !== null ? system : 'null');
        errorParams = errorParams.append('end', end !== null ? end : 'null');
        errorParams = errorParams.append('file', file !== null ? file : 'null');
        errorParams = errorParams.append('method', method !== null ? method : 'null');
        errorParams = errorParams.append('action', action !== null ? action : 'null');
        errorParams = errorParams.append('error', error !== null ? error : 'null');

        this.http.post<void>(this.APIUrl + 'sendError', errorParams).subscribe(
            () => {
                console.log("Success sending error report!");
            }, 
            (error) => {
                console.log("Error sending error report: ", error);
            }
        );
    }
}