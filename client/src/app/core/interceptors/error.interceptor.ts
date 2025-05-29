import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackbar = inject(SnackbarService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 400:
          if(err.error.errors)
          snackbar.error(err.error?.title || err.error);
          break;
        case 401:
          snackbar.error(err.error?.title || err.error);
          break;
        case 404:
          // Angular route geçerli ama API’den 404 geldi
          // Kullanıcıyı not-found sayfasına yönlendir
          router.navigateByUrl('/not-found');
          break;
        case 500:
          router.navigateByUrl('/server-error');
          break;
        default:
          snackbar.error('Something went wrong');
          break;
      }

      return throwError(() => err); // return en son, diğerleri break
    })
  );
};
