import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloneReques = req.clone({
    withCredentials: true
  });
  return next(cloneReques);
};
