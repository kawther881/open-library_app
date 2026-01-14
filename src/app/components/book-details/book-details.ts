import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails implements OnInit {

  book: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe((data) => {
        this.book = data;
      });
    }
  }

  getCover(coverId: number): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
