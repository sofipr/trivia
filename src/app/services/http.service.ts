import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer, EMPTY, expand, Observable, of, toArray, map } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl =
    'https://opentdb.com/api.php?amount=1&amp;encode=base64&amp;type=multiple';
  numberOfApiCalls = 20;
  results = new Map();
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      expand((result: any) => {
        this.results.set(result.results[0].question, result.results[0]);
        return this.results.size === this.numberOfApiCalls
          ? EMPTY
          : this.http.get(`${this.baseUrl}`);
      }),
      toArray(),

      map(() => [...this.results])
    );
  }
}
