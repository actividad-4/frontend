import { HttpInterceptorFn } from '@angular/common/http';
import { REQUIRES_AUTH } from '../../services/products/products.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = Inject(Router)

  if(req.context.get(REQUIRES_AUTH)) {
    
    const token: string = localStorage.getItem('token') || '';
    
    if(!token) {
      router.navigate(['/login']);
      return next(req);
    };

    const requestApi = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
    return next(requestApi);
  }

  return next(req);
};