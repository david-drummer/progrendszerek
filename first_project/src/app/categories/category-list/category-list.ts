import { CommonModule } from '@angular/common';
import { Category, CategoryService } from '../../services/category.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss']
})
export class CategoryList implements OnInit {
  categories: Category[] = [];
  loading = true;
  errorMessage = '';

  constructor(private categoryService: CategoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Category loading error:', err);
        this.errorMessage = 'Failed to load categories.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}