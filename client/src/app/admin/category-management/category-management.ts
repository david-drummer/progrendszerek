import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Category,
  CategoryService
} from '../../services/category.service';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-management.html',
  styleUrls: ['./category-management.scss']
})
export class CategoryManagement implements OnInit {
  categories: Category[] = [];

  loading = true;
  errorMessage = '';
  successMessage = '';

  form = {
    id: '',
    name: '',
    description: ''
  };

  editingCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

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
        console.error('Kategóriák betöltési hiba:', err);
        this.errorMessage = 'A kategóriák betöltése sikertelen.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveCategory(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.form.name.trim()) {
      this.errorMessage = 'A kategória neve kötelező.';
      return;
    }

    if (!this.form.description.trim()) {
      this.errorMessage = 'A leírás kötelező.';
      return;
    }

    if (this.editingCategory) {
      const id = this.getCategoryId(this.editingCategory);

      this.categoryService.update(id, {
        name: this.form.name,
        description: this.form.description
      }).subscribe({
        next: () => {
          this.successMessage = 'A kategória sikeresen módosítva.';
          this.resetForm();
          this.loadCategories();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Kategória módosítási hiba:', err);
          this.errorMessage =
            err.error?.error || 'A kategória módosítása sikertelen.';
          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.categoryService.create({
      id: this.form.id || undefined,
      name: this.form.name,
      description: this.form.description
    }).subscribe({
      next: () => {
        this.successMessage = 'A kategória sikeresen létrehozva.';
        this.resetForm();
        this.loadCategories();
      },
      error: (err) => {
        console.error('Kategória létrehozási hiba:', err);
        this.errorMessage =
          err.error?.error || 'A kategória létrehozása sikertelen.';
        this.cdr.detectChanges();
      }
    });
  }

  editCategory(category: Category): void {
    this.editingCategory = category;

    this.form = {
      id: category.id,
      name: category.name,
      description: category.description
    };
    
  }

  deleteCategory(category: Category): void {
    const confirmed = confirm(
      `Biztosan törölni szeretnéd ezt a kategóriát: ${category.name}?`
    );

    if (!confirmed) return;

    const id = this.getCategoryId(category);

    this.categoryService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'A kategória sikeresen törölve.';
        this.loadCategories();
      },
      error: (err) => {
        console.error('Kategória törlési hiba:', err);
        this.errorMessage =
          err.error?.error || 'A kategória törlése sikertelen.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.editingCategory = null;

    this.form = {
      id: '',
      name: '',
      description: ''
    };
  }

  getCategoryId(category: Category): string {
    return category.id || category._id || '';
  }
}