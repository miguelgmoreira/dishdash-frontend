import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new Subject<string>();
searchTerm$ = this.searchSubject.asObservable().pipe(debounceTime(300));

  constructor() {}

  setSearchTerm(term: string): void {
    this.searchSubject.next(term);
  }
}
