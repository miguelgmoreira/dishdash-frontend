import { Observable } from "rxjs";

export interface ICreateService<T> {
    create(data: T): Observable<T>;
  }