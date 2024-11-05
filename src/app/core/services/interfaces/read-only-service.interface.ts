import { Observable } from 'rxjs';

export interface IReadOnlyService<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
}