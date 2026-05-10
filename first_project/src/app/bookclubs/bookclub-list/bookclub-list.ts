import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

import { BookclubService } from '../../services/bookclub.service';
import { Bookclub } from '../../in-memory/models';

@Component({
  selector: 'app-bookclub-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './bookclub-list.html',
  styleUrl: './bookclub-list.scss'
})
export class BookclubList implements OnInit {
  bookclubs: Bookclub[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'members', 'actions'];

  constructor(
    private bookclubService: BookclubService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookclubs();
  }

dataSource = new MatTableDataSource<Bookclub>([]);

  loadBookclubs(): void {
  this.bookclubService.getMyBookclubs().subscribe({
    next: data => {
      console.log('BOOKCLUBS FROM API:', data);
      this.dataSource.data = data;
    },
    error: err => {
      console.error('Bookclubs loading failed:', err);
    }
  });
}

  openBookclub(id: string): void {
    this.router.navigate(['/bookclubs', id]);
  }
}