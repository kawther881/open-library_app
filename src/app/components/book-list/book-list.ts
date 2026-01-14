import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html'
})
export class BookList implements OnInit {

  booksList: any[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.books$.subscribe((books) => {
      this.booksList = books;
    });
  }

  getCover(coverId: number): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }

  viewBookDetails(book: any): void {
    const id = book.key.split('/').pop(); // Extract OL17365W from /works/OL17365W
    this.router.navigate(['/book', id]);
  }
}
