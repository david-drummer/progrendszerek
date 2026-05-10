import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from '../../in-memory/models';
import { RatingService } from '../../services/rating.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.scss']
})
export class RatingComponent implements OnInit {
  ratings: Rating[] = [];
  users: User[] = [];

  loading = true;
  errorMessage = '';
  successMessage = '';

  currentUser: any = null;

  editingRating: Rating | null = null;

  form = {
    id: '',
    bookId: '',
    bookclubId: '',
    score: 1,
    comment: ''
  };

  constructor(
    private ratingService: RatingService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

 ngOnInit(): void {
  this.form.bookclubId =
  this.route.snapshot.paramMap.get('bookclubId') || '';

  this.form.bookId =
  this.route.snapshot.paramMap.get('bookId') || '';

  const storedUser = localStorage.getItem('currentUser');
  this.currentUser = storedUser ? JSON.parse(storedUser) : null;

  this.loadUsers();
  this.loadRatings();
}

loadRatings(): void {
  this.loading = true;
  this.errorMessage = '';

  this.ratingService.getAll().subscribe({
    next: (data: Rating[]) => {
      this.ratings = data.filter(
        rating => String(rating.bookId) === String(this.form.bookId)
      );

      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err: any) => {
      console.error('Rating loading error:', err);
      this.errorMessage = err.error?.error || 'Failed to load ratings.';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}

  saveRating(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.form.bookId.trim()) {
      this.errorMessage = 'Book ID is required.';
      return;
    }

    if (!this.form.bookclubId.trim()) {
      this.errorMessage = 'Bookclub ID is required.';
      return;
    }

    if (!Number.isInteger(Number(this.form.score)) || this.form.score < 1 || this.form.score > 5) {
      this.errorMessage = 'The score must be an integer between 1 and 5.';
      return;
    }

    const payload: Partial<Rating> = {
      bookId: this.form.bookId,
      bookclubId: this.form.bookclubId,
      score: Number(this.form.score),
      comment: this.form.comment
    };

    if (this.editingRating) {
      const id = this.getRatingId(this.editingRating);

      this.ratingService.update(id, payload).subscribe({
        next: () => {
          this.successMessage = 'The rating has been successfully updated.';
          this.resetForm();
          this.loadRatings();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Rating update error:', err);
          this.errorMessage = err.error?.error || 'Failed to update rating.';
          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.ratingService.create(payload).subscribe({
      next: () => {
        this.successMessage = 'The rating has been successfully created.';
        this.resetForm();
        this.loadRatings();
      },
      error: (err: any) => {
        console.error('Rating creation error:', err);
        this.errorMessage = err.error?.error || 'Failed to create rating.';
        this.cdr.detectChanges();
      }
    });
  }

  editRating(rating: Rating): void {
    this.editingRating = rating;

    this.form = {
      id: this.getRatingId(rating),
      bookId: rating.bookId || '',
      bookclubId: rating.bookclubId || '',
      score: rating.score || 1,
      comment: rating.comment || ''
    };
  }

  deleteRating(rating: Rating): void {
    const confirmed = confirm('Are you sure you want to delete this rating?');

    if (!confirmed) return;

    const id = this.getRatingId(rating);

    this.ratingService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'The rating has been successfully deleted.';
        this.loadRatings();
      },
      error: (err: any) => {
        console.error('Rating delete error:', err);
        this.errorMessage = err.error?.error || 'Failed to delete rating.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

resetForm(): void {
  this.editingRating = null;

  this.form = {
    id: '',
    bookId: this.route.snapshot.paramMap.get('bookId') || '',
    bookclubId: this.route.snapshot.paramMap.get('bookclubId') || '',
    score: 1,
    comment: ''
  };
}

  getRatingId(rating: any): string {
    return rating?._id || rating?.id || '';
  }

  goBack(): void {
  this.location.back();
}

getUsername(userId: string): string {
  const user = this.users.find(
    u => (u.id || (u as any)._id) === userId
  );

  return user?.username || userId;
}

loadUsers(): void {
  this.userService.getAll().subscribe({
    next: (data: User[]) => {
      this.users = data;
      this.cdr.detectChanges();
    },
    error: (err: any) => {
      console.error('User loading error:', err);
    }
  });
}

isOwnRating(rating: Rating): boolean {
  if (!this.currentUser) return false;

  const currentUserIds = [
    this.currentUser.id,
    this.currentUser._id,
    this.currentUser.userId
  ]
    .filter(Boolean)
    .map(String);

  return currentUserIds.includes(String(rating.userId));
}

isAdminUser(): boolean {
  return this.currentUser?.role === 'admin';
}
}