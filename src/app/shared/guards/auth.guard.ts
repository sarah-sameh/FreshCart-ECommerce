import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

 let _Router= inject(Router)


  if(localStorage.getItem('eToken') != null){//user loged
    return true;
  }
  else{
    _Router.navigate(['/Login']);
    return false;
  }
  
};
