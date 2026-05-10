import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  user: any = null;
  loading = true;
  errorMessage = '';
  successMessage = '';

  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

get userId(): string | null {
  const user = this.authService.getCurrentUser() as any;

  if (!user) {
    return null;
  }

  return user.id || user._id || user.userId || user.user_id || null;
}

  loadProfile(): void {
  this.errorMessage = '';
  this.successMessage = '';
  this.loading = true;

  const currentUser = this.authService.getCurrentUser() as any;
  console.log('Current User:', currentUser);

  const id =
    currentUser?.id ||
    currentUser?._id ||
    currentUser?.userId ||
    currentUser?.user_id ||
    null;

  console.log('Profil user id:', id);

  if (!id) {
    this.errorMessage = 'Current user not found.';
    this.loading = false;
    this.cdr.detectChanges();
    return;
  }

  this.profileService.getProfile(id).subscribe({
    next: (data) => {
      console.log('Profile response:', data);

      const { password, ...safeUser } = data as any;
      this.user = safeUser;
      this.loading = false;

       this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Profile loading error:', err);

      this.errorMessage =
        err.error?.error ||
        err.message ||
        'The profile data could not be loaded.';

      this.loading = false;

      this.cdr.detectChanges();
    },
    complete: () => {
      console.log('Profile request completed.');
    }
  });
}

  changePassword(): void {
  this.errorMessage = '';
  this.successMessage = '';

  const currentUser = this.authService.getCurrentUser() as any;
  const id = currentUser?.id;

  if (!id) {
    this.errorMessage = 'Current user not found.';
    return;
  }

  if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
    this.errorMessage = 'The new passwords do not match.';
    return;
  }

  this.profileService
    .changePassword(
      id,
      this.passwordForm.currentPassword,
      this.passwordForm.newPassword
    )
    .subscribe({
      next: () => {
        this.successMessage = 'The password has been changed successfully.';
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error changing password:', err);
        this.errorMessage =
          err.error?.error || 'The password change failed.';
        this.cdr.detectChanges();
      }
    });
}

deleteAccount(): void {
  this.errorMessage = '';
  this.successMessage = '';

  const id = this.userId;

  if (!id) {
    this.errorMessage = 'Current user not found.';
    return;
  }

  const confirmed = confirm(
    'Are you sure you want to delete your account? This action cannot be undone.'
  );

  if (!confirmed) {
    return;
  }

  this.profileService.deleteAccount(id).subscribe({
    next: () => {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      console.error('Error deleting account:', err);
      this.errorMessage =
        err.error?.error || 'The account deletion failed.';
    }
  });
}
}