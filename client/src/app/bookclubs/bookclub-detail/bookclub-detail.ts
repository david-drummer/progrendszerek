import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { BookclubService } from '../../services/bookclub.service';
import { Bookclub, Book } from '../../in-memory/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookclub-detail',
  standalone: true,
  imports: [RouterModule,CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './bookclub-detail.html',
  styleUrl: './bookclub-detail.scss'
})
export class BookclubDetail implements OnInit {
  bookclub: Bookclub | null = null;

  displayedColumns: string[] = ['title', 'author', 'categoryId', 'publishedAt'];
  booksDataSource = new MatTableDataSource<Book>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookclubService: BookclubService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/bookclubs']);
      return;
    }

    this.bookclubService.getById(id).subscribe({
      next: data => {
        this.bookclub = data;
        this.booksDataSource.data = data.books || [];

        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Bookclub loading failed:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/bookclubs']);
  }
}