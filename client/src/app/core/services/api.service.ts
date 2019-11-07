import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private environment: EnvService
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(
      `${this.environment.apiUrl}${path}`,
      { params, withCredentials: true })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(
      `${this.environment.apiUrl}${path}`,
      JSON.stringify(body),
      { withCredentials: true }
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      `${this.environment.apiUrl}${path}`,
      JSON.stringify(body),
      {  withCredentials: true }
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.environment.apiUrl}${path}`,
      { withCredentials: true }
    ).pipe(catchError(this.formatErrors));
  }
}
