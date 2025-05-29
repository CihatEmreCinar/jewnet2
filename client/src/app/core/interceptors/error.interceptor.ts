import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 400:
          alert(err.error?.title || 'Bad Request');
          break;
        case 401:
          alert(err.error?.title || 'Unauthorized');
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
          alert('Something went wrong');
          break;
      }

      return throwError(() => err); // return en son, diğerleri break
    })
  );
};
