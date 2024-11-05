import { Observable } from "rxjs";

export interface IUpdateService<T> {
    update(id: number, data: T): Observable<T>;
  }