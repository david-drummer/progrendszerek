import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookclubService } from '../../services/bookclub.service';
import { Bookclub } from '../../in-memory/models';
import { CategoryService, Category } from '../../services/category.service';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-bookclub-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookclub-management.html',
  styleUrls: ['./bookclub-management.scss']
})
export class BookclubManagement implements OnInit {
  bookclubs: Bookclub[] = [];
  categories: Category[] = [];
  users: User[] = [];

  loading = true;
  errorMessage = '';
  successMessage = '';

  editingBookclub: any = null;

  form = {
    id: '',
    name: '',
    description: ''
  };

  addBookForm = {
    bookclubId: '',
    title: '',
    author: '',
    categoryId: '',
    publishedAt: ''
  };

  addMemberForm = {
    bookclubId: '',
    userId: ''
  };

  removeMemberForm = {
    bookclubId: '',
    userId: ''
  };

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private bookclubService: BookclubService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookclubs();
    this.loadCategories();
    this.loadUsers();
  }

  loadBookclubs(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookclubService.getAll().subscribe({
      next: (data: Bookclub[]) => {
        console.log('BOOKCLUBS:', data);
        this.bookclubs = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Bookclub loading error:', err);
        this.errorMessage = err.error?.error || 'Failed to load bookclubs.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Category loading error:', err);
        this.errorMessage = err.error?.error || 'Failed to load categories.';
        this.cdr.detectChanges();
      }
    });
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (data: User[]) => {
        console.log('USERS:', data);
        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('User loading error:', err);
        this.errorMessage = err.error?.error || 'Failed to load users.';
        this.cdr.detectChanges();
      }
    });
  }

  saveBookclub(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.form.name.trim()) {
      this.errorMessage = 'The bookclub name is required.';
      return;
    }

    const payload = {
      id: this.form.id || undefined,
      name: this.form.name,
      description: this.form.description
    };

    if (this.editingBookclub) {
      const id = this.getBookclubId(this.editingBookclub);

      this.bookclubService.update(id, {
        name: payload.name,
        description: payload.description
      }).subscribe({
        next: () => {
          this.successMessage = 'The bookclub has been successfully updated.';
          this.resetForm();
          this.loadBookclubs();
        },
        error: (err: any) => {
          console.error('Bookclub update error:', err);
          this.errorMessage = err.error?.error || 'Failed to update the bookclub.';
          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.bookclubService.create(payload).subscribe({
      next: () => {
        this.successMessage = 'The bookclub has been successfully created.';
        this.resetForm();
        this.loadBookclubs();
      },
      error: (err: any) => {
        console.error('Bookclub creation error:', err);
        this.errorMessage = err.error?.error || 'Failed to create the bookclub.';
        this.cdr.detectChanges();
      }
    });
  }

  editBookclub(bookclub: any): void {
    this.editingBookclub = bookclub;

    this.form = {
      id: bookclub.id || bookclub._id || '',
      name: bookclub.name || '',
      description: bookclub.description || ''
    };
  }

  deleteBookclub(bookclub: any): void {
    const confirmed = confirm(
      `Are you sure you want to delete this bookclub: ${bookclub.name}?`
    );

    if (!confirmed) return;

    const id = this.getBookclubId(bookclub);

    this.bookclubService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'The bookclub has been successfully deleted.';
        this.loadBookclubs();
      },
      error: (err: any) => {
        console.error('Bookclub delete error:', err);
        this.errorMessage = err.error?.error || 'Failed to delete the bookclub.';
        this.cdr.detectChanges();
      }
    });
  }

  addBookToBookclub(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.addBookForm.bookclubId) {
      this.errorMessage = 'Bookclub selection is required.';
      return;
    }

    if (!this.addBookForm.title.trim()) {
      this.errorMessage = 'The book title is required.';
      return;
    }

    if (!this.addBookForm.author.trim()) {
      this.errorMessage = 'The author is required.';
      return;
    }

    if (!this.addBookForm.categoryId) {
      this.errorMessage = 'Category selection is required.';
      return;
    }

    if (!this.addBookForm.publishedAt) {
      this.errorMessage = 'Published date is required.';
      return;
    }

    const bookPayload = {
      title: this.addBookForm.title,
      author: this.addBookForm.author,
      categoryId: this.addBookForm.categoryId,
      publishedAt: this.addBookForm.publishedAt
    };

    this.bookclubService
      .addBook(this.addBookForm.bookclubId, bookPayload)
      .subscribe({
        next: () => {
          this.successMessage = 'The book has been successfully added to the bookclub.';
          this.addBookForm = {
            bookclubId: '',
            title: '',
            author: '',
            categoryId: '',
            publishedAt: ''
          };
          this.loadBookclubs();
        },
        error: (err: any) => {
          console.error('Book addition error:', err);
          this.errorMessage = err.error?.error || 'Failed to add the book to the bookclub.';
          this.cdr.detectChanges();
        }
      });
  }

  addMemberToBookclub(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.addMemberForm.bookclubId || !this.addMemberForm.userId) {
      this.errorMessage = 'Bookclub and user selection are required.';
      return;
    }

    this.bookclubService
      .addMember(this.addMemberForm.bookclubId, this.addMemberForm.userId)
      .subscribe({
        next: () => {
          this.successMessage = 'The member has been successfully added to the bookclub.';
          this.addMemberForm = {
            bookclubId: '',
            userId: ''
          };
          this.loadBookclubs();
        },
        error: (err: any) => {
          console.error('Member addition error:', err);
          this.errorMessage = err.error?.error || 'Failed to add the member to the bookclub.';
          this.cdr.detectChanges();
        }
      });
  }

  removeMemberFromBookclub(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.removeMemberForm.bookclubId || !this.removeMemberForm.userId) {
      this.errorMessage = 'Bookclub and user selection are required.';
      return;
    }

    this.bookclubService
      .removeMember(this.removeMemberForm.bookclubId, this.removeMemberForm.userId)
      .subscribe({
        next: () => {
          this.successMessage = 'The member has been successfully removed from the bookclub.';
          this.removeMemberForm = {
            bookclubId: '',
            userId: ''
          };
          this.loadBookclubs();
        },
        error: (err: any) => {
          console.error('Member removal error:', err);
          this.errorMessage = err.error?.error || 'Failed to remove the member from the bookclub.';
          this.cdr.detectChanges();
        }
      });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.editingBookclub = null;

    this.form = {
      id: '',
      name: '',
      description: ''
    };
  }

  onRemoveBookclubChange(): void {
    this.removeMemberForm.userId = '';
  }

  getBookclubId(bookclub: any): string {
    return bookclub?.id || bookclub?._id || '';
  }

  getCategoryId(category: any): string {
    return category?.id || category?._id || '';
  }

  getCategoryName(category: any): string {
    return category?.name || category?.categoryName || this.getCategoryId(category);
  }

getUserId(user: any): string {
  if (!user) return '';

  // Ha már maga az érték az azonosító (pl. "1" vagy Mongo ObjectId)
  if (typeof user === 'string' || typeof user === 'number') {
    return String(user);
  }

  // Először a seedelt numerikus/string id-t használjuk,
  // ha nincs, akkor a MongoDB _id-t.
  return String(
    user.id ??
    user._id ??
    user.userId ??
    ''
  );
}

 getUserDisplayName(member: any): string {
  if (!member) return '';

  const memberId = this.getUserId(member);

  // Keresés a betöltött users listában
  const foundUser = this.users.find(
    (user: any) => this.getUserId(user) === memberId
  );

  // Ha megtaláltuk, a username legyen az elsődleges
  if (foundUser) {
    return (
      foundUser.username ||
      foundUser.name ||
      foundUser.email ||
      memberId
    );
  }

  // Ha maga a member már objektumként érkezik
  if (typeof member === 'object') {
    return (
      member.username ||
      member.name ||
      member.email ||
      memberId
    );
  }

  // Végső fallback: maga az ID
  return memberId;
}

  getSelectedBookclubMembers(): any[] {
    const selectedBookclub: any = this.bookclubs.find(
      (bookclub: any) => this.getBookclubId(bookclub) === this.removeMemberForm.bookclubId
    );

    if (!selectedBookclub || !selectedBookclub.members) {
      return [];
    }

    return selectedBookclub.members;
  }
}