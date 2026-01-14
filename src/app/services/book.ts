import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private subjectUrl = 'https://openlibrary.org/subjects/computers.json';
  private workUrl = 'https://openlibrary.org/works';

  private booksSubject = new BehaviorSubject<any[]>([]);
  public books$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialBooks();
  }

  private loadInitialBooks() {
    this.getBooksList().subscribe((data) => {
      this.booksSubject.next(data.works);
    });
  }

  // 📌 Réinitialiser à la liste initiale
  resetToInitial() {
    this.loadInitialBooks();
  }

  // 📌 Liste des livres d’informatique
  getBooksList(): Observable<any> {
    return this.http.get<any>(this.subjectUrl);
  }

  // 📌 Livre par ID
  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.workUrl}/${id}.json`);
  }

  // 📌 Recherche par titre
  searchByTitle(title: string): Observable<any> {
    return this.http.get<any>(
      `https://openlibrary.org/search.json?title=${title}`
    );
  }

  // 📌 Recherche par année
  searchByYear(year: number): Observable<any> {
    return this.http.get<any>(
      `https://openlibrary.org/search.json?first_publish_year=${year}`
    );
  }

  // 📌 Mettre à jour la liste des livres
  updateBooks(books: any[]) {
    this.booksSubject.next(books);
  }
}
