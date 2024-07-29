import { HttpInterceptorFn } from '@angular/common/http';

export const myHttpInterceptor: HttpInterceptorFn = (req, next) => {

  let headers:any = {token: localStorage.getItem('eToken')}
  if(headers){
  req = req.clone({
    setHeaders: headers
  })
  }
  return next(req);

};
