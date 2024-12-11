import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the Router
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'null');
  if((isAdmin === true || isAdmin === false)){
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};
