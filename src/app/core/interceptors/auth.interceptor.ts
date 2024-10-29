import { HttpInterceptorFn } from '@angular/common/http';

// TODO: Intercepta requisições para anexar o token JWT no cabeçalho de autorização.

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
