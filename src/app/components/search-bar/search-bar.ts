import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html'
})
export class SearchBar implements OnDestroy {

  title!: string;
  year!: number;

  private titleSubject = new Subject<string>();
  private yearSubject = new Subject<number>();
  private destroy$ = new Subject<void>();

  constructor(private bookService: BookService) {
    this.titleSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((title) => {
      if (title.trim()) {
        this.bookService.searchByTitle(title).subscribe((data) => {
          const books = data.docs.map((doc: any) => ({
            key: doc.key,
            title: doc.title,
            cover_id: doc.cover_i,
            first_publish_year: doc.first_publish_year,
            subtitle: doc.subtitle
          }));
          this.bookService.updateBooks(books);
        });
      } else {
        this.bookService.resetToInitial();
      }
    });

    this.yearSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((year) => {
      if (year && !isNaN(year)) {
        this.bookService.searchByYear(year).subscribe((data) => {
          const books = data.docs.map((doc: any) => ({
            key: doc.key,
            title: doc.title,
            cover_id: doc.cover_i,
            first_publish_year: doc.first_publish_year,
            subtitle: doc.subtitle
          }));
          this.bookService.updateBooks(books);
        });
      } else {
        this.bookService.resetToInitial();
      }
    });
  }

  onTitleChange(value: string) {
    this.titleSubject.next(value);
  }

  onYearChange(value: string) {
    const year = parseInt(value, 10);
    this.yearSubject.next(year);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
