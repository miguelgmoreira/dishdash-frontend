import { Observable } from "rxjs";

export interface IDeleteService {
    delete(id: number): Observable<void>;
  }