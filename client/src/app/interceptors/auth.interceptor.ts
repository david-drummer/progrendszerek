import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);
  const token = auth?.getToken ? auth.getToken() : null;
  const authReq = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err && err.status) {
        if (err.status === 401) {
          try { auth?.logout?.(); } catch (e) {}
          snackBar.open('The authorization token is expired or missing. Please log in.', undefined, { duration: 4000, panelClass: ['snackbar-warn'] });
          router.navigate(['/auth/login']);
        } else if (err.status === 403) {
          snackBar.open('You do not have permission to perform this action.', undefined, { duration: 4000, panelClass: ['snackbar-warn'] });
        }
      }
      return throwError(() => err);
    })
  );
};