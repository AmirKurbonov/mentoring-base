import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';



export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService)
  const router = inject(Router)

  if (userService.isAdmin) {
    return true;
  } else {
    router.navigate(['main'])
    return false
  }
  
};
