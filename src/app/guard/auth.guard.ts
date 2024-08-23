import { CanActivateFn } from '@angular/router';

// not being used

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
